import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearErrors,
  getAllTournaments,
} from '../../../actions/tournamentActions';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

const JoinTournamentTeam = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading, error, Tournaments } = useSelector(
    (state) => state.Tournaments
  );

  useEffect(() => {
    dispatch(getAllTournaments());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history, user]);

  const settournaments = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Starting',
          field: 'startingDate',
          sort: 'asc',
        },

        {
          label: 'Ending',
          field: 'endingDate',
          sort: 'asc',
        },
        {
          label: 'Owner',
          field: 'owner',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    Tournaments.forEach((tournament) => {
      data.rows.push({
        image: (
          <>
            <img
              src={tournament.image.url}
              alt={tournament.name}
              className="img-thumbnail"
              width="60"
              height="60"
            ></img>
          </>
        ),
        name: tournament.name,
        startingDate: new Date(tournament.startingDate).toDateString(),
        endingDate: new Date(tournament.endingDate).toDateString(),
        owner: tournament.user.name,

        actions: (
          <Fragment>
            <Link
              to={`/tournament/team/join/${tournament._id}`}
              className="btn btn-primary py-1 px-2"
            >
              Join <i className="fa fa-plus"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Tournament-List'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex  mx-3">
              <h3 className="my-5">Join Tournaments</h3>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={settournaments()}
                className="px-3"
                data-aos="fade-up"
                data-aos-delay="50"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default JoinTournamentTeam;
