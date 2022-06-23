import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getData, postData } from '../../../routes/FetchData';
import Loader from '../../layout/Loader';
const BlogCardDetail = (props) => {
  // console.log(props);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [comment, setcomment] = useState('');
  const [blogsData, setblogsData] = useState();
  const [refresh, setrefresh] = useState(false);
  var logDiscription;
  if (blogsData) {
    blogsData.map((val) => {
      if (val._id === props.match.params.id) {
        logDiscription = val.description.split(/#+/);
        console.log(logDiscription);
      }
    });
  }

  useEffect(() => {
    // setLoading(true);
    getData(`/api/v1/blogs`)
      .then((res) => {
        // console.log(res.data.blog);
        setblogsData((r) => (r = res.data.blog));
        // setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [refresh]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('comment', comment);
    formData.set('blogId', props.match.params.id);
    postData('/api/v1/blog/review', formData)
      .then((res) => {
        setname('');
        setemail('');
        setcomment('');
        setrefresh(!refresh);
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  return (
    <>
      {blogsData ? (
        <>
          {blogsData.map((data) => {
            return (
              <>
                {data._id === props.match.params.id ? (
                  <section className="blog-details-area ptb-50">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="blog-details-desc">
                            <div className="article-image">
                              {/* <img src={} alt="image" /> */}
                            </div>

                            <div className="article-content">
                              <div className="details-content">
                                <span className="blog-image">
                                  <img
                                    src={data.image.url}
                                    alt={data.heading}
                                    className="img-thumbnail"
                                  />
                                </span>
                                <h3 className="text-uppercase">
                                  <a href="/blog-details">{data.heading}</a>
                                </h3>
                                <div className="post-meta">
                                  <a href="#">Admin</a>{' '}
                                  {new Date(data.createdAt).toDateString()}
                                </div>

                                <p className="text-justify">
                                  {logDiscription.map((val, id) => {
                                    return (
                                      <p className="text-justify" key={id}>
                                        {val}
                                      </p>
                                    );
                                  })}
                                </p>
                              </div>
                            </div>

                            <div className="comments-area">
                              <h3 className="comments-title">
                                Comments ({data.numOfReviews})
                              </h3>

                              <ol className="comment-list">
                                <li className="comment">
                                  {data.reviews.map((val) => {
                                    return (
                                      <div className="comment-body bg-darken-1">
                                        <footer className="comment-meta">
                                          <div className="comment-author vcard">
                                            <img
                                              src="https://www.w3schools.com/w3images/avatar2.png"
                                              alt="Avatar"
                                              class="avatar"
                                              width="50"
                                              className="rounded-circle mr-2"
                                            />
                                            <b className="fn">{val.name}</b>
                                          </div>
                                          <p className="fn">
                                            <b>Email : </b>
                                            {val.email}
                                          </p>
                                          <div className="comment-metadata">
                                            <a href="#">
                                              <span>
                                                <b>Date : </b>
                                                {new Date(
                                                  val.createdAt
                                                ).toDateString()}
                                              </span>
                                            </a>
                                          </div>
                                        </footer>
                                        <div className="comment-content">
                                          <p>
                                            <b>Comment :</b> {val.comment}
                                          </p>
                                        </div>
                                        <div className="reply"></div>
                                      </div>
                                    );
                                  })}
                                </li>
                              </ol>

                              <div className="comment-respond">
                                <h3 className="comment-reply-title">
                                  Leave A Reply
                                </h3>

                                <form
                                  className="comment-form"
                                  onSubmit={submitHandler}
                                >
                                  <p className="comment-notes">
                                    <span id="email-notes">
                                      Your email address will not be published.
                                    </span>
                                    Required fields are marked
                                    <span className="required">*</span>
                                  </p>
                                  <p className="comment-form-author">
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      id="author"
                                      name="author"
                                      value={name}
                                      onChange={(e) => setname(e.target.value)}
                                      required="required"
                                    />
                                  </p>
                                  <p className="comment-form-email">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      value={email}
                                      onChange={(e) => setemail(e.target.value)}
                                      required="required"
                                    />
                                  </p>

                                  <p className="comment-form-comment">
                                    <label>Comment</label>
                                    <textarea
                                      name="comment"
                                      id="comment"
                                      cols="45"
                                      rows="5"
                                      maxlength="65525"
                                      required="required"
                                      value={comment}
                                      onChange={(e) =>
                                        setcomment(e.target.value)
                                      }
                                    ></textarea>
                                  </p>

                                  <p className="form-submit">
                                    <input
                                      type="submit"
                                      name="submit"
                                      id="submit"
                                      className="submit"
                                      value="Post A Comment"
                                    />
                                  </p>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : null}
              </>
            );
          })}
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default withRouter(BlogCardDetail);
