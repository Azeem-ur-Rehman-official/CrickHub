import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteReview,
  getProductReviews,
} from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductReviews = ({ match, history }) => {
  const [value, setValue] = useState('');
  const [err, setErr] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { product } = useSelector((state) => state.productDetails);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  const productId = match.params.id;

  console.log(reviews);
  useEffect(() => {
    if (!reviews) {
      dispatch(getProductReviews(productId));
    }
    if (reviews && reviews._id !== productId) {
      dispatch(getProductReviews(productId));
    }

    if (!error) {
      setErr(false);
      dispatch(clearErrors());
    } else {
      setErr(true);
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Review deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, productId, reviews, error, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    reviews.reviews.forEach((review) => {
      data.rows.push({
        user: review.name,
        rating: review.rating,
        comment: review.comment,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };
  function cancelHandle() {
    setErr(false);
    dispatch(clearErrors());
  }
  return (
    <Fragment>
      <MetaData title={'Product Reviews'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="wrapper my-3">
            <h3>{reviews && reviews.name}</h3>
          </div>
          <Fragment>
            {reviews &&
            reviews.reviews.length > 0 &&
            reviews._id == productId ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                data-aos="fade-up"
                data-aos-delay="50"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
