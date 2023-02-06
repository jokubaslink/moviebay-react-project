import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import "./Nav.css";

function Nav() {
  const loggedin = false;
  const [menu, setMenu] = useState(false);

  return (
    <nav>
      <div className="page__logo--wrapper">
        <h2 className="page__logo--h2">MovieBay</h2>
        <p className="page__logo--p">World's Best Movie Search Platform</p>
      </div>

      <button className="menuButton" onClick={() => setMenu((prev) => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {menu && (
        <>
          <button
            className="menuButton--close"
            onClick={() => setMenu((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Dropdown />
        </>
      )}
      <ul className="page__list">
        {!loggedin ? (
          <>
            <li className="page__listItem">Login</li>
            <li className="page__listItem">Sign Up</li>
            <li className="page__listItem">Contact</li>
          </>
        ) : (
          <>
            {" "}
            <li className="page__listItem">Profile</li>
            <li className="page__listItem">Log Out</li>
            <li className="page__listItem">Contact</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
