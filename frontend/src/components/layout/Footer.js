import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    <Fragment>
      <footer className="page-footer font-small mdb-color pt-4 ">
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left mt-3 pb-3">
            <div className="col-md-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold text-success">
                CrickHub
              </h6>
              <p>
                The core achievement of this plateform is that it has fulfilled
                the aim of providing a helping hand to the local level
                sportsman, by giving them a platform where they get a chance to
                collaborate with other national or international level academies
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-1 mx-auto mt-3"></div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold text-success">
                Useful links
              </h6>
              <p>
                <Link to="/">Home</Link>
              </p>
              <p>
                <Link to="/products">Products</Link>
              </p>
              <p>
                <Link to="/blogs">Blogs</Link>
              </p>
              <p>
                <Link to="/discusion">Discussion Forum</Link>
              </p>
              <p>
                <Link to="/tournaments/matches/live">Live Matches</Link>
              </p>
              <p>
                <Link to="/contactus">Contact Us</Link>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold text-success">
                Contact
              </h6>
              <p>
                <HomeIcon style={{ fontSize: 22 }} />{' '}
                <strong>Head Office:</strong> <br />
                The University of Lahore (UOL) 1-Km Defence Road،, near Bhuptian
                Chowk،, Lahore, Punjab
              </p>
              <p>
                <EmailIcon style={{ fontSize: 22 }} />
                <Link to="mailto:info@crickhub.com"> info@crickhub.com</Link>
              </p>
              <p>
                <PhoneIcon style={{ fontSize: 22 }} />{' '}
                <Link to="tel:+92 302-4885436">+92 302-4885436</Link>
              </p>
            </div>
          </div>

          <hr />

          <div className="row d-flex align-items-center">
            <div className="col-md-12 col-lg-12">
              <p className="text-center text-md-center">
                © {new Date().getFullYear()} Copyright:
                <Link to="https://www.crickhub.com">
                  <strong> crickhub.com</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
