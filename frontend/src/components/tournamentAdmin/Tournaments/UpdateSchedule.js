import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getScheduleDetails,
  UpdateSchedules,
} from '../../../actions/scheduleAction';
import { getSingleTournamentTeams } from '../../../actions/TeamAction';
import { UPDATE_SCHEDULE_RESET } from '../../../constants/scheduleConstant';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const UpdateSchedule = ({ match, history }) => {
  const alert = useAlert();

  const [teamA, setTeamA] = useState('');

  const [teamB, setTeamB] = useState('');
  const [locationName, setLocationName] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [date, setDate] = useState();
  const [locationLink, setLocationLink] = useState('');
  const dispatch = useDispatch();
  const { error, schedule } = useSelector((state) => state.ScheduleDetail);
  console.log(schedule);
  const {
    loading,
    error: schedualError,
    Teams,
  } = useSelector((state) => state.Teams);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.Schedule
  );
  const scheduleId = match.params.id;
  const formData = new FormData();

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
      formData.set('locationName', locationName);
      formData.set('locationLink', locationLink);
      formData.set('tournament_id', tournamentId);
      formData.set('MatchDateTime', date);

      dispatch(UpdateSchedules(scheduleId, formData));
    }
  };
  const UpdateData = () => {
    dispatch(UpdateSchedules(scheduleId, formData));
  };
  useEffect(() => {
    if (schedule && schedule._id !== scheduleId) {
      dispatch(getScheduleDetails(scheduleId));
    } else {
      setTeamA(schedule.team_A_id);
      setTeamB(schedule.team_B_id);
      setLocationName(schedule.locationName);
      setLocationLink(schedule.locationLink);

      setTournamentId(schedule.tournament_id);
      dispatch(getSingleTournamentTeams(schedule.tournament_id));
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
      history.push(`/create/tournament/schedule/${tournamentId}`);
      alert.success('schedule updated successfully');
      dispatch({ type: UPDATE_SCHEDULE_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, schedule, history]);

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
                        <button
                          className="btn btn-raised btn-block btn-success"
                          type="submit"
                          id="post"
                        >
                          Update Schedule
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

export default UpdateSchedule;
