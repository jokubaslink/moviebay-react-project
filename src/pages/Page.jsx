import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import noImage from "../assets/noimgavailable.jpg";
import "./Page.css";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init";

function Page() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [video, getVideo] = useState([]);
  const [videos, getVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState("");
  const { searchTerm } = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      }
    });
  });

  useEffect(() => {
    async function getLikedMovies() {
      const likesCollectionRef = await query(
        collection(db, "likes"),
        where("uid", "==", user)
      );
      const { docs } = await getDocs(likesCollectionRef);
      if (docs.length > 0) {
        const data = docs.map((doc) => doc.data().movieId);
        data.map((item) => {
          if (item === movieId) {
            setLiked(true);
          }
        });
      }
    }
    getLikedMovies();
  }, [user]);

  function likeMovie() {
    setDoc(doc(db, "likes", movieId + user), {
      uid: user,
      movieId: movieId,
      searchTerm: searchTerm,
      movieTitle: video.Title,
      moviePoster: video.Poster,
    });
    setLiked(true);
  }

  function unLikeMovie() {
    const likeRef = doc(db, "likes", movieId + user);
    deleteDoc(likeRef);
    setLiked(false);
  }

  async function fetchMovie() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=eeef1900&i=${movieId}`
    );
    getVideo(data);
    setLoading(false);
  }

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=eeef1900&s=${searchTerm}`
    );
    getVideos(data.Search);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovie();
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Nav />
        <div className="movieWrapper">
          <button
            className="resultsBox--leave"
            onClick={() => navigate(`/${searchTerm}`)}
          >
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          {loading ? (
            new Array(1).fill(0).map((_, index) => (
              <div className="skeletonWrapper" key={index}>
                <figure className="skeletonWrapper__image">
                  <div className="skeletonWrapper__image--img"></div>
                </figure>
                <div className="skeletonWrapper__info">
                  <h1 className="skeletonWrapper__info--title"></h1>
                  <p className="skeletonWrapper__info--text"></p>
                  <p className="skeletonWrapper__info--text"></p>
                  <p className="skeletonWrapper__info--text"></p>
                  <p className="skeletonWrapper__info--text"></p>
                  <p className="skeletonWrapper__info--text"></p>
                </div>
              </div>
            ))
          ) : (
            <>
              <figure className="movieWrapper__image">
                {video.Poster === "N/A" ? (
                  <img
                    className="movieWrapper__image--img"
                    src={noImage}
                    alt=""
                  />
                ) : (
                  <img
                    className="movieWrapper__image--img"
                    src={video.Poster}
                    alt=""
                  />
                )}
              </figure>
              <div className="movieWrapper__info">
                <h1 className="movieWrapper__info--h1">{video.Title}</h1>
                <p>Genre: {video.Genre}</p>
                <p>Released: {video.Released}</p>
                <p className="movieWrapper__info--plot">{video.Plot}</p>
                <p>Runtime: {video.Runtime}</p>
                <p>Released: {video.Released}</p>
              </div>
            </>
          )}

          {user.length > 0 && (
            <>
              {liked ? (
                <button
                  className="likeButton liked"
                  onClick={() => {
                    unLikeMovie();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="likeButton notLiked"
                  onClick={() => {
                    likeMovie();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>

        <div className="borderSpacing"></div>

        <div className="similarWrapper">
          <h2>Similar movies:</h2>
          {loading ? (
            <div className="similarMoviesWrapper">
              {new Array(4).fill(0).map((_, index) => (
                <div className="skeletonWrapper__similar" key={index}>
                  <div className="skeletonWrapper__similar--img"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="similarMoviesWrapper">
              {videos.slice(0, 4).map((item, index) => (
                <figure
                  className="similarMoviesWrapper__image"
                  key={index}
                  onClick={() => {
                    navigate(`/${searchTerm}/${item.imdbID}`);
                    window.location.reload(false);
                  }}
                >
                  {item.Poster !== "N/A" ? (
                    <img
                      className="similarMoviesWrapper__image--img"
                      src={item.Poster}
                      alt=""
                    ></img>
                  ) : (
                    <img
                      className="similarMoviesWrapper__image--img"
                      src={noImage}
                      alt=""
                    ></img>
                  )}
                  <span className="hoverTip">{item.Title}</span>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
