//"email@email.com", "test123"
// test@gmail.com, test123

import React from "react";
import { auth } from "../firebase/init";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
 } from "firebase/auth";
import "./AuthModal.css";
import { useState } from "react";

function AuthModal({ selection, func}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        func('registered')
      })
      .catch((error) => {
        alert(error);
      });
  }

  function login(){
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      func('loggedin');
    })
    .catch((error) => {
      alert(error);
    });
  }

  return (
    <div className="authModal">
      {selection === "login" ? (
        <>
          <h1>Welcome back to MoviesBay!</h1>
          <div className="inputWrapper">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type in your email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Type in your password" />
            <button onClick={login}>Login</button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1>Register to MoviesBay!</h1>
          <div className="inputWrapper">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type in your email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Type in your password" />
            <button onClick={register}>Register</button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthModal;
