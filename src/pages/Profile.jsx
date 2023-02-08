import React, { useState } from "react";
import Nav from "../components/Nav";
import "./Profile.css";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db, auth} from '../firebase/init'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import axios from "axios";

function Profile() {
  const [deita, setDeita] = useState([]);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user.uid)
        setUserEmail(user.email)
        console.log(user)
      }
    })
  }, [])

 useEffect(() => {
  async function getLikes(){
    const likeCollectionRef = await query(
      collection(db, "likes"),
      where("user", "==", user)
    )
    const {docs} = await getDocs(likeCollectionRef);
    console.log(docs.map(doc => doc.data().term))
  }
  getLikes()
  console.log(deita)
 }, [user])

  return (
    <div className="container">
      <div className="row">
        <Nav />
        <div className="profileWrapper">
          <div className="spacing"></div>
          <h2 className="accountName">User: {userEmail}</h2>
          <div className="favouriteWrapper">
            <div className="spacing"></div>
            <h3>Favourite Movies:</h3>
            <div className="favouriteMovies">
 {/*              {
                movies.map((movie, index) => (
                  <div className="movieWrapper" index={index}>
                    Movie
                  </div>
                ))
              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
