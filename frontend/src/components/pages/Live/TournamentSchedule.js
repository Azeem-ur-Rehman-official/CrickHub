import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminDeleteSchdules,
  clearErrors,
  getSingleTournamentSchdules,
} from '../../../actions/scheduleAction';
import { DELETE_SCHEDULE_RESET } from '../../../constants/scheduleConstant';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
const TournamentSchedule = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, schedules } = useSelector((state) => state.Schedules);
  console.log('schedule');
  console.log(schedules);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.Schedule
  );
  const tournamentId = match.params.id;
  useEffect(() => {
    if (schedules) dispatch(getSingleTournamentSchdules(tournamentId));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push(`/view/schedule/${tournamentId}`);
      dispatch({ type: DELETE_SCHEDULE_RESET });
    }
  }, [dispatch, alert, error, history]);

  const deletescheduleHandler = (id) => {
    dispatch(adminDeleteSchdules(id));
  };

  const setschedules = () => {
    const data = {
      columns: [
        {
          label: 'TeamA',
          field: 'teamA',
        },
        {
          label: 'VS',
          field: 'vs',
        },
        {
          label: 'TeamB',
          field: 'teamB',
        },

        {
          label: 'Date & Time',
          field: 'date',
          sort: 'asc',
        },
        {
          label: 'Location',
          field: 'location',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    schedules.forEach((schedule) => {
      data.rows.push({
        teamA: schedule.team_A_id.name,
        vs: <p>VS</p>,
        teamB: schedule.team_B_id.name,
        date: new Date(schedule.MatchDateTime).toLocaleString(),
        location: (
          <>
            <a
              href={schedule.locationLink}
              target="_blank"
              className="text-primary"
            >
              {schedule.locationName}
              <i className="fa fa-location-arrow mx-1 text-primary"></i>
            </a>
          </>
        ),

        actions: (
          <Fragment>
            {/* <Link
              to={`/update/schedule/${schedule._id}`}
              className="btn btn-primary py-1 px-2 ml-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deletescheduleHandler(schedule._id)}
            >
              <i className="fa fa-trash"></i>
            </button> */}
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'schedule-List'} />
      <div className="row mx-auto container">
        <div className="col-12 col-md-12">
          <Fragment>
            <div className="d-flex  mx-3">
              <h3 className="my-5">Team Schedule</h3>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setschedules()}
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

export default TournamentSchedule;
