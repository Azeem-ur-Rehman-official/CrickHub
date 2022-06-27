import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { clearErrors, register } from '../../actions/userActions';
import MetaData from '../layout/MetaData';

const Register = ({ history }) => {
  const defaulValues = {
    name: '',
    email: '',
    address: '',
    avatar: '',
    city: '',
    phone: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name should be at least 3 character long')
      .required('Please enter your name'),
    avatar: Yup.string().required('File is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email'),
    address: Yup.string().required('Please enter your Address'),
    city: Yup.string().required('Please enter your city'),
    phone: Yup.number()
      .required()
      .positive()
      .integer()
      .min(1111111111, 'Phone number should be at least 11 digits')
      .required('Please enter your phone number'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 character long')
      .required('Please enter your password'),
  });

  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (values) => {
    dispatch(clearErrors());

    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('email', values.email);
    formData.set('address', values.address);
    formData.set('country', values.country);
    formData.set('city', values.city);
    formData.set('phone', values.phone);
    formData.set('password', values.password);
    formData.set('avatar', values.avatar);
    dispatch(register(formData));
  };

  return (
    <Fragment>
      <MetaData title={'Register User'} />
      <div className="container my-5">
        <Formik
          initialValues={defaulValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form
              className="shadow-lg p-4 border-radius-20 myBackground"
              data-aos="fade-up"
              data-aos-delay="50"
              encType="multipart/form-data"
            >
              <h3 className="mb-3 text-center">Register</h3>

              <div className="row mt-5">
                <div className="col-lg-4">
                  <div className="form-group">
                    <div className="d-flex align-items-center">
                      <figure className="avatar">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Avatar Preview"
                        />
                        <input
                          type="file"
                          name="avatar"
                          className="hidden-file-input"
                          id="customFile"
                          accept="images/*"
                          onChange={(e) => {
                            const reader = new FileReader();

                            reader.onload = (e) => {
                              if (reader.readyState === 2) {
                                setFieldValue('avatar', reader.result);
                                setAvatarPreview(reader.result);
                              }
                            };

                            reader.readAsDataURL(e.target.files[0]);
                          }}
                        />
                        <p className="text-danger text-center mt-2">
                          <ErrorMessage name="avatar" />
                        </p>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <Field
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="name" />
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <Field
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_field">Address</label>
                    <Field
                      type="txt"
                      id="address_field"
                      className="form-control"
                      name="address"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="address" />
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">City</label>
                    <Field
                      type="txt"
                      id="city_field"
                      className="form-control"
                      name="city"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="city" />
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_field">Phone</label>
                    <Field
                      type="number"
                      id="phone_field"
                      className="form-control"
                      name="phone"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <Field
                      type="password"
                      id="password_field"
                      className="form-control"
                      name="password"
                    />
                    <p className="text-danger">
                      <ErrorMessage name="password" />
                    </p>
                  </div>

                  <div className="text-center mt-5 mb-4">
                    <button
                      id="register_button"
                      type="submit"
                      className="order-button px-5"
                      disabled={loading ? true : false}
                    >
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default Register;
