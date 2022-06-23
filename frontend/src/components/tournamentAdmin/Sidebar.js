import { Link } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/tournament/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#blogSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-trophy"></i> Tournaments
            </a>
            <ul className="collapse list-unstyled" id="blogSubmenu">
              <li>
                <Link to="/my/alltournaments">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>

              <li>
                <Link to="/tournament/create">
                  <i className="fa fa-plus"></i> Create
                </Link>
                <li>
                  <Link to="/player/tournament/join">
                    <i className="fa fa-plus"></i> Join
                  </Link>
                </li>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/tournament/players/profile">
              <i className="fa fa-address-card-o"></i> Players Profile
            </Link>
          </li>
          <li>
            <Link to="/tournament/profile">
              <i className="fa fa-address-card-o"></i> Your Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
