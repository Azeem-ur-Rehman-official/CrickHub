import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';

import { getData } from '../../../routes/FetchData';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
import Ining from './StartIning/Ining';
import MatchToss from './Toss/MatchToss';
const StartMatch = ({ match, history }) => {
  const alert = useAlert();

  const [toss, setToss] = useState(false);
  const [matchData, setMatchData] = useState();

  const dispatch = useDispatch();

  const scheduleId = match.params.id;

  useEffect(() => {
    getData(`/api/v1/get/all/tournament/match/single/inings/${scheduleId}`)
      .then((res) => {
        setMatchData(res.data.ining);
      })
      .catch((err) => {
        setToss(!toss);
      });
  }, [dispatch, alert, , history]);

  return (
    <div>
      <MetaData title={'FAQs'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div>
            {toss ? <MatchToss scheduleId={scheduleId}></MatchToss> : null}
            {matchData ? (
              <div className="">
                <Ining scheduleId={scheduleId} Ining={matchData} />
              </div>
            ) : (
              !toss && <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMatch;
