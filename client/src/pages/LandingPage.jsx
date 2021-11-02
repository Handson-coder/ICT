import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/LandingPage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../components/Chart";
import { fetchingMovies } from "../store/actions/index";

export default function LandingPage() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const genres = useSelector((state) => state.genres);
  const sumOfGenre = useSelector((state) => state.sumOfGenre);
  const dispatch = useDispatch();
  const chartData = {
    labels: genres,
    datasets: [
      {
        label: "Genre",
        data: sumOfGenre,
        backgroundColor: [
          "rgb(251, 6, 6)",
          "rgb(4, 133, 4)",
          "rgb(24, 24, 111)",
          "rgb(253, 106, 180)",
          "rgb(240, 240, 3)",
          "rgb(3, 126, 126)",
          "rgb(132, 2, 132)",
          "rgb(194, 192, 192)",
          "rgb(211, 105, 30)"
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    dispatch(fetchingMovies());
  }, [dispatch]);

  return (
    <div className="all-container">
      <div className="landing-container">
        <div className="container">
          <div className="text-landing-page">
            <h2 className="heading">We provide online</h2>
            <h2 className="heading">cinema ticket booking</h2>
            <br />
            <Link
              className="btn btn-outline"
              to={isLoggedIn ? "/now-playing" : "/sign-in"}
            >
              Book a ticket
            </Link>
          </div>
          <div className="photo-landing-page">
            <img src={image} style={{ zIndex: -1 }} alt="" />
          </div>
        </div>
      </div>
      <section>
        <div className="box-container">
          <div className="box1">
            <div className="text">
              <h2>
                <i className="fas fa-map-marked-alt"></i> Location
              </h2>
              <p>Choose you nearest cinema's location to your house.</p>
            </div>
          </div>
          <div className="box2">
            <div className="text">
              <h2>
                <i className="fas fa-store"></i> Easy Payment
              </h2>
              <p>Choose your payment method</p>
            </div>
          </div>
          <div className="box3">
            <div className="text">
              <h2>
                <i className="fas fa-history"></i> Fast Response
              </h2>
              <p>You can receive your ticket within few minutes.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="chart pt-20">
        <h1 className="chart-header text-xl">Genre's Chart Frequency (2x)</h1>
        <BarChart chartData={chartData}></BarChart>
      </div>
    </div>
  );
}
