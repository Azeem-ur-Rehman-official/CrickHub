import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  newTournaments,
} from '../../../actions/tournamentActions';
import { NEW_TOURNAMENT_RESET } from '../../../constants/tournamentConstants';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const CreateTournament = ({ history }) => {
  const alert = useAlert();
  const [name, setName] = useState('');
  const [noTeams, setnoTeams] = useState(0);
  const [date, setDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.newTournament
  );

  const formData = new FormData();
  const PostData = () => {
    dispatch(newTournaments(formData));
  };
  const submitHandler = (e) => {
    e.preventDefault();

    formData.set('name', name);
    formData.set('noTeams', noTeams);
    formData.set('startingDate', date);
    formData.set('endingDate', endDate);
    formData.set('image', image);

    PostData();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push('/my/alltournaments');
      alert.success('Tournament created successfully');
      dispatch({ type: NEW_TOURNAMENT_RESET });
    }
  }, [dispatch, alert, error, success, history]);
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
      <MetaData title={'Create-Tournament'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="container py-5 col-12 col-md-10">
          <div className="container form-top">
            <div className="row">
              <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
                <h3 className="mb-4 text-center">Create New Tournament</h3>
                <div className="panel panel-danger">
                  <div className="panel-body">
                    <form
                      id="reused_form"
                      data-aos="fade-up"
                      data-aos-delay="50"
                      onSubmit={submitHandler}
                    >
                      <div className="form-group ">
                        <div className=" align-items-center">
                          <div>
                            <figure className="avatar mb-4 ">
                              <img
                                src={imagePreview}
                                className="mt-3 mr-2 rounded-circle"
                                alt="Avatar Preview"
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
                            <label
                              className="custom-file-label "
                              htmlFor="customFile"
                            >
                              Choose image
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-user" aria-hidden="true"></i> Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-users" aria-hidden="true"></i> No
                          of Teams
                        </label>
                        <input
                          type="number"
                          name="noTeams"
                          id="noTeams"
                          value={noTeams}
                          onChange={(e) => setnoTeams(e.target.value)}
                          className="form-control"
                          placeholder="Enter noTeams"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-clock" aria-hidden="true"></i>{' '}
                          Starting Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="form-control"
                          placeholder="Date"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-clock" aria-hidden="true"></i>{' '}
                          Ending Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={endDate}
                          onChange={(e) => setendDate(e.target.value)}
                          className="form-control"
                          placeholder="Ending Date"
                        />
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-raised btn-block btn-success"
                          type="submit"
                          id="post"
                        >
                          Create Tournament
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
