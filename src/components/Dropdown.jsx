import React from 'react'
import './Dropdown.css'

function Dropdown() {
    const loggedin = false;

  return (
    <div className="dropdownMenu">
      <ul className="dropdown__list">
        {!loggedin ? (
          <>
            <li className="dropdown__listItem">Login</li>
            <li className="dropdown__listItem">Sign Up</li>
            <li className="dropdown__listItem">Contact</li>
          </>
        ) : (
          <>
            {" "}
            <li className="dropdown__listItem">Profile</li>
            <li className="dropdown__listItem">Log Out</li>
            <li className="dropdown__listItem">Contact</li>
          </>
        )}
        </ul>
      </div>
  )
}

export default Dropdown