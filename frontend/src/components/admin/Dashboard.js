import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allOrders } from '../../actions/orderActions';
import { getAdminProducts } from '../../actions/productActions';
import { allUsers } from '../../actions/userActions';
import { getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [weeklyProfit, setWeeklyProfit] = useState([]);

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  const getAllData = () => {
    getData(`/api/v1/weekly`)
      .then((res) => {
        setWeeklyProfit((r) => (r = res.data.weeklyProf));
      })
      .catch((err) => console.log(err.response.data.msg));
  };

  // const updateData = (id, profit) => {
  //   const formData = new FormData();
  //   formData.set('profit', profit);
  //   patchData(`/api/v1/admin/weekly/update`).then((res) => {
  //     console.log("Updated with response");
  //     console.log(res);
  //     // setWeeklyProfit(weeklyProfit.map((weekly) => {
  //     //   if(weekly._id===res.data.weeklyProfitData._id) weekly.profit=res.data.weeklyProfitData.profit;
  //     //   return weekly;
  //     // }));
  //   })
  //   .catch((err) => console.log(err));
  // }

  useEffect(() => {
    getAllData();
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  // const data = {
  //   labels: ['January', 'February', 'March',
  //            'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Rainfall',
  //       fill: false,
  //       lineTension: 0.5,
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //       borderColor: 'rgba(0,0,255,1)',
  //       borderWidth: 2,
  //       data: [65, 59, 80, 81, 56]
  //     }
  //   ]
  // }

  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // );

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Weekly Prediction Report',
  //       fontSize: 20,
  //     },
  //   },
  // };

  // const dayAsString = (dayIndex) => {
  //   return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
  // }
  // const getLabelforNextWeek = (startDate, daysToAdd) => {
  //   var labels = [];

  //   for (var i = 1; i <= daysToAdd; i++) {
  //       var currentDate = new Date();
  //       currentDate.setDate(startDate.getDate() + i);
  //       labels[i-1] = dayAsString(currentDate.getDay());
  //   }

  //   return labels;
  // }

  // const labels = getLabelforNextWeek(new Date(), 7);

  // var profitData = [];

  // weeklyProfit.forEach((weekly) => {
  //   profitData[labels.indexOf(weekly.day)] = weekly.profit;
  // });

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Profit',
  //       data: profitData,
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     }
  //   ],
  // };

  // const predict = () => {
  //   updateData();
  // }

  return (
    <Fragment>
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={'Admin Dashboard'} />
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="topCard o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
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
                        Products
                        <br /> <b>{products && products.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer clearfix small z-1"
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
                  <div className="card o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Orders
                        <br /> <b>{orders && orders.length}</b>
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
                        <br /> <b>{users && users.length}</b>
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
                        <br /> <b>{outOfStock}</b>
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
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
