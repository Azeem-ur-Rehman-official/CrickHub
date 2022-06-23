import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  adminDeleteTeams,
  clearErrors,
  getSingleTournamentTeams,
} from '../../../actions/TeamAction';
import { getTournamentDetails } from '../../../actions/tournamentActions';
import { DELETE_TEAM_RESET } from '../../../constants/teamsConstant';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
const TournamentTeams = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [noTeams, setNoTeams] = useState(0);

  const { loading, error, Teams } = useSelector((state) => state.Teams);
  const { error: errorDetail, tournament } = useSelector(
    (state) => state.TournamentDetail
  );

  const { error: deleteError, isDeleted } = useSelector((state) => state.Team);
  const tournamentId = match.params.id;
  useEffect(() => {
    if (tournament && tournament._id !== tournamentId) {
      dispatch(getTournamentDetails(tournamentId));
    } else {
      setNoTeams(tournament.noTeams);
    }
    dispatch(getSingleTournamentTeams(tournamentId));
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (errorDetail) {
      //alert.error(errorDetail);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push(`/view/team/${tournamentId}`);
      dispatch({ type: DELETE_TEAM_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history, noTeams]);

  const deleteteamHandler = (id) => {
    dispatch(adminDeleteTeams(id));
  };

  const setTeams = () => {
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

    Teams.forEach((team) => {
      data.rows.push({
        image: (
          <>
            <img
              src={team.image.url}
              alt={team.name}
              className="img-thumbnail"
              width="60"
              height="60"
            ></img>
          </>
        ),

        name: team.name,

        owner: team.ownerName,

        actions: (
          <Fragment>
            <Link
              to={`/tournament/live/team/squad/${team._id}`}
              className="btn btn-primary py-1 px-2"
            >
              Squad
              <i className="fa fa-users ml-2"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Team-List'} />
      <div className="row m-0">
        <div className="col-12 col-md-12">
          <Fragment>
            <div className="d-flex  mx-3">
              <h3 className="my-5">All Teams</h3>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setTeams()}
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

export default TournamentTeams;
