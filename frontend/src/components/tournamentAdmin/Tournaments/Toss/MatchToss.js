import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  clearErrors,
  getScheduleDetails,
} from '../../../../actions/scheduleAction';
import { getSingleTournamentTeams } from '../../../../actions/TeamAction';
import { postData } from '../../../../routes/FetchData';
const MatchToss = (props) => {
  const alert = useAlert();
  const history = useHistory();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [toss, setToss] = useState('');

  const [tossDecision, setTossDecision] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [overs, setOvers] = useState();

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

  const formData = new FormData();

  const submitHandler = (e) => {
    e.preventDefault();
    if (teamA === '' || tossDecision === '' || overs === '')
      alert.error('Please Fill out all the Fields');
    else {
      const formData = new FormData();
      formData.set('team_A_id', schedule.team_A_id);
      formData.set('team_B_id', schedule.team_B_id);
      formData.set('toss', toss);
      formData.set('tossDecision', tossDecision);
      formData.set('schedule', props.scheduleId);

      formData.set('overs', overs);
      formData.set('tournament', schedule.tournament_id);

      postData('/api/v1/tournament/match/ining/create', formData)
        .then((res) => {
          history.goBack();
          alert.show(
            `${toss} win the toss and decided to ${tossDecision} first`
          );
        })
        .catch((err) => {
          console.log(err.message);
          alert.show('somthing went wrong');
        });
    }
  };
  const SendData = () => {
    postData('/api/v1/tournament/match/ining/create', formData)
      .then((res) => {
        alert.show(`${toss} win the toss and decided to ${tossDecision} first`);
      })
      .catch((err) => {
        console.log(err.message);
        alert.show('somthing went wrong');
      });
  };
  useEffect(() => {
    if (schedule && schedule._id !== props.scheduleId) {
      dispatch(getScheduleDetails(props.scheduleId));
    } else {
      setTeamA(schedule.team_A_id);
      setTeamB(schedule.team_B_id);

      setTournamentId(schedule.tournament_id);
      dispatch(getSingleTournamentTeams(schedule.tournament_id));
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors());
    // }

    // if (isUpdated) {
    //   history.push(`/create/tournament/schedule/${tournamentId}`);
    //   alert.success('schedule updated successfully');
    //   dispatch({ type: UPDATE_SCHEDULE_RESET });
    // }
  }, [dispatch, alert, error, isUpdated, updateError, schedule]);

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
          <h3 className="mb-4 text-center">Start Match</h3>
          <div className="panel panel-danger">
            <div className="panel-body">
              <form
                id="reused_form"
                data-aos="fade-up"
                data-aos-delay="50"
                onSubmit={submitHandler}
              >
                <div className="form-group">
                  <label htmlFor="team_field">Toss Wining Team</label>
                  <select
                    className="form-control"
                    id="team_field"
                    value={toss}
                    onChange={(e) => {
                      setToss(e.target.value);
                    }}
                  >
                    <option value="select">Select</option>
                    {Teams &&
                      Teams.map(
                        (team) =>
                          (teamA == team._id || teamB == team._id) && (
                            <option key={team._id} value={team.name}>
                              {team.name}
                            </option>
                          )
                      )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="team_field">Toss Decision</label>
                  <select
                    className="form-control"
                    id="team_field"
                    value={tossDecision}
                    onChange={(e) => {
                      setTossDecision(e.target.value);
                    }}
                  >
                    <option value="null"></option>
                    <option value="bat">Bat</option>
                    <option value="bowl">Bowl</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <i className="fa fa-clock" aria-hidden="true"></i> Overs
                  </label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={overs}
                    onChange={(e) => setOvers(e.target.value)}
                    className="form-control"
                    placeholder="Choose Overs"
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-raised btn-block btn-success"
                    type="submit"
                    id="post"
                  >
                    Toss
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchToss;
