import { useEffect, useState } from 'react';
import { getData } from '../../routes/FetchData';
import '../css/subscription.css';
import Loader from '../layout/Loader';
import SubscriptionCard from './cards/SubscriptionCard';

const SubscriptionPage = () => {
  const [subscriptionData, setsubscriptionData] = useState();
  useEffect(() => {
    // setLoading(true);
    getData(`/api/v1/subscription`)
      .then((res) => {
        console.log(res.data.subscription);
        setsubscriptionData((r) => (r = res.data.subscription));
        // setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, []);
  return (
    <div className="subscription">
      {subscriptionData ? (
        <>
          <div className="container mt-md-5 mt-sm-4">
            <div className="row">
              <div className="col-12 text-center">
                <h3>Subscription Packages</h3>
              </div>
              {subscriptionData.map((data, i) => {
                return (
                  <SubscriptionCard
                    id={data._id}
                    discount={data.discount}
                    duration={data.duration}
                    description={data.description}
                    heading={data.heading}
                    price={data.price}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default SubscriptionPage;
