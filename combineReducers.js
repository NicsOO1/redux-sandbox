const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// string constants
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// buycake action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

// buyicecream action creator
function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "First redux action",
  };
}

// initial states
const cakeInitialState = { noOfCakes: 10 };
const icecreamInitialState = { noOfIcecreams: 30 };

// cake reducer
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    default:
      return state;
  }
};

// icecream reducer
const icecreamReducer = (state = icecreamInitialState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        noOfIcecreams: state.noOfIcecreams - 1,
      };
    default:
      return state;
  }
};

// combine reducers --> rootReducers
const rootReducers = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

// creating store
const store = createStore(rootReducers);
console.log("Initial state : ", store.getState());
const unSubscribe = store.subscribe(() =>
  console.log("Updated state : ", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unSubscribe();
