import React from 'react';
import '../../styles/navBar.scss';

function NavBar() {
  return (
    <div>
      <div className="navBar">
        <p className="logo">Barefoot nomard</p>
        <div className="nav-btn">
          <p className="signin">Sign in</p>
          <p className="signout"> Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
