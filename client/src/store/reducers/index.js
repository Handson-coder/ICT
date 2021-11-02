import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  GET_GENRES,
  GET_SUM_OF_GENRE,
  // DELETE_ITEM,
  // FETCH_CATEGORIES,
  SET_IS_LOGGED_IN,
  // SET_CREATE,
  // FETCH_ITEM,
  // LOGIN_USER
} from '../keys'

const initialState = {
  movies: [],
  genres: [],
  sumOfGenre: [],
  movie: {},
  // categories: [],
  isLoggedIn: false,
  // user: {}
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
    // case FETCH_ITEM:
    //   return { ...state, item: payload }
    // case DELETE_ITEM:
    //   return { ...state, items: state.items.filter((L) => L.id !== payload) }
    // case FETCH_CATEGORIES:
    //   return { ...state, categories: payload }
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload }
    // case SET_CREATE:
    //   return { ...state, items: [...state.items, payload] }
    // case LOGIN_USER:
    //   return { ...state, user: payload }
    default:
      return state
  }
}

export default reducer