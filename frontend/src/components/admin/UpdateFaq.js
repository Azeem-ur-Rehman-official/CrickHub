import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { patchData, postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const UpdateFaq = (props) => {
  const alert = useAlert();
  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const id = props.match.params.id;
    // console.log(id);
    // setLoading(true);
    postData(`/api/v1/single/faq`, { id })
      .then((res) => {
        setQuestion(res.data.faqs.question);
        setAnswer(res.data.faqs.answer);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('question', question);
    formData.set('answer', answer);
    patchData(`/api/v1/admin/faq/${props.match.params.id}`, formData)
      .then((res) => {
        setQuestion('');
        setAnswer('');
        alert.show('FAQ updated successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
    // dispatch(updateProfile(formData));
  };
  return (
    <div>
      <MetaData title={'Update FAQs'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div>
            <form className="shadow-lg my-3 p-3" onSubmit={submitHandler}>
              <h3 className="m-3">Update FAQ</h3>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Question</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div className="form-group mx-3">
                <label htmlFor="description_field">Answer</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="update-btn order-button mx-3 px-5"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateFaq);
