import {
  FETCH_MOVIES,
  GET_GENRES,
  GET_SUM_OF_GENRE,
  // FETCH_ITEM,
  // DELETE_ITEM,
  // FETCH_CATEGORIES,
  SET_IS_LOGGED_IN,
  // SET_CREATE,
  // LOGIN_USER,
  // LOGIN_GOOGLE,
  // CREATE_USER
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
export const genre = (payload) => {
  return {
    type: GET_GENRES,
    payload
  }
}
export const sumOfGenre = (payload) => {
  return {
    type : GET_SUM_OF_GENRE,
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
        sumGenre.push(Action*20)
        sumGenre.push(Crime*20)
        sumGenre.push(Horror*20)
        sumGenre.push(Adventure*20)
        sumGenre.push(Scifi*20)
        sumGenre.push(Animation*20)
        sumGenre.push(Fantasy*20)
        sumGenre.push(Thriller*20)
        sumGenre.push(Romance*20)
        dispatch(sumOfGenre(sumGenre))
        let result = [...new Set(genreMovies)]
        dispatch(genre(result))
      })
      .catch((err) => {
        console.log(err);
      });
  };
}