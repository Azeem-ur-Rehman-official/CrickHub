import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import '../css/product.css';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Product from '../product/Product';
import ProductsBanner from '../Sections/ProductsBanner';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Products = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);
  const [range, setRange] = useState(1, 50000);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setstatus] = useState('published');
  const categories = [
    'Cricket Clothing',
    'Batting Equipment',
    'Wicket Set',
    'Wicket Keeping Equipment',
    'Cricket Bats',
    'Cricket Balls',
    'Cricket Footwear',
    'Halmets',
    'Cricket Bowling Machines',
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    // console.log(price);
    dispatch(
      getProducts(keyword, currentPage, price, category, rating, status)
    );
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    range,
    category,
    rating,
    status,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = filteredProductsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  function filterHandler() {
    setRange(price);
  }
  return (
    <div>
      <Fragment>
        <ProductsBanner />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={'Products'} />
            <div className="row">
              <div className="col-2 compare2 ml-5">
                <select
                  className="form-control "
                  id="category_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="default" className="text-danger firstOption">
                    Select Brand
                  </option>
                  {categories.map((value, id) => (
                    <>
                      <option key={id} value={value._id}>
                        {value}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              {category ? (
                <h3
                  id="products_heading"
                  className="col-8 text-center mb-4 text-uppercase"
                >
                  {category}
                </h3>
              ) : (
                <h3
                  id="products_heading"
                  className="col-8 text-center mb-4 text-uppercase"
                >
                  Latest Products
                </h3>
              )}
            </div>
            <section id="products" className="container my-5">
              <div className="row" data-aos="fade-up" data-aos-delay="50">
                {products && products.length > 0 ? (
                  <>
                    {products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </>
                ) : (
                  <div className="container my-5 text-center">
                    <div className="notFound">
                      <h5>No Product Found</h5>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Products;
