import React, { useEffect, useState } from 'react';
import '../css/chooseus.css';
import image from '../images/cricket-calculation.jpeg';
const WhychooseUS = () => {
  const [client, setClient] = useState(0);
  const [projects, setprojects] = useState(0);
  const [experience, setExperience] = useState(0);
  const [team, setTeam] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (client !== 1700) setClient(client + 5);
      if (projects !== 1500) setprojects(projects + 5);
      if (team !== 20) setTeam(team + 1);
      if (experience !== 17) setExperience(experience + 1);
    }, 30);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      {/*  ======= Why Choose Us Section ======= */}
      <section id="why-us" className="why-us">
        <div className="container-fluid" data-aos="fade-up">
          <header className="section-header text-center my-5 mb-5">
            <h3>Why choose us?</h3>
            <p>
              CrickHub has advanced skills of CrickHub Services and everything
              is planned before working time.
            </p>
          </header>

          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="50">
              <div className="why-us-img">
                <img src={image} alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-lg-6 text-left">
              <div className="why-us-content">
                <div
                  className="features clearfix"
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <i className="fa fa-car" style={{ color: 'orange' }}></i>
                  <h4>Provide Quick Service</h4>
                  <p>
                    Our CrickHub services are much faster because CrickHub ready
                    to serve at all time in working hours.
                  </p>
                </div>

                <div
                  className="features clearfix"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="fa fa-usd" style={{ color: 'gold' }}></i>
                  <h4>With Handsome Amount</h4>
                  <p>
                    Every person think about low and confortable price. So,
                    CrickHub provides you all aircon services with low and
                    handsome price.
                  </p>
                </div>

                <div
                  className="features clearfix"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  <i className="fa fa-book" style={{ color: 'pink' }}></i>
                  <h4>Everything is Planned</h4>
                  <p>
                    When you meet us, you must found us that we have planned all
                    services due to wide experience in CrickHub Service.
                  </p>
                </div>

                <div
                  className="features clearfix"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="fa fa-diamond" style={{ color: '#589af1' }}></i>
                  <h4>Wide Experience in CrickHub Service</h4>
                  <p>
                    Our team has wide experience and can do solution for
                    everything about CrickHub. You can also take an advise from
                    our team for any crickhub service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row counters" data-aos="fade-up" data-aos-delay="50">
            <div className="col-lg-3 col-6 text-center">
              <span data-toggle="counter-up">{client}</span>
              <p>Clients</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-toggle="counter-up">{projects}</span>
              <p>Completed Projects</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-toggle="counter-up">{team}</span>
              <p>Team Members</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-toggle="counter-up">{experience}</span>
              <p>Experience</p>
            </div>
          </div>
        </div>
      </section>
      {/*  End Why Us Section */}
    </div>
  );
};

export default WhychooseUS;
