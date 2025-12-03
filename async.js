const redux = require("redux");
const axios = require("axios");


const thunkMiddleware = require("redux-thunk").thunk;

// applyMiddleware from redux
const applyMiddleware = redux.applyMiddleware;

// create store from redux
const createStore = redux.createStore;

// initial state
const initialState = {
  isLoading: false,
  users: [],
  error: "",
};

// action constants
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// reducer funtion
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        users: [],
        error: action.payload,
      };
  }
};

// fetch users
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.name);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
};

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers())
