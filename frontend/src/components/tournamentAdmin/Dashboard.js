import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAdminTournaments,
  getTournaments,
} from '../../actions/tournamentActions';
import { getData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [teams, setteams] = useState([]);
  const [players, setplayers] = useState([]);
  const [liveMatches, setliveMatches] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { Tournaments } = useSelector((state) => state.Tournaments);
  const getAllTeam = () => {
    getData(`/api/v1/get/all/team`)
      .then((res) => {
        setteams(res.data.team);
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  const getAllPlayers = () => {
    getData(`/api/v1/tournament/players/profile`)
      .then((res) => {
        setplayers(res.data.player);
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  const getAllLiveMatches = () => {
    getData(`/api/v1/get/all/tournament/match/inings`)
      .then((res) => {
        setliveMatches(res.data.ining);
      })
      .catch((err) => console.log(err.response.data.msg));
  };

  useEffect(() => {
    getAllTeam();
    getAllPlayers();
    getAllLiveMatches();
    if (user && user.role !== 'admin') dispatch(getTournaments());
    else dispatch(getAdminTournaments());
  }, [user, dispatch]);

  return (
    <Fragment>
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 my-3">
          <Fragment>
            <MetaData title={'Admin Dashboard'} />
            {user && user.role !== 'admin' ? (
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="topCard o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br /> <b>$</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="row pr-4">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Tournaments
                      <br /> <b>{Tournaments && Tournaments.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/my/alltournaments"
                  >
                    <span className="float-left">Matches</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Live Matches
                      <br /> <b>{liveMatches.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/tournaments/matches/live"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Players
                      <br /> <b>{players.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/tournament/players/profile"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size cardDetail">
                      Teams
                      <br /> <b>{teams.length}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
          <div className="container">
            <h5>User Statitics</h5>
            <div className="row">
              <div className="col-6">Total Tournaments</div>
              <div className="col-6">Total Score</div>
              <div className="col-6">Average</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
