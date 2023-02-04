import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Movies from "../components/Movies";
import SortedMovies from "../components/SortedMovies";

function Search() {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [videos, getVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=eeef1900&s=${searchTerm}`
      );
      getVideos(data.Search);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  async function reFetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=eeef1900&s=${searchId}`
    );
    getVideos(data.Search);
    setLoading(false);
  }

  function onSearch() {
    navigate(`/${searchId}`);
    setLoading(true);
    reFetchMovies();
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <Nav />
          <div className="spacing"></div>

          <div className="searchTop">
            <button className="leaveButton" onClick={() => navigate(`/`)}>
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

            <div className="searchInputBox">
              <input
                type="text"
                className="searchInputBox--input"
                placeholder={"Search by title.."}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(event) => event.key === "Enter" && onSearch()}
              />
              <button
                className="searchInputBox--button"
                onClick={() => onSearch()}
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="spacing"></div>

          <div className="borderSpacing"></div>

          <div className="searchBottom">
            <h2>Search results for: {searchTerm}</h2>
            <div className="sortWrapper">
              <select onChange={(e) => setSort(e.target.value)} id="filter">
                <option defaultValue={true}>
                  Sort
                </option>
                <option value="NEW_TO_OLD">Release date, new to old</option>
                <option value="OLD_TO_NEW">Release date, old to new</option>
              </select>
            </div>
          </div>

          <div className="resultsBox">
            {loading ? (
              new Array(10).fill(0).map((_, index) => (
                <div className="movieBox" key={index}>
                  <div className="movieImageWrapper--skeleton">
                    <div className="movieImageWrapper--img--skeleton"></div>
                  </div>
                  <div className="movieBox--title--skeleton"></div>
                  <div className="movieBox--type--skeleton"></div>
                  <div className="movieBox--year--skeleton"></div>
                </div>
              ))
            ) : videos === undefined ? (
              <div className="movieBox--notFound">
                <h1>{searchTerm} was not found</h1>
              </div>
            ) : sort ? <SortedMovies filter={sort} /> : <Movies />
            }
          </div>
          <div className="borderSpacing--padding">
            <div className="spacing"></div>
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
