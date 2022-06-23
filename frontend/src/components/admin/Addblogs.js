import { useState } from 'react';
import { useAlert } from 'react-alert';
import { postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const Addblogs = () => {
  const alert = useAlert();
  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('heading', name);
    formData.set('description', description);
    formData.set('image', image);
    // console.log(`image : ${image}`);
    postData('/api/v1/admin/blog/new', formData)
      .then((res) => {
        setName('');
        setDescription('');
        setimage('');
        setimagePreview('/images/default_image.png');
        alert.show('Blog added successfully');
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
      <MetaData title={'Add Blog'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 ">
          <div>
            <form
              className="shadow-lg p-3 my-3 border-radius-20"
              onSubmit={submitHandler}
            >
              <h3 className="m-3">Add New Blog</h3>
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
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addblogs;
