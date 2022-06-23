import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = ({ history }) => {
  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    history.push('/payment');
  };

  return (
    <Fragment>
      <div className="container" data-aos="fade-up" data-aos-delay="50">
        <MetaData title={'Confirm Order'} />

        <CheckoutSteps shipping confirmOrder />

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{' '}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div className="cart-item my-1" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        Rs. {item.quantity} x {item.price}
                        <b>Rs. {(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />

              <p>
                Subtotal:{' '}
                <span className="order-summary-values">Rs. {itemsPrice}</span>
              </p>
              <p>
                Shipping:{' '}
                <span className="order-summary-values">
                  Rs. {shippingPrice}
                </span>
              </p>
              <p>
                Tax:{' '}
                <span className="order-summary-values">Rs. {taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{' '}
                <span className="order-summary-values">Rs. {totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Debit / Credit Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
