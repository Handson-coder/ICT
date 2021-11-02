import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { settingIsLoggedIn } from "../store/actions";
import { Link as LinkToChart } from "react-scroll";

export default function Navbar() {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  function goToLandingPage() {
    history.push("/");
  }

  const signOutButton = () => {
    dispatch(settingIsLoggedIn(false));
    localStorage.clear();
    history.push("/sign-in");
  };

  if (!isLoggedIn) {
    return (
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="px-2 mx-2 navbar-start">
          <button onClick={goToLandingPage}>
            <span className="text-2xl font-birthstone italic">XX-</span>
            <span className="text-2xl font-birthstone italic">ITC</span>
          </button>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <Link
              to="/now-playing"
              className="btn btn-ghost btn-sm rounded-btn"
            >
              Now Playing
            </Link>
            <LinkToChart className="btn btn-ghost btn-sm rounded-btn" to="toChart" smooth={true} duration={1000}>
              Chart
            </LinkToChart>
          </div>
        </div>
        <div className="navbar-end">
          <Link to="/sign-in" className="btn btn-ghost btn-sm rounded-btn">
            Sign In
          </Link>
        </div>
      </div>
    );
  } else if (isLoggedIn) {
    return (
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="px-2 mx-2 navbar-start">
          <button onClick={goToLandingPage}>
            <span className="text-2xl font-birthstone italic">XX-</span>
            <span className="text-2xl font-birthstone italic">ITC</span>
          </button>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <Link
              to="/now-playing"
              className="btn btn-ghost btn-sm rounded-btn"
            >
              Now Playing
            </Link>
            <Link to="/favourites" className="btn btn-ghost btn-sm rounded-btn">
              Favourites
            </Link>
            <LinkToChart
              className="btn btn-ghost btn-sm rounded-btn"
              to="toChart"
              smooth={true}
              duration={1000}
            >
              Chart
            </LinkToChart>
          </div>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-sm rounded-btn"
            onClick={signOutButton}
          >
            Sign Out
          </button>
          <div className="flex-none">
            <div className="avatar">
              <div className="rounded-full w-10 h-10 m-1">
                <img src="https://i.pravatar.cc/500?img=32" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
