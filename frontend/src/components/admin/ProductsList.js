import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        image: (
          <>
            <img
              src={product.images[0].url}
              alt={product.name}
              className="img-thumbnail"
              width="60"
              height="60"
            ></img>
          </>
        ),

        name: product.name,
        status: product.status,
        price: `${product.price} PKR`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/reviews/${product._id}`}
              className="btn btn-primary py-1 px-2 mr-2 mb-2"
            >
              Rewiews
              <i className="fa fa-star ml-1"></i>
            </Link>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2 mb-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2 mb-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={'Products'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h3 className="m-3">All Products</h3>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                data-aos="fade-up"
                data-aos-delay="50"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
