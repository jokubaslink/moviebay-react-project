import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../assets/noimgavailable.jpg";
import axios from "axios";

function Movies() {
  const { searchTerm } = useParams();
  const [videos, getVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=eeef1900&s=${searchTerm}`
      );
      getVideos(data.Search);
    }
    fetchMovies();
  }, []);

  return (
    <>
      {videos.map((video, index) => (
        <div
          className="movieBox"
          onClick={() => navigate(`${video.imdbID}`)}
          key={index}
        >
          {video.Poster !== "N/A" ? (
            <figure className="movieImageWrapper">
              <img
                src={video.Poster}
                alt=""
                className="movieImageWrapper--img"
              />
              <span className="hoverTip">More Details</span>
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
          <p className="movieBox--year">Year: {video.Year}</p>
        </div>
      ))}
    </>
  );
}

export default Movies;
