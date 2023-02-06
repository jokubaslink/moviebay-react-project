import React from "react";
import { auth } from "../firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AuthModal.css";

function AuthModal({ selection }) {
  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function work(){
    console.log(selection)
  }
  work()

  return (
    <div className="authModal">
      {selection === "login" ? (
        <>
          <h1>Welcome back to MoviesBay!</h1>
          <div className="inputWrapper">
            <input type="email" placeholder="Type in your email" />
            <input type="password" placeholder="Type in your password" />
            <button onClick={register}>Login</button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1>Register to MoviesBay!</h1>
          <div className="inputWrapper">
            <input type="email" placeholder="Type in your email" />
            <input type="password" placeholder="Type in your password" />
            <button onClick={register}>Register</button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthModal;
