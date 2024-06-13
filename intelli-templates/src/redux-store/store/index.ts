import { logger } from "../middleware";
import { rootReducer } from "../reducers";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { IReduxStore } from "../interfaces";

export function configureStore(initialState?: any): Store<IReduxStore> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const composeEnhancers =
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options if any...
        })
      : compose;
  const store = createStore(
    rootReducer as any,
    // persistedReducer,
    initialState as any,
    composeEnhancers(applyMiddleware(...getMiddlewares()))
  ) as Store<IReduxStore>;
  return store as any;
}

export const store = configureStore();
export const persistor = store;

function getMiddlewares() {
  let middlewares = [thunk, promise];
  return middlewares;
}
