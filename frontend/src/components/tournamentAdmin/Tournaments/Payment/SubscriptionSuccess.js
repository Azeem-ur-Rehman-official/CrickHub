import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../../layout/MetaData';
const SubscriptionSuccess = () => {
  return (
    <Fragment>
      <MetaData title={'Successfully Subscribed'} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Subscription has purchased Successfully successfully.</h2>

          <Link to="/tournament/create">Create Tournament</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default SubscriptionSuccess;
