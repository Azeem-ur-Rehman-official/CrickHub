import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  adminDeleteTournaments,
  clearErrors,
  deleteTournaments,
  getAdminTournaments,
  getTournaments,
} from '../../../actions/tournamentActions';
import { DELETE_TOURNAMENT_RESET } from '../../../constants/tournamentConstants';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const AllTournaments = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading, error, Tournaments } = useSelector(
    (state) => state.Tournaments
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.Tournament
  );

  useEffect(() => {
    if (user && user.role !== 'admin') dispatch(getTournaments());
    else dispatch(getAdminTournaments());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Tournament deleted successfully');
      history.push('/my/alltournaments');
      dispatch({ type: DELETE_TOURNAMENT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history, user]);

  const deletetournamentHandler = (id) => {
    if (user && user.role === 'admin') dispatch(adminDeleteTournaments(id));
    else dispatch(deleteTournaments(id));
  };

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
              to={`/view/tournament/${tournament._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/update/tournament/${tournament._id}`}
              className="btn btn-primary py-1 px-2 ml-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deletetournamentHandler(tournament._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
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
              <h3 className="my-5">All Tournaments</h3>
              <Link
                to="/tournament/create"
                className="btn order-button ml-auto my-auto px-4"
              >
                <i className="fa fa-plus"></i> Create
              </Link>
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

export default AllTournaments;
