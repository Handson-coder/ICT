import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingFavourites,
  getEndpoint,
  deletingFavourite,
} from "../store/actions/index";
import Swal from "sweetalert2";

export default function Favourites() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingFavourites());
  }, [dispatch]);
  const favourites = useSelector((state) => state.favourites);
  const sitePayment = useSelector((state) => state.sitePayment);

  const deleteFavourite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deletingFavourite(id));
          Swal.fire(
            "Deleted!",
            "Movie has been deleted from you Favourite Lists.",
            "success"
          );
          dispatch(fetchingFavourites());
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: `${err.response.data.message}`,
        });
      });
  };

  const goToPaymentSite = (id) => {
    dispatch(getEndpoint(id));
    Swal.fire({
      icon: "info",
      title: "Email Sent",
      text: `Your payment ID was sent to ${localStorage.email}, please check it in your inbox/junk`,
    });
    if (sitePayment.invoiceURL && sitePayment.invoiceID) {
      window.open(`${sitePayment.invoiceURL}`);
    }
  };
  const confirmPayment = async (id) => {
    await Swal.fire({
      title: "Please submit your Invoice ID to verify your payment",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (invoiceID) => {
        return fetch(`https://handson-ict.herokuapp.com/favourites/status/payment/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            invoiceID,
          }),
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            for (let q = 0; q < data.message.length; q++) {
              if (data.message[0] === "s") {
                Swal.fire(
                  "Are you sure you already paid for that?",
                  "Cause the systems detect that you never paid for that",
                  "question"
                );
              } else if (data.message[0] === "H") {
                Swal.fire({
                  title: "Thankyou for confirming your payment",
                  text: "Your payment is confirmed by system and we will send a confirmation email to the Clinic by now",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Invoice ID that you submited is not exists",
                });
              }
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    await dispatch(fetchingFavourites());
  };

  return (
    <div>
      <div className="favourite-container">
        {favourites.length === 0 ? (
          <h1>Sorry, you havent added any Movie to your Favourite Lists</h1>
        ) : (
          <h1 className="text-align-center">Favourite Lists</h1>
        )}
        <div className="grid-template pl-28">
          {favourites.length !== 0 ? (
            favourites?.map((data) => {
              return (
                <div
                  key={data.id}
                  className="max-w-2xl bg-neutral-focus border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg container-history"
                >
                  <div id="header" className="flex items-center mb-4">
                    <img
                      alt="avatar"
                      className="w-20 border-2 border-gray-300"
                      src={data.Movie.imgUrl}
                    />
                    <div id="header-text" className="leading-6 ml-8 sm">
                      <div className="pb-5">
                        <h4 id="name" className="text-xl font-semibold">
                          {data.Movie.title}
                        </h4>
                      </div>
                      <h5 id="job" className="font-semibold text-gray-300">
                        {data.Movie.synopsis}
                      </h5>
                      <div className="pt-5">
                        <h3 id="job" className="font-semibold">
                          {data.Movie.genre}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div id="quote">
                    <div className="flex">
                      <div className="pt-2">
                        <h1 className="text-lg">
                          Rp. {data?.Movie?.price?.toLocaleString("id-id")},-
                        </h1>
                      </div>
                      {data.is_paid === false ? (
                        <div className="pl-6">
                          <button
                            onClick={() => goToPaymentSite(data.id)}
                            className="btn btn-outline btn-success"
                          >
                            Pay Now
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    {data.is_paid === false ? (
                      <div className="flex pt-5">
                        <div className="pl-10 pr-28">
                          <button
                            onClick={() => deleteFavourite(data.id)}
                            className="btn btn-outline btn-error"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="pl-28 pr-10">
                          <button
                            onClick={() => confirmPayment(data.id)}
                            className="btn btn-outline"
                          >
                            Confirm Payment
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="paid">
                        <button disabled className="text-lg uppercase">
                          Paid
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
