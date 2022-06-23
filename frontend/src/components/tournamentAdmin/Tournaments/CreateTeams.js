import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newTeams } from '../../../actions/TeamAction';
import { NEW_TEAM_RESET } from '../../../constants/teamsConstant';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const CreateTeams = ({ match, history }) => {
  const alert = useAlert();
  const [name, setName] = useState('');
  const [tournament_id, setTournament_id] = useState(0);
  const [ownerName, setOwnerName] = useState('');

  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newTeam);

  const formData = new FormData();
  const teamId = match.params.id;
  const PostData = () => {
    dispatch(newTeams(formData));
  };
  const submitHandler = (e) => {
    e.preventDefault();

    formData.set('name', name);
    formData.set('tournament_id', tournament_id);
    formData.set('ownerName', ownerName);

    formData.set('image', image);
    formData.set('tournament_id', teamId);

    PostData();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push(`/view/team/${teamId}`);
      alert.success('Team created successfully');
      dispatch({ type: NEW_TEAM_RESET });
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
      <MetaData title={'FAQs'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="container py-5 col-12 col-md-10">
          <div className="container form-top">
            <div className="row">
              <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
                <h3 className="mb-4 text-center">Create New Team</h3>
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
                          <i className="fa fa-user" aria-hidden="true"></i> Team
                          Name
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
                          <i className="fa fa-user" aria-hidden="true"></i>{' '}
                          Owner Name
                        </label>
                        <input
                          type="text"
                          name="ownerName"
                          id="ownerName"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-raised btn-block btn-success"
                          type="submit"
                          id="post"
                        >
                          Create Team
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

export default CreateTeams;
