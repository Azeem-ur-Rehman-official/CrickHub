import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import MiddleHeader from './MiddleHeader';
import Navbar from './Navbar';
import TopHeader from './TopHeader';

const Header = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <TopHeader />
      {
        !loading && (!isAuthenticated || user.role !== 'admin'/*  || window.location.pathname === "/" || window.location.pathname !== "/dashboard" */) &&
        <>
          <MiddleHeader />
          <Navbar />
        </>
      }
    </Fragment>
  );
};

export default Header;
