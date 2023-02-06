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
      </div>
  )
}

export default Dropdown

          {/* <>
            {" "}
            <li className="dropdown__listItem">Profile</li>
            <li className="dropdown__listItem">Log Out</li>
            <li className="dropdown__listItem">Contact</li>
          </> */}

{/* <>
{modal === true ? (
  <>
  <button className="AuthModal--close" onClick={() => {
    setModal((prev) => !prev)
    setLoggedIn((prev) => !prev)
  }}>X</button>
  <AuthModal />
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
</> */}
