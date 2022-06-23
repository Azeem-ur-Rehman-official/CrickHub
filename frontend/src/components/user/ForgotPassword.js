import { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <div className="container my-5">
        <div className="row d-flex">
          <div className="col-lg-6 mx-auto">
            <form
              className="shadow-lg p-4 border-radius-20"
              onSubmit={submitHandler}
            >
              <h3 className="mb-3">Forgot Password</h3>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center mt-4">
                <button
                  id="forgot_password_button "
                  type="submit"
                  className="order-button px-5"
                  disabled={loading ? true : false}
                >
                  Get Verification Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
