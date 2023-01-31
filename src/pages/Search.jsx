import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Nav from "../components/Nav";
import noImage from "../assets/noimgavailable.jpg";
import Footer from "../components/Footer";
import Input from "../components/Input";

function Search() {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [videos, getVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=eeef1900&s=${searchTerm}`
      );
      console.log(data.Search);
      getVideos(data.Search);
    }
    fetchMovies();
    setLoading(false);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <Nav />

          <div className="resultsBox">
            <button className="resultsBox--leave" onClick={() => navigate(`/`)}>
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
            {loading
              ? new Array(videos.length).fill(0).map((_, index) => (
                  <div className="movieBox" key={index}>
                    <div className="movieImageWrapper--skeleton">
                      <div className="movieImageWrapper--img--skeleton"></div>
                    </div>
                    <div className="movieBox--title--skeleton"></div>
                    <div className="movieBox--type--skeleton"></div>
                    <div className="movieBox--year--skeleton"></div>
                  </div>
                ))
              : videos.map((video, index) => (
                  <div
                    className="movieBox"
                    onClick={() => navigate(`${video.imdbID}`)}
                    key={index}
                    onChange={() => setLoading(false)}
                  >
                    {video.Poster !== "N/A" ? (
                      <figure className="movieImageWrapper">
                        <img
                          src={video.Poster}
                          alt=""
                          className="movieImageWrapper--img"
                        />
                      </figure>
                    ) : (
                      <figure className="movieImageWrapper">
                        <img
                          src={noImage}
                          alt=""
                          className="movieImageWrapper--img noImg"
                        />
                      </figure>
                    )}
                    <h3 className="movieBox--title">{video.Title}</h3>
                    <p className="movieBox--type">
                      Type: <span className="capitalize">{video.Type}</span>
                    </p>
                    <p>Year: {video.Year}</p>
                  </div>
                ))}
          </div>

          <div className="bottomSpacing">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;

//https://www.omdbapi.com/?apikey=eeef1900&s=fast
//https://www.omdbapi.com/?apikey=eeef1900&i=tt1905041
