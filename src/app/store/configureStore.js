import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import compose from "compose-function";
import { loadLocalState, saveLocalState } from "../utils/localStorage";
import reducers from "../reducers";
import throttle from "lodash/throttle";

const persistedState = loadLocalState() || {};
// const persistedState = {};
const composeEnhancers = DEV_ENV
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default function configureStore(preloadedState = persistedState) {
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  store.subscribe(
    throttle(() => {
      saveLocalState(store.getState());
    }, 1000)
  );

  return store;
}
