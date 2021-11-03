import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  GET_GENRES,
  GET_SUM_OF_GENRE,
  DELETE_MOVIE,
  FETCH_FAVOURITES,
  SET_IS_LOGGED_IN,
} from '../keys'

const initialState = {
  movies: [],
  genres: [],
  sumOfGenre: [],
  movie: {},
  favourites: [],
  isLoggedIn: false,
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_MOVIES:
      return { ...state, movies: payload }
    case FETCH_MOVIE:
      return { ...state, movie: payload }
    case GET_GENRES:
      return { ...state, genres: payload }
    case GET_SUM_OF_GENRE:
      return { ...state, sumOfGenre: payload }
    case DELETE_MOVIE:
      return { ...state, favourites: state.favourites.filter((L) => L.id !== payload) }
    case FETCH_FAVOURITES:
      return { ...state, favourites: payload }
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload }
    default:
      return state
  }
}

export default reducer