import { useEffect, useState } from 'react';
import { getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import BlogCard from './cards/BlogCard';
const BlogPage = () => {
  const [blogsData, setblogsData] = useState();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // setLoading(true);
    getData(`/api/v1/blogs`)
      .then((res) => {
        // console.log(res.data.blog);
        setblogsData((r) => (r = res.data.blog));
        // setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, []);

  return (
    <section className="blog-area bg-color pt-50 pb-50">
      <div className="container">
        {blogsData ? (
          <>
            <div className="row" data-aos="fade-up" data-aos-delay="50">
              {blogsData.map((data, i) => {
                return (
                  <BlogCard
                    _id={data._id}
                    heading={data.heading}
                    image={data.image.url}
                    description={data.description}
                    createdAt={data.createdAt}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
