import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect, useState } from 'react';
import { getData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
const TopBowler = ({ match }) => {
  const [TopPlayers, setTopPlayers] = useState([]);
  console.log(TopPlayers);
  const getAllData = () => {
    getData('/api/v1/get/all/top/players/bowlers/list')
      .then((res) => {
        setTopPlayers(res.data.liveScore);
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'SIXS',
          field: 'sixs',
        },
        {
          label: 'FOURS',
          field: 'fours',
        },
        {
          label: 'OUT',
          field: 'out',
        },

        {
          label: 'NO BALLS',
          field: 'noballs',
        },
        {
          label: 'WIDE BALLS',
          field: 'wideballs',
        },
        {
          label: 'OVERS',
          field: 'overs',
        },
        {
          label: 'SCORE',
          field: 'score',
        },

        {
          label: 'ECONOMIC RATE',
          field: 'eRate',
          sort: 'Asc',
        },
      ],
      rows: [],
    };

    TopPlayers.forEach((user) => {
      var bal = user.score;
      var Out = user.out;
      var avrg = bal / Out;
      data.rows.push({
        image: (
          <>
            <img
              src={user.allplayers[0].imageLink}
              alt={user.allplayers[0].name}
              className="avatar2"
              width="60"
              height="60"
            ></img>
          </>
        ),
        name: user.allplayers[0].name,
        sixs: user.sixs,
        fours: user.fours,
        out: user.out,
        score: user.score,
        noballs: user.noBalls,
        wideballs: user.wideBalls,
        overs: (user.playedBalls / 6).toFixed(1),
        eRate: (user.score / (user.playedBalls / 6)).toFixed(1),

        // strike: ((user.score / user.playedBalls) * 100).toFixed(1),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'TopPlayerss'} />
      <div className="row m-0">
        <div className="col-12 col-md-12">
          <Fragment>
            <div className="d-flex mx-3">
              <h3 className="my-5">Top CrickHub Bowlers</h3>
            </div>

            <MDBDataTable
              data={setUsers()}
              className="px-3"
              data-aos="fade-up"
              data-aos-delay="50"
              bordered
              striped
              hover
            />
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default TopBowler;
