import { MDBDataTable } from 'mdbreact';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { deleteData, getData, patchData } from '../../../routes/FetchData';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
const TournamentTeamSquad = ({ match }) => {
  const alert = useAlert();

  const [SquadData, setSquadData] = useState([]);
  const { loading, error, users } = useSelector((state) => state.allUsers);

  const teamId = match.params.id;
  const getAllData = () => {
    getData(`/api/v1/get/all/team/squad/${teamId}`)
      .then((res) => {
        // console.log(`data is ${res}`);
        // console.log(res.data.SquadDatas);
        setSquadData((r) => (r = res.data.join));
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const deleteUserHandler = (id) => {
    deleteData(`/api/v1/admin/team/squad/${id}`)
      .then((res) => {
        getAllData();
        alert.show('SquadData deleted successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  };
  const requestHandler = (id) => {
    patchData(`/api/v1/admin/team/squad/${id}`)
      .then((res) => {
        getAllData();
        alert.show('Request Accepted Successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Player Role',
          field: 'playerRole',
          sort: 'asc',
        },
        {
          label: 'Team Role',
          field: 'teamRole',
          sort: 'asc',
        },
        {
          label: 'Team Request',
          field: 'request',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    SquadData.forEach((user) => {
      data.rows.push({
        image: (
          <>
            <img
              src={user.user.imageLink}
              alt={user.user.name}
              className="img-thumbnail"
              width="60"
              height="60"
            ></img>
          </>
        ),
        name: user.user.name,
        playerRole: user.user.playerRole,
        teamRole: user.teamRole,
        request: user.teamStatus,

        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              Detail
              <i className="fa fa-eye ml-1"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'SquadDatas'} />
      <div className="row m-0">
        <div className="col-12 col-md-12">
          <Fragment>
            <div className="d-flex mx-3">
              <h3 className="my-5">Team Squad</h3>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default TournamentTeamSquad;
