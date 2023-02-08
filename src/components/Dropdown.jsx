import React from 'react'
import './Dropdown.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from './AuthModal';

function Dropdown({logState, modalState}) {
  const navigate = useNavigate();
  const [loggedin, setLoggedIn] = useState(logState);
  const [modal, setModal] = useState(modalState);
  const [select, setSelect] = useState('');

  return (
    <div className="dropdownMenu">
      <ul className="dropdown__list">
        {!loggedin ? (
          <>
            <li className="dropdown__listItem" onClick={() => {setModal(true)
            setLoggedIn(true)
            setSelect('login')
            }}>Login</li>
            <li className="dropdown__listItem" onClick={() => {setModal(true)
            setLoggedIn(true)
            setSelect('signup')
            }}>Sign Up</li>
            <li className="dropdown__listItem">Contact</li>
          </>
        ) : 
        <>
          {modal === true ? (
            <div className="modalWrapper">
            <button className="AuthModal--close" onClick={() => {
              setModal((prev) => !prev)
              setLoggedIn((prev) => !prev)
            }}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </button>
            <AuthModal selection={select}/>
            </div>
            ) : (
              <>
                <li
                  className="page__listItem"
                  onClick={() => navigate(`/profile`)}
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
      </div>
  )
}
export default Dropdown
