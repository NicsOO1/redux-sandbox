const redux = require("redux");

const BUY_CAKE = "BUY_CAKE";
const createStore = redux.createStore;

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

const initialState = { noOfCakes: 20 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, noOfCakes: state.noOfCakes - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state: ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
