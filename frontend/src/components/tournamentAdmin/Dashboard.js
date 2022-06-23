import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAdminTournaments,
  getTournaments,
} from '../../actions/tournamentActions';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { Tournaments } = useSelector((state) => state.Tournaments);
  // const getAllData = () => {
  //   getData(`/api/v1/weekly`)
  //     .then((res) => {
  //       setWeeklyProfit((r) => (r = res.data.weeklyProf));
  //     })
  //     .catch((err) => console.log(err.response.data.msg));
  // };

  useEffect(() => {
    if (user && user.role !== 'admin') dispatch(getTournaments());
    else dispatch(getAdminTournaments());
  }, [user, dispatch]);

  return (
    <Fragment>
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 my-3">
          <Fragment>
            <MetaData title={'Admin Dashboard'} />
            <div className="row pr-4">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="topCard o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Amount
                      <br /> <b>$</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pr-4">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Tournaments
                      <br /> <b>{Tournaments && Tournaments.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/admin/products"
                  >
                    <span className="float-left">Matches</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Teams
                      <br /> <b>575</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/admin/orders"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Users
                      <br /> <b>6654</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer clearfix small z-1"
                    to="/admin/users"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size cardDetail">
                      Out of Stock
                      <br /> <b>567</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='container-fluid'>
                <div className='row p-5'>
                  <div className='col-sm-8 mx-auto'>
                    <Chart data={data} options={options} />
                  </div>
                 
                </div>
              </div> */}
            {/* //------------------------- */}
            {/* <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card  bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Complaints
                        <br /> <b>{0}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer  clearfix small z-1"
                      to="/admin/products"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card  bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Subscription
                        <br /> <b>{orders && orders.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer  clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card  bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer  clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card  o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size cardDetail">
                        Out of Stock
                        <br /> <b>{outOfStock}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
