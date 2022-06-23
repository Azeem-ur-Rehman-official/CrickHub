import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  adminDeletePlayers,
  clearErrors,
  getPlayers,
} from '../../../actions/playerActions';
import { DELETE_PLAYER_RESET } from '../../../constants/playersConstants';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const PlayersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading, error, Players } = useSelector((state) => state.Players);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.Player
  );

  useEffect(() => {
    dispatch(getPlayers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Player deleted successfully');
      history.push('/tournament/players/profile');
      dispatch({ type: DELETE_PLAYER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deletePlayerHandler = (id) => {
    dispatch(adminDeletePlayers(id));
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
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'DOB',
          field: 'dob',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    Players.forEach((player) => {
      data.rows.push({
        image: (
          <>
            <img
              src={player.user_id.avatar.url}
              alt={player.name}
              className="img-thumbnail"
              width="60"
              height="60"
            ></img>
          </>
        ),
        email: player.user_id.email,
        name: player.name,
        dob: new Date(player.DOB).toDateString(),

        actions: (
          <Fragment>
            <Link
              to={`/admin/tournaments/${player._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Players-List'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex  mx-3">
              <h3 className="my-5">Players</h3>
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

export default PlayersList;
