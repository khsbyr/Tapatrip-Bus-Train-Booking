import React from 'react';
import Navbar from '@components/Navbar/Navbar';

const Layout = ({ navbarData }) => {
  return (
    <div>
      <Navbar navbarData={navbarData} />
    </div>
  );
};

export default Layout;
