import { useState } from 'react';
import { useAlert } from 'react-alert';
import { postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const SendNotification = () => {
  const alert = useAlert();
  const [heading, setheading] = useState('');

  const [content, setcontent] = useState(``);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('heading', heading);
    formData.set('content', content);
    postData('/api/v1/admin/send/notification', formData)
      .then((res) => {
        setheading('');
        setcontent('');
        // console.log(res);
        alert.show('Notification added successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
    // dispatch(updateProfile(formData));
  };
  return (
    <div>
      <MetaData title={'Send Notification'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div>
            <form className="shadow-lg my-3 p-3" onSubmit={submitHandler}>
              <h3 className="m-3">Send Notification</h3>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Heading</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="heading"
                  value={heading}
                  onChange={(e) => setheading(e.target.value)}
                />
              </div>

              <div className="form-group mx-3">
                <label htmlFor="description_field">Content</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className=" update-btn order-button mx-3 px-5"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
