import StyledBadge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import logo from '../../assets/img/Logo.gif';
import { patchData, postData } from '../../routes/FetchData';
import '../css/header.css';
import NotificationBox from './NotificationBox';

const TopHeader = () => {
  const [dialog, setDialog] = useState(false);
  const [valid, setValid] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState('');
  const [userdata, setUserdata] = useState(null);
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    postData('/api/v1/user/notification', heading)
      .then((res) => {
        setUserdata(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [valid, user]);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
    window.location.reload(true);
  };

  const setNotification = (val1, val2, val3) => {
    setHeading(val1);
    setContent(val2);
    if (val3 !== id) setId(val3);
    setDialog(true);
  };

  // console.log(userdata);
  const ShowNotification = () => {
    // console.log(id);

    patchData(`/api/v1/notification/status/${id}`)
      .then((res) => setValid(!valid))
      .catch((err) => console.log(err));
    setDialog(false);
  };

  return (
    <div className="top-header-area" id="top-header-area">
      <div className="container">
        <div className="row">
          <div className="col-3 col-sm-6 d-flex">
            <div className="top-header-content my-auto d-none d-md-block">
              <span>
                <i className="fa fa-check"></i>
                Enjoy the game & chase you dreams
              </span>
            </div>
            <div className="middle-header-logo d-block d-md-none">
              <Link to="/">
                <img
                  src={logo}
                  alt="CrickHub"
                  className="img-fluid"
                  style={{
                    maxHeight: '45px',
                    backgroundColor: 'white',
                    padding: '4px',
                    borderRadius: '5px',
                  }}
                />
              </Link>
            </div>
          </div>

          <div className="col-9 col-sm-6 text-right">
            <ul className="top-header-optional">
              <li>
                {user ? (
                  <div className="d-flex">
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="btn dropdown-toggle text-white media"
                        type="button"
                        id="dropDownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ paddingRight: '2rem' }}
                      >
                        <img
                          className="mr-3"
                          style={{
                            maxHeight: '30px',
                            borderRadius: '50%',
                            border: '1px solid #F8921C',
                          }}
                          src={user.avatar && user.avatar.url}
                          alt={user && user.name}
                        />
                        <div className="media-body my-auto">
                          <h5 className="mt-0 text-light">
                            {user && user.name}
                          </h5>
                        </div>
                      </Link>

                      <div
                        className="dropdown-menu profile-menu text-dark"
                        aria-labelledby="dropDownMenuButton"
                      >
                        {user && user.role === 'admin' && (
                          <Link className="dropdown-item" to="/dashboard">
                            Dashboard
                          </Link>
                        )}
                        <Link
                          className="dropdown-item"
                          to="/tournament/dashboard"
                        >
                          Tournaments
                        </Link>
                        <Link className="dropdown-item" to="/orders/me">
                          Orders
                        </Link>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                        <Link
                          className="dropdown-item text-danger"
                          to="/"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                    {userdata &&
                      userdata.notifications &&
                      userdata.notifications.length > 0 &&
                      user.role != 'admin' && (
                        <div className="ml-2 dropdown">
                          <Link
                            style={{ textDecoration: 'none' }}
                            className="btn dropdown-toggle text-white media"
                            type="button"
                            id="dropDownMenuButton2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <Link>
                              <IconButton
                                aria-label="cart"
                                className="cartItem"
                                style={{ color: '#ffff', padding: '0px 20px' }}
                              >
                                <StyledBadge
                                  badgeContent={userdata.notifications.reduce(
                                    (sum, val) => {
                                      return (
                                        sum + (val.status === 'unread' ? 1 : 0)
                                      );
                                    },
                                    0
                                  )}
                                  color="secondary"
                                >
                                  <NotificationsIcon />
                                </StyledBadge>
                              </IconButton>
                            </Link>
                          </Link>

                          <div
                            className="dropdown-menu notification-bar text-dark"
                            aria-labelledby="dropDownMenuButton2"
                          >
                            {userdata.notifications.map((val) => (
                              <>
                                {val.status === 'read' ? (
                                  <Link
                                    className="dropdown-item read"
                                    onClick={() =>
                                      setNotification(
                                        val.heading,
                                        val.content,
                                        id
                                      )
                                    }
                                  >
                                    {val.heading}
                                  </Link>
                                ) : (
                                  <Link
                                    className="dropdown-item unread"
                                    onClick={() =>
                                      setNotification(
                                        val.heading,
                                        val.content,
                                        val._id
                                      )
                                    }
                                  >
                                    {val.heading} <span> ◉ </span>
                                  </Link>
                                )}
                              </>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  !loading && (
                    <div style={{ minWidth: '125px' }}>
                      <Link to="/login" className="text-light">
                        <i className="fa fa-lock"></i>
                        Login
                      </Link>
                      {'  |  '}
                      <Link to="/register" className="text-light">
                        Register
                      </Link>
                    </div>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {dialog === true ? (
        <NotificationBox
          box={ShowNotification}
          heading={heading}
          content={content}
        />
      ) : null}
    </div>
  );
};

export default withRouter(TopHeader);
