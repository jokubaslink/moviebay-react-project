import React, { useState } from "react";
import Nav from "../components/Nav";
import "./Profile.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/noimgavailable.jpg";

function Profile() {
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userload, setUserLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        setUserEmail(user.email);
        setUserLoad(false);
      }
    });
  }, []);

  async function getLikedMovies() {
    const likesCollectionRef = await query(
      collection(db, "likes"),
      where("uid", "==", user)
    );
    const { docs } = await getDocs(likesCollectionRef);
    if (docs.length > 0) {
      setMovies(docs.map((doc) => doc.data()));
      setLoading(false);
    }
  }

  useEffect(() => {
    getLikedMovies();
  }, [user.length > 0]);

  return (
    <div className="container">
      <div className="row">
        <Nav />
        <div className="profileWrapper">
          <div className="spacing"></div>
          {userload ? (
            <h2 className="accountName">
              User: <div className="accountName--skeleton"></div>
            </h2>
          ) : (
            <h2 className="accountName">User: {userEmail}</h2>
          )}
          <div className="favouriteWrapper">
            <div className="spacing"></div>
            <h3>Favourite Movies:</h3>

            {loading ? (
              <div className="favouriteMovies">
                {new Array(5).fill(0).map((_, index) => (
                  <div className="favouriteMovie--skeleton" key={index}></div>
                ))}
              </div>
            ) : (
              <div className="favouriteMovies">
                {movies.length > 0 ? (
                  movies.map((movie, index) => (
                    <div
                      className="favouriteMovie"
                      onClick={() =>
                        navigate(`/${movie.searchTerm}/${movie.movieId}`)
                      }
                      key={index}
                    >
                      <img
                        className="favouriteMovie--img"
                        src={
                          movie.moviePoster !== "N/A"
                            ? movie.moviePoster
                            : noImage
                        }
                        alt=""
                      />
                      <h3 className="favouriteMovie--title">
                        {movie.movieTitle}
                      </h3>
                    </div>
                  ))
                ) : (
                  <h2>There's no favourite movies!</h2>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
