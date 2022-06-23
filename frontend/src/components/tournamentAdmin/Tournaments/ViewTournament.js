import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearErrors,
  getTournamentDetails,
} from '../../../actions/tournamentActions';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

const ViewTournament = ({ match, history }) => {
  const [name, setName] = useState('');
  const [noTeams, setnoTeams] = useState(0);
  const [date, setDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState('/images/default_image.png');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, tournament } = useSelector((state) => state.TournamentDetail);
  const tournamentId = match.params.id;
  console.log(tournament);
  useEffect(() => {
    if (tournament && tournament._id !== tournamentId) {
      dispatch(getTournamentDetails(tournamentId));
    } else {
      setName(tournament.name);
      setnoTeams(tournament.noTeams);
      setDate(tournament.startingDate);
      setendDate(tournament.endingDate);
      setimagePreview(tournament.image.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, tournamentId, tournament]);

  return (
    <Fragment>
      <MetaData title={`tournament # ${tournament && tournament._id}`} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-7 order-details my-5">
                <h4 className="mb-2 ">Tournament Info</h4>
                <figure className="avatar mb-4 ">
                  <img
                    src={imagePreview}
                    className="mt-1 mr-2 rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
                <p>
                  <b>Name:</b> {name}
                </p>
                <p>
                  <b>Teams Allowed:</b> {noTeams}
                </p>
                <p>
                  <b>Registered Teams: </b>
                </p>
                <p className="mb-4">
                  <b>Starting Date: </b>
                  {new Date(date).toDateString()}
                </p>
                <p>
                  <b>Ending Date:</b> {new Date(endDate).toDateString()}
                </p>
              </div>

              <div className="col-12 col-lg-3 mt-5">
                <Link
                  to={`/view/team/${tournament._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  Manage Teams
                  <i className="fa fa-angle-double-right ml-3"></i>
                </Link>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewTournament;
