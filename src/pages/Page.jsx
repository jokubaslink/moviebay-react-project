import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Nav from '../components/Nav';
import './Page.css'

function Page() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [video, getVideo] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=eeef1900&i=${movieId}`
      );
      console.log(data);
      getVideo(data)
      console.log(video.Ratings)
    }
    fetchMovies();
  }, []);


  return (
    <div className='container'>
      <div className="row">
        <Nav />
        <div className="movieWrapper">
        <button className="resultsBox--leave" onClick={() => navigate(-1)}>
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
          <figure className='movieWrapper__image'>
            <img className="movieWrapper__image--img" src={video.Poster} alt="" />
          </figure>
          <div className="movieWrapper__info">
            <h1 className='movieWrapper__info--h1'>{video.Title}</h1>
            <p>Genre: {video.Genre}</p>
            <p>Released: {video.Released}</p>
            <p className='movieWrapper__info--plot'>{video.Plot}</p>
            <p>Runtime: {video.Runtime}</p>
            <p>Released: {video.Released}</p>
{/*           <div className="ratingBox">
            {
              video.Ratings.map(rating => (
                <>
                <div>{rating.Source}</div>
                <div>{rating.Value}</div>
                </>
              ))
            }
          </div> */}
          </div>
        </div>

        <div className="bottomSpacing"></div>
        
        </div>
    </div>
  )
}

export default Page