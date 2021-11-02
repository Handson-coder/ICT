import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchingMovie, addToFavouriteList } from "../store/actions";
import Swal from "sweetalert2";

export default function DetailMovie() {
  const { id } = useParams();
  const movie = useSelector((state) => state.movie);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const openNewTabTrailer = (website) => window.open(website, "_blank");

  useEffect(() => {
    dispatch(fetchingMovie(id)); // eslint-disable-next-line
  }, [dispatch]);

  const addMovieToFavourite = (MovieId) => {
    const payload = {
      UserId: localStorage.id,
      MovieId,
    };
    dispatch(addToFavouriteList(payload))
      .then((_) => {
        Swal.fire({
          icon: "info",
          title: "Success!",
          text: `Movie has been added to your Favourite Lists`,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: `${err.response.data.message}`,
        });
      });
  };

  return (
    <div className="flex">
      <div className="grid image-detail-movie">
        <img
          src={movie.imgUrl}
          alt="random"
          className="w-full h-100hv rounded-lg shadow-md"
        />
      </div>
      <div className="relative description-detail mt-8 w-3/4">
        <div className="bg-base-300 p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
              Premier
            </span>
          </div>
          <h4 className="mt-1 pt-3 text-xl font-semibold uppercase leading-tight truncate">
            {movie.title}
          </h4>
          <p className="pt-3 pb-3">{movie.synopsis}</p>
          <div className="mt-1">
            Rp {movie?.price?.toLocaleString("id-id")},-
            <span className="text-gray-500 text-sm"> /ticket</span>
          </div>
          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">
              {movie.genre}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">
              Rating : {movie.rating}
            </span>
          </div>
          <div className="mt-8 flex">
            <div className="pl-10 pr-44">
              <button
                onClick={() => openNewTabTrailer(movie.trailerUrl)}
                className="btn btn-outline"
              >
                Watch Trailer
              </button>
            </div>
            <div className="pl-44 pr-10">
              {!isLoggedIn ? (
                <Link to={"/sign-in"} className="btn btn-outline">
                  Add to Favourite List
                </Link>
              ) : (
                <button
                  onClick={() => addMovieToFavourite(movie.id)}
                  className="btn btn-outline"
                >
                  Add to Favourite List
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
