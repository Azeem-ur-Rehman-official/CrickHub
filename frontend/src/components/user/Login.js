import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, login } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
const Login = ({ history, location }) => {
  const [validation, setValidation] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  let redirect = '';
  if (!isAuthenticated || user.role !== 'admin')
    redirect = location.search ? location.search.split('=')[1] : '/';
  else
    redirect = location.search ? location.search.split('=')[1] : '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, isAuthenticated, history]);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, []);

  const defaulValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your Email'),
    password: Yup.string().required('Please enter your password'),
  });
  const submitHandler = (values) => {
    const formData = new FormData();
    dispatch(clearErrors());
    formData.set('email', values.email);
    formData.set('password', values.password);
    console.log();
    dispatch(login(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Login'} />
          <div className="my-5">
            <div className="container" data-aos="fade-up" data-aos-delay="50">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <Formik
                    initialValues={defaulValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                  >
                    <Form className="shadow-lg border-radius-20 p-4">
                      {error ? (
                        <label htmlFor="email_field">
                          <p className="text-danger">
                            Email or Password is invalid
                          </p>
                        </label>
                      ) : null}
                      <h3 className="mb-3 text-center">Login</h3>

                      <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <Field
                          type="email"
                          name="email"
                          id="email_field"
                          className="form-control"
                        />
                        <p className="text-danger">
                          <ErrorMessage name="email" />
                        </p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <Field
                          type="password"
                          name="password"
                          id="password_field"
                          className="form-control"
                        />
                        <p className="text-danger">
                          <ErrorMessage name="password" />
                        </p>
                      </div>

                      <div className="text-right">
                        <Link to="/password/forgot" className="mb-4">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          id="login_button"
                          type="submit"
                          className=" order-button px-5"
                        >
                          LOGIN
                        </button>
                      </div>
                      <div className="text-center">
                        <Link to="/register" className="mt-3 btn">
                          Create a new account
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-lg-3"></div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
