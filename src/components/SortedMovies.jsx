import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../assets/noimgavailable.jpg";
import axios from 'axios'

function SortedMovies({filter}) {
  const [videos, getVideos] = useState([])
  const {searchTerm} = useParams();

  const navigate = useNavigate();

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=eeef1900&s=${searchTerm}`
    );
    getVideos(data.Search);
  }

  useEffect(() => {
    fetchMovies()
  }, [filter]);

  return (
    <>
    {filter === 'OLD_TO_NEW' ? videos.sort((a, b) => a.Year - b.Year).map((video, index) => (
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
              <span className="hoverTip">More Details</span>
            </figure>
          )}
          <h3 className="movieBox--title">{video.Title}</h3>
          <p className="movieBox--type">
            Type: <span className="capitalize">{video.Type}</span>
          </p>
          <p>Year: {video.Year}</p>
        </div>
      )): filter === 'NEW_TO_OLD' ?  videos.sort((a, b) => b.Year - a.Year).map((video, index) => (
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
              <span className="hoverTip">More Details</span>
            </figure>
          )}
          <h3 className="movieBox--title">{video.Title}</h3>
          <p className="movieBox--type">
            Type: <span className="capitalize">{video.Type}</span>
          </p>
          <p>Year: {video.Year}</p>
        </div>
      )) : filter === 'Sort' && videos.map((video, index) => (
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
              <span className="hoverTip">More Details</span>
            </figure>
          )}
          <h3 className="movieBox--title">{video.Title}</h3>
          <p className="movieBox--type">
            Type: <span className="capitalize">{video.Type}</span>
          </p>
          <p>Year: {video.Year}</p>
        </div>
      ))} 
    </>
  );
}

export default SortedMovies;
