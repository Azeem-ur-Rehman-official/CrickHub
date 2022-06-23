import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCard = (props) => {
  return (
    <div className='col-md-4 mt-md-5 mt-sm-4 subscription-col'>
      <div className='subscription-card'>
        <h2>{props.heading}</h2>
        <p>{props.description}</p>
        <p>Discount : {props.discount}%</p>
        <p>Price : ${props.price}</p>
        <Link to={`/subscription/payment/${props.id}`}>
          <button className='btn'>Subscribe</button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionCard;
