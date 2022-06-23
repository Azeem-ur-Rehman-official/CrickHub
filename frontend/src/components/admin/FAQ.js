import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteData, getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const FAQ = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [FAQ, setFAQ] = useState([]);
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  const getAllData = () => {
    getData(`/api/v1/faq`)
      .then((res) => {
        // console.log(`data is ${res}`);
        // console.log(res.data.faqs);
        setFAQ((r) => (r = res.data.faqs));
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const deleteUserHandler = (id) => {
    deleteData(`/api/v1/admin/faq/${id}`)
      .then((res) => {
        getAllData();
        alert.show('FAQ deleted successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'Question',
          field: 'question',
          sort: 'asc',
        },
        {
          label: 'Answer',
          field: 'answer',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    FAQ.forEach((user) => {
      data.rows.push({
        question: user.question,
        answer: user.answer,

        actions: (
          <Fragment>
            <Link
              to={`/faq-update/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'FAQs'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex mx-3">
              <h3 className="my-5">All Questions</h3>
              <Link
                to="/admin/add/faq"
                className="btn order-button ml-auto my-auto px-4"
              >
                <i className="fa fa-plus"></i> ADD
              </Link>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default FAQ;
