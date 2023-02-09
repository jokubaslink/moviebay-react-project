import React, { useState } from "react";
import Nav from "../components/Nav";
import "./Profile.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        setUserEmail(user.email);
        console.log(user);
      }
    });
  }, []);

  useEffect(() => {
    async function getLikes() {
      const likeCollectionRef = await query(
        collection(db, "likes"),
        where("user", "==", user)
      );
      const { docs } = await getDocs(likeCollectionRef);
      const data = docs.map((doc) => doc.data());
      if (data.length > 0) {
        setMovies(data);
        console.log(movies);
      }
    }
    getLikes();
  }, [user.length > 0]);

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
              {movies.length > 0 ? (movies.map((movie) => (
                <div
                  className="favouriteMovie" onClick={() => navigate(`/${movie.searchTerm}/${movie.movieId}`)}
                >
                  <img
                    className="favouriteMovie--img"
                    src={movie.moviePoster}
                    alt=""
                  />
                  <h3 className="favouriteMovie--title">{movie.movieTitle}</h3>
                </div>
              ))) : (
                <h2>There's no favourite movies!</h2>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
