import React from "react";
import "./Nav.css";

function Nav() {
  const loggedin = false;

  return (
    <nav>
      <div className="page__logo--wrapper">
        <h2 className="page__logo--h2">MovieBay</h2>
        <p className="page__logo--h2">World's Best Movie Search Platform</p>
      </div>
      <ul className="page__list">
        {!loggedin ? (
          <>
            <li className="page__listItem">Login</li>
            <li className="page__listItem">Sign Up</li>
            <li className="page__listItem">Contact</li>
          </>
        ) : (
          <>  <li className="page__listItem">Profile</li>
          <li className="page__listItem">Log Out</li>
          <li className="page__listItem">Contact</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
