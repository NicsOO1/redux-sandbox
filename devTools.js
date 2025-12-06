const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = require("redux-logger").createLogger();
const { composeWithDevTools } = require("redux-devtools-extension");

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function increment() {
  return {
    type: INCREMENT,
  };
}

function decrement() {
  return {
    type: DECREMENT,
  };
}

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(
  counterReducer,
  composeWithDevTools(applyMiddleware(logger))
);

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
