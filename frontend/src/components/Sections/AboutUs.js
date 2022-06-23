import React from 'react';
import '../css/about.css';
import image from '../images/cricket,20-20-match.jpg';
const AboutUs = () => {
  return (
    <div>
      {/*  ======= About Section ======= */}
      <section id="about">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div
                className="about-img"
                data-aos="fade-right"
                data-aos-delay="50"
              >
                <img src={image} alt="" />
              </div>
            </div>

            <div className="col-lg-7 col-md-6 text-center">
              <div
                className="about-content"
                data-aos="fade-left"
                data-aos-delay="50"
              >
                <h2>About Us</h2>
                <h3 className="text-left">
                  CrickHub is a best company, authenticated and registered from
                  Pakistan Government.
                </h3>
                <p className="text-left">
                  We are CrickHub service providers everytime for you.
                </p>
                <p className="text-left">
                  Crick hub website has been made while keeping in mind all the
                  difficulties and drawbacks users face in the already existing
                  system. Our system fulfills and gruntled the user, also it
                  gives the experience of watching the live scoreboard of local
                  level cricket competition held in Pakistan. This website is
                  perpetuated by the admin where he/she can update the score
                  without any obstruct or delay. Our system gives an opportunity
                  to the registered player to accept or decline the request of
                  other matches held by the crick hub platform to promote
                  cricket. Crick hub includes all international-level cricket
                  news. Our team will do for you:
                </p>
                <ul className="text-left">
                  <li>
                    <i className="fa fa-check-circle-o"></i> Live your own
                    Tournaments through CrickHub.
                  </li>
                  <li>
                    <i className="fa fa-check-circle-o"></i> Having a chance to
                    show your talent to PCB or PSL like Franchises .
                  </li>
                  <li>
                    <i className="fa fa-check-circle-o"></i> Buy all types of
                    Cricket products.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  End About Section */}
    </div>
  );
};

export default AboutUs;
