import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleHotline = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 90) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, handleScroll, location]);

  return (
    <div
      className={`navbar-area mb-2 ${
        visible ? 'is-sticky sticky-active container-fluid' : 'container'
      }`}
    >
      <div className={`main-navbar container ${showMenu && 'show'}`}>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav responsive-menu">
                <li
                  className={
                    location.pathname === '/' ? 'nav-item active' : 'nav-item'
                  }
                >
                  <Link to="/" className="nav-link">
                    HOME
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/products'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/products" className="nav-link">
                    PRODUCTS
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/discusion'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/discusion" className="nav-link">
                    DISCUSSION FORUM
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/tournaments/matches/live'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link
                    to="/tournaments/matches/live"
                    className="nav-link liveDot"
                  >
                    LIVE
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/blogs'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/blogs" className="nav-link">
                    BLOGS
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/contactus'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/contactus" className="nav-link">
                    CONTACT US
                  </Link>
                </li>
              </ul>

              <div className="others-option d-flex align-items-center">
                <div className="option-item respo-nav">
                  <span>
                    Hotline:
                    <a href="tel:923024885436">(+92) 302 – 4885436</a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="others-option-for-responsive">
        <div className="container">
          <div className="responsive-logo">
            <span>Econix</span>
          </div>
          <div className="dot-menu" onClick={() => toggleHotline()}>
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="hamburger-menu" onClick={() => toggleMenu()}>
            {showMenu ? (
              <span className="x-icon">x</span>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </div>

          <div className={active ? 'active container' : 'container'}>
            <div className="option-inner">
              <ul className="navbar-nav responsive-menu">
                <li
                  className={
                    location.pathname === '/' ? 'nav-item active' : 'nav-item'
                  }
                >
                  <Link to="/" className="nav-link">
                    HOME
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/services'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/services" className="nav-link">
                    SERVICES
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/discusion'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/discusion" className="nav-link">
                    DISCUSSION FORUM
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/tournaments/matches/live'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link
                    to="/tournaments/matches/live"
                    className="nav-link liveDot"
                  >
                    LIVE
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/blogs'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/blogs" className="nav-link">
                    BLOGS
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === '/contactus'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/contactus" className="nav-link">
                    CONTACT US
                  </Link>
                </li>
              </ul>
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+1) 654 567 – 6789</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
