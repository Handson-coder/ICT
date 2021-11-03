import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { settingIsLoggedIn } from "../store/actions";
import { Link as LinkToChart } from "react-scroll";

export default function Navbar() {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [classNowPlaying, setClassNowPlaying] = useState("");
  const [classSignIn, setClassSignIn] = useState("");
  const [classFavourites, setClassFavourites] = useState("");

  function goToLandingPage() {
    history.push("/");
  }

  const choosenNavbarMenuNowPlaying = () => {
    setClassSignIn("");
    setClassFavourites("");
    setClassNowPlaying(
      "btn btn-ghost btn-sm rounded-btn border-base-100 border-b-4"
    );
  };
  const choosenNavbarMenuSignIn = () => {
    setClassNowPlaying("");
    setClassFavourites("");
    setClassSignIn(
      "btn btn-ghost btn-sm rounded-btn border-base-100 border-b-4"
    );
  };
  const choosenNavbarMenuFavourites = () => {
    setClassFavourites(
      "btn btn-ghost btn-sm rounded-btn border-base-100 border-b-4"
    );
    setClassNowPlaying("");
    setClassSignIn("");
  };

  const signOutButton = () => {
    dispatch(settingIsLoggedIn(false));
    localStorage.clear();
    history.push("/sign-in");
  };

  if (!isLoggedIn) {
    return (
      <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="px-2 mx-2 navbar-start">
          <button onClick={goToLandingPage}>
            <span className="text-2xl font-birthstone italic">XX-</span>
            <span className="text-2xl font-birthstone italic">ITC</span>
          </button>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <div className="pr-5">
              <Link
                onClick={choosenNavbarMenuNowPlaying}
                className={
                  classNowPlaying
                    ? classNowPlaying
                    : "btn btn-ghost btn-sm rounded-btn"
                }
                to="/now-playing"
              >
                Now Playing
              </Link>
            </div>
            <div className="pl-5">
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
        </div>
        <div className="navbar-end">
          <div className="px-5">
            <Link
              to="/sign-in"
              onClick={choosenNavbarMenuSignIn}
              className={
                classSignIn ? classSignIn : "btn btn-ghost btn-sm rounded-btn"
              }
            >
              Sign In
            </Link>
          </div>
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
            <div className="pr-5">
              <Link
                onClick={choosenNavbarMenuNowPlaying}
                to="/now-playing"
                className={
                  classNowPlaying
                    ? classNowPlaying
                    : "btn btn-ghost btn-sm rounded-btn"
                }
              >
                Now Playing
              </Link>
            </div>
            <div className="pr-5 pl-5">
              <Link
                to="/favourites"
                onClick={choosenNavbarMenuFavourites}
                className={
                  classFavourites
                    ? classFavourites
                    : "btn btn-ghost btn-sm rounded-btn"
                }
              >
                Favourites
              </Link>
            </div>
            <div className="pl-5">
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
        </div>
        <div className="navbar-end">
          <div className="px-5">
            <button
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={signOutButton}
            >
              Sign Out
            </button>
          </div>
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
