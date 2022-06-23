import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { patchData, postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const Updateblog = (props) => {
  const alert = useAlert();
  const [name, setName] = useState('');
  const [blogsData, setblogsData] = useState();
  const [description, setDescription] = useState('');

  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');
  useEffect(() => {
    const id = props.match.params.id;
    // console.log(id);

    postData(`/api/v1/single/blog`, { id })
      .then((res) => {
        setName(res.data.blog.heading);
        setDescription(res.data.blog.description);
        setimagePreview(res.data.blog.image.url);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('heading', name);
    formData.set('description', description);
    formData.set('image', image);
    // console.log(`image : ${image}`);
    patchData(`/api/v1/admin/blog/${props.match.params.id}`, formData)
      .then((res) => {
        setName('');
        setDescription('');
        setimage('');
        setimagePreview('/images/default_image.png');
        alert.show('Blog updated successfully');
      })
      .catch((err) => {
        console.log(err.response);
        alert.show('somthing went wrong');
      });
    // dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    if (e.target.name === 'image') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagePreview(reader.result);
          setimage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div>
      <MetaData title={'Update Blog'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 ">
          <div>
            <h3 className="my-5">Update Blog</h3>

            <form className="shadow-lg" onSubmit={submitHandler}>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Heading</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group mx-3">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mx-3">
                <label htmlFor="image_upload">Blog Image</label>
                <div className=" align-items-center">
                  <div>
                    <figure className="image mr-3 item-rtl">
                      <img
                        src={imagePreview}
                        className="mt-3 mr-2 img-thumbnail"
                        width="300"
                        height="auto"
                        alt="image Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="image"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label " htmlFor="customFile">
                      Choose image
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn update-btn mx-3 mt-4 mb-3 ">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Updateblog);
