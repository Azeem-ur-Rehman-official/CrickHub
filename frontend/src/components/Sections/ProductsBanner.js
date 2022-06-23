import banner from '../../assets/img/banner4.jpg';

const ProductsBanner = () => {
  return (
    <div
      className="container-fluid my-3  p-5"
      data-aos="fade-up"
      data-aos-delay="50"
    >
      <img src={banner} className="product-top-banner" alt="banner-top" />
    </div>
  );
};

export default ProductsBanner;
