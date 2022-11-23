import * as React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
