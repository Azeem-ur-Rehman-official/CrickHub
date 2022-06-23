import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-4 my-3`}>
      <Link className="cardLink" to={`/product/${product._id}`}>
        <div className="card p-3 border-radius-20">
          <img
            className="card-img-top mx-auto"
            src={product.images[0].url}
            alt=""
          />
          <div className="card-body d-flex flex-column text-center">
            <h5 className="card-title">
              {product.name.substring(0, 100)}
              {product.name.length > 100 && '...'}
            </h5>

            <p className="card-text">Rs. {product.price}</p>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            </div>
            {/* <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
