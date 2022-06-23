import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { getData, postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const JoinTournament = ({ match }) => {
  const alert = useAlert();
  const [teamID, setTeamID] = useState('');
  const [user, setUser] = useState('');
  const [playerRole, setplayerRole] = useState('');

  const tournamentId = match.params.id;

  const getProfileData = () => {
    getData('/api/v1/tournament/single/player/profile')
      .then((res) => {
        setUser(res.data.player._id);
        // setId(res.data.player._id);
      })
      .catch((err) => {
        alert.show(' First Register as a Player');
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('user', user);
    formData.set('join_id', teamID);
    formData.set('tournament_id', tournamentId);
    formData.set('teamRole', playerRole);

    // console.log(formData);
    postData('/api/v1/join/tournament/team', formData)
      .then((res) => {
        setTeamID('');

        alert.show('Your request has submitted successfully');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert.show(err.response.data.message);
      });

    // dispatch(updateProfile(formData));
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div>
      <MetaData title={'Join Tournament'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="container py-5 col-12 col-md-10">
          <div className="container form-top">
            <div className="row">
              <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
                <h3 className="mb-4 text-center">Join Tournament Team</h3>
                <div className="panel panel-danger">
                  <div className="panel-body">
                    <form
                      id="reused_form"
                      data-aos="fade-up"
                      data-aos-delay="50"
                      onSubmit={submitHandler}
                    >
                      <div className="form-group">
                        <label>
                          <i className="fa fa-user" aria-hidden="true"></i>{' '}
                          Authentication Id
                        </label>
                        <input
                          type="text"
                          name="teamID"
                          id="teamID"
                          value={teamID}
                          onChange={(e) => setTeamID(e.target.value)}
                          className="form-control"
                          placeholder="Please Enter your team Id"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-user" aria-hidden="true"></i> Team
                          Role
                        </label>
                        <select
                          id="playerRole"
                          name="playerRole"
                          value={playerRole}
                          onChange={(e) => setplayerRole(e.target.value)}
                          className="form-control"
                        >
                          <option value="NA">NA</option>
                          <option value="Captan">Captan</option>
                          <option value="Wicket Keeper">Wicket Keeper</option>
                          <option value="Bowler">Bowler</option>
                          <option value="Batsman">Batsman</option>
                          <option value="All Rounder">All Rounder</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-raised btn-block btn-success"
                          type="submit"
                          id="post"
                        >
                          Join Team
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

export default JoinTournament;
