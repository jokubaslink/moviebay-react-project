import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import noImage from "../assets/noimgavailable.jpg";
import "./Page.css";

function Page() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [video, getVideo] = useState([]);
  const [videos, getVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useParams();

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
                    ></img>
                  ) : (
                    <img
                      className="similarMoviesWrapper__image--img"
                      src={noImage}
                    ></img>
                  )}
                  <span className="hoverTip">More Details</span>
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
