import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { getData, postData } from '../../../../routes/FetchData';
import '../../../css/liveScorePannel.css';
import LiveScoreIningCard from './LiveScoreIningCard';
const Ining = (props) => {
  console.log('props');
  console.log(props);
  const alert = useAlert();
  const history = useHistory();
  //states

  const [singleIningeLiveData, setsingleIningeLiveData] = useState([]);
  const [ining, setining] = useState(true);
  const [over, setover] = useState(0);
  const [batsmanA, setbatsmanA] = useState('');
  const [batsmanB, setbatsmanB] = useState('');
  const [bowler, setbowler] = useState('');
  const [noBalls, setnoBalls] = useState(0);
  const [wideBalls, setwideBalls] = useState(0);
  const [batsman, setbatsman] = useState('');
  const [previousPlayedBalls, setpreviousPlayedBalls] = useState(6);
  const [playedBalls, setplayedBalls] = useState(1);
  const [finishIningId, setfinishIningTeamId] = useState('');
  const [sixs, setsixs] = useState(0);
  const [running, setrunning] = useState(0);
  const [fours, setfours] = useState(0);
  const [out, setout] = useState(false);
  const [batsmanScore, setbatsmanScore] = useState(0);
  const [totalScore, settotalScore] = useState(0);
  const [batingTeamID, setbatingTeamID] = useState('');
  const [socket, setSocket] = useState(null);
  //Teams data
  const [teams, setteams] = useState([]);
  //Team Squad
  const [teambatsmans, setteamBatsmans] = useState([]);
  const [teamBowlers, setteamBowlers] = useState([]);

  const formData = new FormData();

  const getTeamsData = () => {
    formData.set('teamA', props.Ining.schedule.team_A_id);
    formData.set('teamB', props.Ining.schedule.team_B_id);
    postData('/api/v1/get/match/teams', formData)
      .then((res) => {
        setteams(res.data.team);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getTeamsBatsmanData = (id) => {
    getData(`/api/v1/get/all/team/squad/${id}`)
      .then((res) => {
        setteamBatsmans(res.data.join);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getTeamsBowlerData = (id) => {
    getData(`/api/v1/get/all/team/squad/${id}`)
      .then((res) => {
        setteamBowlers(res.data.join);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getSingleIningLiveData = (id) => {
    getData(`/api/v1/get/all/tournament/match/single/live/inings/${id}`)
      .then((res) => {
        setsingleIningeLiveData(res.data.ining);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getSingleIningLiveData(props.Ining._id);
    if (
      props.Ining.team_A_id == props.Ining.toss._id &&
      props.Ining.tossDecision == 'bat' &&
      props.Ining.teamA_Ining_Status == false &&
      props.Ining.teamB_Ining_Status == false
    ) {
      setfinishIningTeamId('teamA');
      getTeamsBatsmanData(props.Ining.team_A_id);
      getTeamsBowlerData(props.Ining.team_B_id);
      setbatingTeamID(props.Ining.team_A_id);
      setining(true);
    } else if (
      props.Ining.team_A_id == props.Ining.toss._id &&
      props.Ining.tossDecision == 'bowl' &&
      props.Ining.teamB_Ining_Status == false &&
      props.Ining.teamA_Ining_Status == false
    ) {
      setfinishIningTeamId('teamB');
      getTeamsBatsmanData(props.Ining.team_B_id);
      getTeamsBowlerData(props.Ining.team_A_id);
      setbatingTeamID(props.Ining.team_B_id);
      setining(true);
    }
    //2nd
    if (
      props.Ining.team_B_id == props.Ining.toss._id &&
      props.Ining.tossDecision == 'bat' &&
      props.Ining.teamA_Ining_Status == false &&
      props.Ining.teamB_Ining_Status == false
    ) {
      setfinishIningTeamId('teamB');
      getTeamsBatsmanData(props.Ining.team_B_id);
      getTeamsBowlerData(props.Ining.team_A_id);
      setbatingTeamID(props.Ining.team_B_id);
      setining(true);
    } else if (
      props.Ining.team_B_id == props.Ining.toss._id &&
      props.Ining.tossDecision == 'bowl' &&
      props.Ining.teamB_Ining_Status == false &&
      props.Ining.teamA_Ining_Status == false
    ) {
      setfinishIningTeamId('teamA');
      getTeamsBatsmanData(props.Ining.team_A_id);
      getTeamsBowlerData(props.Ining.team_B_id);
      setbatingTeamID(props.Ining.team_A_id);
      setining(true);
    } else if (props.Ining.teamA_Ining_Status == true) {
      setfinishIningTeamId('teamB');
      getTeamsBatsmanData(props.Ining.team_B_id);
      getTeamsBowlerData(props.Ining.team_A_id);
      setbatingTeamID(props.Ining.team_B_id);
      setining(false);
    } else if (props.Ining.teamB_Ining_Status == true) {
      setfinishIningTeamId('teamA');
      getTeamsBatsmanData(props.Ining.team_A_id);
      getTeamsBowlerData(props.Ining.team_B_id);
      setbatingTeamID(props.Ining.team_A_id);
      setining(false);
    }

    getTeamsData();

    // socket live connection
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (noBalls + playedBalls < sixs + fours + running) {
      setsixs(0);
      setfours(0);
      setrunning(0);
    }
    setbatsmanScore(running + sixs * 6 + fours * 4);
  }, [sixs, fours]);
  useEffect(() => {
    setplayedBalls(1);
    setsixs(0);
    setfours(0);
    setrunning(0);
  }, [batsman]);
  useEffect(() => {
    if (previousPlayedBalls == 0) {
      setover(over + 1);
      setpreviousPlayedBalls(6);
    }
    setplayedBalls(1);
  }, [previousPlayedBalls]);

  useEffect(() => {
    setbatsmanScore(running + sixs * 6 + fours * 4);
    settotalScore(batsmanScore + wideBalls + noBalls);
  }, [running, batsmanScore, noBalls, wideBalls]);
  useEffect(() => {
    if (socket) {
      socket.on('sendLiveScore', (msg) => {
        if (msg.success == true) {
          setsixs(0);
          setfours(0);
          setrunning(0);
          getSingleIningLiveData(props.Ining._id);
          alert.success('Score Updated Successfully');
        }
      });

      return () => socket.off('sendLiveScore');
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socket.on('finishSuccess', (msg) => {
        if (msg.success == true) {
          history.goBack();
          alert.success('Ining has Finished');
        }
      });

      return () => socket.off('finishSuccess');
    }
  }, [socket]);
  const socketFun = (toss, winnerTeam, loserTeam) => {
    socket.emit('finishIning', {
      toss,
      finishIningId,
      winnerTeam,
      loserTeam,
      tournament: props.Ining.tournament,
      Ining: props.Ining._id,
      _id: props.Ining.schedule._id,
    });
  };
  const finishIning = (e) => {
    if (
      props.Ining.teamB_Ining_Status == true &&
      props.Ining.teamA_Score > props.Ining.teamB_Score
    )
      socketFun(props.Ining._id, props.Ining.team_A_id, props.Ining.team_B_id);
    else if (
      props.Ining.teamB_Ining_Status == true &&
      props.Ining.teamA_Score < props.Ining.teamB_Score
    )
      socketFun(props.Ining._id, props.Ining.team_B_id, props.Ining.team_A_id);
    else if (
      props.Ining.teamA_Ining_Status == true &&
      props.Ining.teamA_Score < props.Ining.teamB_Score
    )
      socketFun(props.Ining._id, props.Ining.team_B_id, props.Ining.team_A_id);
    else if (
      props.Ining.teamA_Ining_Status == true &&
      props.Ining.teamA_Score > props.Ining.teamB_Score
    )
      socketFun(props.Ining._id, props.Ining.team_A_id, props.Ining.team_B_id);
    else {
      socket.emit('finishIning', {
        toss: props.Ining._id,
        finishIningId,
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (props.Ining.overs > over) {
      setpreviousPlayedBalls(previousPlayedBalls - playedBalls);
      socket.emit('pushLiveTeamScore', {
        toss: props.Ining._id,
        ining,
        over,
        bowler,
        noBalls,
        wideBalls,
        batsman,
        playedBalls,
        out,
        previousPlayedBalls,
        sixs,
        fours,
        batsmanScore,
        totalScore,
        batingTeamID,
      });
    } else {
      alert.success('Overs are Finished');
    }
  };
  console.log(props);
  return (
    <div className="main_live">
      <span className="">
        <LiveScoreIningCard payload={singleIningeLiveData} />
      </span>
      <div>
        <form
          id="reused_form"
          data-aos="fade-up"
          data-aos-delay="50"
          className="row "
          onSubmit={submitHandler}
        >
          <div className="col-12 row my-2 m-0 p-0">
            <div className="col-12 form-group my-2">
              <h5 className="text-center text-success">
                Total Over Score ({totalScore})
              </h5>
            </div>
            <div className="col-6 form-group">
              <label htmlFor="team_input">Ining</label>
              <input
                className="form-control"
                id="team_input"
                value={ining ? '1st' : '2nd'}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label htmlFor="team_input">Over</label>
              <input
                type="Number"
                className="form-control"
                min="0"
                max={props.Ining.overs}
                id="over"
                value={over}
                onChange={(e) => {
                  setover(Number(e.target.value));
                }}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label htmlFor="team_input">Batsman A</label>
              <select
                value={batsmanA}
                onChange={(e) => setbatsmanA(e.target.value)}
                className="form-control"
                id="team_input"
              >
                <option value="select">Select</option>
                {teambatsmans &&
                  teambatsmans.length > 0 &&
                  teambatsmans.map((val, id) => {
                    return (
                      <option value={val.user._id} key={id}>
                        {val.user.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6 form-group">
              <label htmlFor="team_input">Batsman B</label>
              <select
                value={batsmanB}
                onChange={(e) => setbatsmanB(e.target.value)}
                className="form-control"
                id="team_input"
              >
                <option value="select">Select</option>
                {teambatsmans &&
                  teambatsmans.length > 0 &&
                  teambatsmans.map((val, id) => {
                    return (
                      <option value={val.user._id} key={id}>
                        {val.user.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col-12 row my-2 m-0 p-0">
            {' '}
            <div className="col-6 col-md-4 col-lg-4 form-group">
              <label htmlFor="team_input">Select Bowler</label>
              <select
                value={bowler}
                onChange={(e) => setbowler(e.target.value)}
                className="form-control"
                id="team_input"
              >
                <option value="select">Select</option>
                {teamBowlers &&
                  teamBowlers.length > 0 &&
                  teamBowlers.map((val, id) => {
                    return (
                      <option value={val.user._id} key={id}>
                        {val.user.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-4 form-group">
              <label htmlFor="team_input">No Balls</label>
              <input
                type="Number"
                className="form-control"
                id="no_balls"
                value={noBalls}
                onChange={(e) => setnoBalls(Number(e.target.value))}
              ></input>
            </div>
            <div className="col-6 col-md-4 col-lg-4 form-group">
              <label htmlFor="team_input">Wide Balls</label>
              <input
                type="Number"
                className="form-control"
                id="wide_balls"
                value={wideBalls}
                onChange={(e) => setwideBalls(Number(e.target.value))}
              ></input>
            </div>
          </div>

          <div className="col-12 row my-2 m-0 p-0">
            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Batsman</label>
              <select
                value={batsman}
                onChange={(e) => setbatsman(e.target.value)}
                className="form-control"
                id="team_input"
              >
                <option value="choose">choose</option>

                <option value={batsmanA}>Batsman A</option>
                <option value={batsmanB}>Batsman B</option>
              </select>
            </div>
            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Played Balls</label>
              <input
                type="Number"
                className="form-control"
                id="wide_balls"
                min={1}
                max={previousPlayedBalls}
                value={playedBalls}
                onChange={(e) => setplayedBalls(Number(e.target.value))}
              ></input>
            </div>

            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Sixs</label>
              <input
                type="Number"
                className="form-control"
                id="wide_balls"
                value={sixs}
                onChange={(e) => {
                  noBalls + playedBalls > sixs + fours &&
                    setsixs(Number(e.target.value));
                }}
              ></input>
            </div>
            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Fours</label>
              <input
                type="Number"
                className="form-control"
                id="wide_balls"
                value={fours}
                onChange={(e) => {
                  noBalls + playedBalls > sixs + fours &&
                    setfours(Number(e.target.value));
                }}
              ></input>
            </div>
            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Runing</label>
              <input
                type="Number"
                className="form-control"
                id="batsman_score"
                value={running}
                onChange={(e) => setrunning(Number(e.target.value))}
              ></input>
            </div>
            <div className="col-6 col-md-3 col-lg-2 form-group">
              <label htmlFor="team_input">Batsman Score</label>
              <span className="form-control" id="batsman_score">
                {batsmanScore}
              </span>
            </div>
            <div className="col-12 col-md-12 col-lg-12 form-group row mx-auto mt-2">
              <h5 className="outHeading mt-2 text-danger">OUT</h5>
              <input
                className="form-control rounded outCheck mx-1"
                type="checkbox"
                focus={false}
                value={out}
                onChange={(e) => setout(!out)}
              ></input>
            </div>
          </div>

          <div className="col-6 form-group mb-5">
            <button
              className="btn btn-raised btn-block btn-success"
              type="submit"
              id="post"
            >
              Update Score
            </button>
          </div>
          <div className="col-6 form-group mb-5">
            <button
              className="btn btn-raised btn-block btn-danger"
              onClick={() => finishIning()}
              id="post"
            >
              Finish {ining ? '1st' : '2nd'} Ining
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ining;
