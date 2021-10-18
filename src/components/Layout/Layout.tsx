import React from 'react';
import Navbar from '@components/Navbar/Navbar';

const Layout = ({ navbarData }) => {
  return (
    <div>
      <div>
        <Navbar navbarData={navbarData} />
      </div>
    </div>
  );
};

export default Layout;
