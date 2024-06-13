import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux-store/index";
import { Provider } from "react-redux";
// import {  } from "apollo-boost";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// ApolloProvider is used to cache data which is coming from the API.
/* 
  ApolloClient is used to create a client connection. 
  URI is used to Pass the URL for Graphql client
  Headers is used to pass Auth info for client connection 
*/

const client = new ApolloClient({
  uri: process.env.REACT_APP_STRAPI_GQL_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_STRAPI_APIKEY}`,
    "client-name": "WidgetX Ecom [web]",
    "client-version": "1.0.0",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
