import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { getData } from '../../../routes/FetchData';
import MetaData from '../../layout/MetaData';
import LiveScoreCard from '../cards/LiveScoreCard';
const LiveMatches = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [matchData, setMatchData] = useState();
  const [socket, setSocket] = useState(null);
  const [load, setLoad] = useState(false);
  const [liveLoad, setliveLoad] = useState(true);
  console.log(matchData);
  useEffect(() => {
    // socket live connection
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('sendLiveScore', (msg) => {
        if (msg.success == true)
          getData('/api/v1/get/all/tournament/match/inings')
            .then((res) => {
              console.log(res.data);
              setMatchData(res.data.ining);
              setLoad(!load);
            })
            .catch((err) => {
              console.log(err);
            });
      });

      return () => socket.off('sendLiveScore');
    }
  }, [socket]);
  useEffect(() => {
    getData('/api/v1/get/all/tournament/match/inings')
      .then((res) => {
        console.log(res.data);
        setMatchData(res.data.ining);
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, alert]);

  return (
    <Fragment>
      <MetaData title={'Tournament-List'} />
      {matchData && (
        <div className="row m-0">
          <div className="col-12 col-md-12">
            <Fragment>
              {/* <div className="d-flex mx-3">
                <h3 className="my-2">Live Matches</h3>
              </div> */}
              <div className="row d-flex align-content-center py-5">
                {matchData &&
                  matchData.map((val, id) => {
                    return <LiveScoreCard payload={val} key={id} />;
                  })}
              </div>

              {/* {matchData &&
                matchData.map((val, id) => {
                  return <p key={id}>{val._id}</p>;
                })} */}
            </Fragment>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LiveMatches;
