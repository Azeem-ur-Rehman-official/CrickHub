import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`CrickHub - ${title}`}</title>
    </Helmet>
  );
};

export default MetaData;
