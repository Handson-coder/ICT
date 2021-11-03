import axios from 'axios'
import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  GET_GENRES,
  GET_SUM_OF_GENRE,
  FETCH_FAVOURITES,
  DELETE_MOVIE,
  SET_IS_LOGGED_IN,
  SITE_PAYMENT,
} from "../keys";

const baseUrl = 'http://localhost:9000'

export const setIsLoggedIn = (boolean) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: boolean,
  };
};

export const settingIsLoggedIn = (boolean) => {
  return (dispatch) => {
    dispatch(setIsLoggedIn(boolean));
  };
};

export const fetchMovies = (payload) => {
  return {
    type: FETCH_MOVIES,
    payload
  }
}
export const fetchFavourites = (payload) => {
  return {
    type: FETCH_FAVOURITES,
    payload
  }
}
export const fetchMovie = (payload) => {
  return {
    type: FETCH_MOVIE,
    payload
  }
}

export const deleteMovie = (payload) => {
  return {
    type: DELETE_MOVIE,
    payload
  };
};

export const genre = (payload) => {
  return {
    type: GET_GENRES,
    payload
  }
}

export const sumOfGenre = (payload) => {
  return {
    type: GET_SUM_OF_GENRE,
    payload
  }
}

export function fetchingMovies() {
  return function (dispatch) {
    fetch(`${baseUrl}/movies`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchMovies(data));
        let genreMovies = []
        let sumGenre = []
        let Action = 0
        let Crime = 0
        let Horror = 0
        let Adventure = 0
        let Scifi = 0
        let Animation = 0
        let Fantasy = 0
        let Thriller = 0
        let Romance = 0
        for (let l = 0; l < data.length; l++) {
          genreMovies.push(data[l].genre);
          if (data[l].genre === "Action") {
            Action++
          } else if (data[l].genre === "Crime") {
            Crime++
          } else if (data[l].genre === "Horror") {
            Horror++
          } else if (data[l].genre === "Adventure") {
            Adventure++
          } else if (data[l].genre === "Sci-fi") {
            Scifi++
          } else if (data[l].genre === "Animation") {
            Animation++
          } else if (data[l].genre === "Fantasy") {
            Fantasy++
          } else if (data[l].genre === "Thriller") {
            Thriller++
          } else if (data[l].genre === "Romance") {
            Romance++
          }
        }
        sumGenre.push(Action * 20)
        sumGenre.push(Crime * 20)
        sumGenre.push(Horror * 20)
        sumGenre.push(Adventure * 20)
        sumGenre.push(Scifi * 20)
        sumGenre.push(Animation * 20)
        sumGenre.push(Fantasy * 20)
        sumGenre.push(Thriller * 20)
        sumGenre.push(Romance * 20)
        dispatch(sumOfGenre(sumGenre))
        let result = [...new Set(genreMovies)]
        dispatch(genre(result))
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const fetchingMovie = (id) => {
  return (dispatch) => {
    fetch(`${baseUrl}/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchMovie(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const signIn = (payload) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}/users/login`, payload)
  }
}

export const signUp = (payload) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}/users/register`, payload)
  }
}

export function paymentSite(payload) {
  return {
    type: SITE_PAYMENT,
    payload,
  };
}

export const addToFavouriteList = (payload) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}/favourites/${payload.MovieId}`, {
      UserId: payload.UserId,
      MovieId: payload.MovieId
    }, {
      headers: {
        access_token: localStorage.access_token
      }
    })
  }
}

export const fetchingFavourites = (payload) => {
  return (dispatch) => {
    axios.get(`${baseUrl}/favourites`, {
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({ data }) => {
        dispatch(fetchFavourites(data))
      })
      .catch(err => console.log(err))
  }
}

export function getEndpoint(id) {
  return function (dispatch) {
    return fetch(`${baseUrl}/xendits/invoice/${id}`, {
      method: "POST",
      headers: {
        access_token: localStorage.access_token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(paymentSite({
          invoiceURL: data.invoiceURL,
          invoiceID: data.invoice_id
        }));
      })
      .catch((err) => console.log(err))
  };
}

export const deletingFavourite = (id) => {
  return (dispatch) => {
    axios.delete(`${baseUrl}/favourites/${id}`, {
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then((_) => {
      dispatch(deleteMovie(id));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}