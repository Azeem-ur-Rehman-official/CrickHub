import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getTournamentDetails,
  updateTournaments,
} from '../../../actions/tournamentActions';
import { UPDATE_TOURNAMENT_RESET } from '../../../constants/tournamentConstants';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const UpdateTournament = ({ match, history }) => {
  const alert = useAlert();
  const [name, setName] = useState('');
  const [noTeams, setnoTeams] = useState(0);
  const [date, setDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { error, tournament } = useSelector((state) => state.TournamentDetail);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.Tournament
  );
  const tournamentId = match.params.id;
  const formData = new FormData();

  const submitHandler = (e) => {
    e.preventDefault();

    formData.set('name', name);
    formData.set('noTeams', noTeams);
    formData.set('startingDate', date);
    formData.set('endingDate', endDate);
    formData.set('user', tournament.user);
    if (image == '') {
      formData.set('public_id', tournament.image.public_id);
      formData.set('image', image);
    } else formData.set('image', image);

    UpdateData();
  };
  const UpdateData = () => {
    dispatch(updateTournaments(tournament._id, formData));
  };
  useEffect(() => {
    if (tournament && tournament._id !== tournamentId) {
      dispatch(getTournamentDetails(tournamentId));
    } else {
      setName(tournament.name);
      setnoTeams(tournament.noTeams);
      setDate(tournament.startingDate);
      setendDate(tournament.endingDate);
      setimagePreview(tournament.image.url);
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
      history.push('/my/alltournaments');
      alert.success('tournament updated successfully');
      dispatch({ type: UPDATE_TOURNAMENT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, tournament, history]);
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
                <h3 className="mb-4 text-center">Update Tournament</h3>
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
                          Update Tournament
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

export default UpdateTournament;
