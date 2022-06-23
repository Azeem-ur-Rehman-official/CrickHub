import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getTeamDetails,
  updateTeams,
} from '../../../actions/TeamAction';
import { UPDATE_TEAM_RESET } from '../../../constants/teamsConstant';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const UpdateTeam = ({ match, history }) => {
  const alert = useAlert();

  const [name, setName] = useState('');
  const [tournament_id, setTournament_id] = useState(0);
  const [ownerName, setOwnerName] = useState('');

  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { error, team } = useSelector((state) => state.TeamDetail);
  const { error: updateError, isUpdated } = useSelector((state) => state.Team);
  const teamId = match.params.id;
  const formData = new FormData();

  const submitHandler = (e) => {
    e.preventDefault();

    formData.set('name', name);
    formData.set('tournament_id', tournament_id);
    formData.set('ownerName', ownerName);

    formData.set('team_id', teamId);
    if (image == '') {
      formData.set('public_id', team.image.public_id);
      formData.set('image', image);
    } else formData.set('image', image);

    UpdateData();
  };
  const UpdateData = () => {
    dispatch(updateTeams(teamId, formData));
  };
  useEffect(() => {
    if (team && team._id !== teamId) {
      dispatch(getTeamDetails(teamId));
    } else {
      setName(team.name);
      setOwnerName(team.ownerName);

      setTournament_id(team.tournament_id);
      setimagePreview(team.image.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push(`/view/team/${tournament_id}`);
      alert.success('team updated successfully');
      dispatch({ type: UPDATE_TEAM_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, team, history]);
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
                <h3 className="mb-4 text-center">Update Team</h3>
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
                          Update
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

export default UpdateTeam;
