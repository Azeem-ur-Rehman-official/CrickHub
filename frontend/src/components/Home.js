import 'rc-slider/assets/index.css';
import React, { Fragment } from 'react';
import MySlider from '../components/layout/MySlider';
import Faq from '../components/pages/FAQ';
import AboutUs from './Sections/AboutUs';
import WhychooseUS from './Sections/WhychooseUS';
const Home = () => {
  return (
    <div>
      <Fragment>
        <MySlider />

        <div className="container-fluid my-3 bg-white p-5">
          <WhychooseUS />
        </div>

        <div className="container-fluid my-3  p-5">
          <AboutUs />
        </div>
        <div className="container-fluid my-3  p-5">
          <Faq />
        </div>
      </Fragment>
    </div>
  );
};

export default Home;
