// https://frontendsimplified.com/firebase/auth 7:34

import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

function Nav() {
  const [loggedin, setLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState('');
  const navigate = useNavigate();

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
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <Dropdown logState={loggedin} modalState={modal} />
        </>
      )}
      <ul className="page__list">
        {!loggedin ? (
          <>
            <li className="page__listItem" onClick={() => {setModal(true)
            setLoggedIn(true)
            setSelect('login')
            }}>
              Login
            </li>
            <li className="page__listItem" onClick={() => {setModal(true)
            setLoggedIn(true)
            setSelect('signup')
            }}>
              Sign Up
            </li>
            <li className="page__listItem">Contact</li>
          </>
        ) : 
        <>
          {modal === true ? (
            <>
            <button className="AuthModal--close" onClick={() => {
              setModal((prev) => !prev)
              setLoggedIn((prev) => !prev)
            }}>X</button>
            <AuthModal selection={select}/>
            </>
            ) : (
              <>
                <li
                  className="page__listItem"
                  onClick={() => navigate(`/profile/profileID`)}
                >
                  Profile
                </li>
                <li className="page__listItem">Log Out</li>
                <li className="page__listItem">Contact</li>{" "}
              </>
            )}
          </>
        }
      </ul>
    </nav>
  );
}

export default Nav;
export const loggedin = false;
