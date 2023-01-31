import React from "react";
import "./Home.css";
import image from "../assets/undraw_movie_night_re_9umk.svg";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <Nav />
          <Input />

          <div className="bottomSpacing"></div>


          <figure className="imageWrapper">
            <img src={image} alt="" className="imageWrapper--img"/>
          </figure>

    <div className="topSpacing"></div>


        <Footer />


        </div>
      </div>
    </>
  );
}

export default Home;