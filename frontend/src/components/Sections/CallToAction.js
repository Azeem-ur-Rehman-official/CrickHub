import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div>
      {/*  ======= Call To Action Section ======= */}
      <section id="call-to-action" className="call-to-action">
        <div className="container" data-aos="zoom-out">
          <div className="row">
            <div className="col-lg-9 text-center text-lg-left">
              <h3 className="cta-title">Book Now</h3>
              <p className="cta-text">
                {' '}
                {
                  "Don't wait for anything. Book now for services like wash, clean or repair aircons to feel confortable."
                }
              </p>
            </div>
            <div className="col-lg-3 cta-btn-container text-center">
              <Link
                className="cta-btn align-middle"
                to="/booknow"
                target="_blank"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/*   End Call To Action Section */}
    </div>
  );
};

export default CallToAction;
