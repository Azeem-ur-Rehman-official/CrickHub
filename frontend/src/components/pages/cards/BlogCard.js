import { Link } from 'react-router-dom';

const BlogCard = (props) => {
  {
    /* <div className="cardHeading">
      <h2>Heading : {props.heading}</h2>
      <p>Discription : {props.description}</p>
      <span>Image</span>
      <img src={props.image} alt="image"></img>
    </div> */
  }
  return (
    <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="50">
      <div className="single-blog">
        <div className="blog-image">
          <Link to={'/blog-details/' + props._id}>
            <img src={props.image} alt="image" />
          </Link>
        </div>
        <div className="blog-content">
          <h3 className="text-uppercase">
            <Link to={'/blog-details/' + props._id}>{props.heading}</Link>
          </h3>
          <div className="post-meta">
            {new Date(props.createdAt).toDateString()}
          </div>
          <p>
            {props.description.substring(0, 100)}
            {props.description.length > 100 && '...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
