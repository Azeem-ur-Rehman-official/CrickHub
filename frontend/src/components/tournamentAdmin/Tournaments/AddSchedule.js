import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newSchdules } from '../../../actions/scheduleAction';
import { getSingleTournamentTeams } from '../../../actions/TeamAction';
import { NEW_SCHEDULE_RESET } from '../../../constants/scheduleConstant';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const AddSchedule = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [teamA, setTeamA] = useState('');
  const [matchType, setMatchType] = useState('simple');
  const [teamB, setTeamB] = useState('');
  const [locationName, setLocationName] = useState('');

  const [date, setDate] = useState();
  const [locationLink, setLocationLink] = useState('');

  const {
    loading,
    error: schedualError,
    Teams,
  } = useSelector((state) => state.Teams);
  const { error, success } = useSelector((state) => state.newSchedule);

  const tournamentId = match.params.id;
  useEffect(() => {
    dispatch(getSingleTournamentTeams(tournamentId));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (schedualError) {
      alert.error(schedualError);
      dispatch(clearErrors());
    }
    if (success) {
      history.push(`/create/tournament/schedule/${tournamentId}`);
      alert.success('Schedule created successfully');
      dispatch({ type: NEW_SCHEDULE_RESET });
    }
  }, [dispatch, alert, error, history, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      teamA === '' ||
      teamB === '' ||
      locationName === '' ||
      locationLink === '' ||
      date === ''
    )
      alert.error('Please Fill out all the Fields');
    else {
      const formData = new FormData();
      formData.set('team_A_id', teamA);
      formData.set('team_B_id', teamB);
      formData.set('matchType', matchType);
      formData.set('locationName', locationName);
      formData.set('locationLink', locationLink);
      formData.set('tournament_id', tournamentId);
      formData.set('MatchDateTime', date);
      console.log(formData);
      dispatch(newSchdules(formData));
    }
  };
  return (
    <Fragment>
      <MetaData title={'Team-List'} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row m-0">
          <div className="col-12 col-md-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="container py-5 col-12 col-md-10">
            <div className="container form-top">
              <div className="row">
                <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
                  <h3 className="mb-4 text-center">Create Schedule</h3>

                  <div className="panel panel-danger">
                    <div className="panel-body">
                      <form
                        id="reused_form"
                        data-aos="fade-up"
                        data-aos-delay="50"
                        onSubmit={submitHandler}
                      >
                        <div className="form-group">
                          <label htmlFor="team_field">Slect Team-A</label>
                          <select
                            className="form-control"
                            id="team_field"
                            value={teamA}
                            onChange={(e) => {
                              setTeamA(e.target.value);
                            }}
                          >
                            <option value="select">Select</option>
                            {Teams &&
                              Teams.map((team) => (
                                <option key={team._id} value={team.name}>
                                  {team.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="team_field">Slect Team-B</label>
                          <select
                            className="form-control"
                            id="team_field"
                            value={teamB}
                            onChange={(e) => {
                              setTeamB(e.target.value);
                            }}
                          >
                            <option value="select">Select</option>
                            {Teams &&
                              Teams.map((team) => (
                                <option key={team._id} value={team.name}>
                                  {team.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>
                            <i className="fa fa-user" aria-hidden="true"></i>{' '}
                            Location Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            className="form-control"
                            placeholder="Location Name"
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            <i className="fa fa-user" aria-hidden="true"></i>{' '}
                            Location Link
                            <i
                              className="fa fa-location-arrow ml-3 mr-1 text-primary"
                              aria-hidden="true"
                            ></i>
                            <a
                              target="_blank"
                              className="text-primary"
                              href="https://www.google.com/maps/place/Pakistan/@30.0681241,60.3233711,5z/data=!3m1!4b1!4m5!3m4!1s0x38db52d2f8fd751f:0x46b7a1f7e614925c!8m2!3d30.375321!4d69.345116"
                            >
                              Google map
                            </a>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={locationLink}
                            onChange={(e) => setLocationLink(e.target.value)}
                            className="form-control"
                            placeholder="Share your Location from google map"
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <i className="fa fa-clock" aria-hidden="true"></i>{' '}
                            Date
                          </label>
                          <input
                            type="datetime-local"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-control"
                            placeholder="Date"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="match_type">Match Type</label>
                          <select
                            className="form-control"
                            id="match_type"
                            value={matchType}
                            onChange={(e) => {
                              setMatchType(e.target.value);
                            }}
                          >
                            <option value="simple">simple</option>
                            <option value="quarter-final">Quarter Final</option>
                            <option value="semi-final">Semi Final</option>
                            <option value="final">Final</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-raised btn-block btn-success"
                            type="submit"
                            id="post"
                          >
                            Create Schedule
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
      )}
    </Fragment>
  );
};

export default AddSchedule;
