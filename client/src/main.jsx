import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          books: {
            merge(existing = [], incoming) {
              /**
               * When removing a 📖, we get a ⚠️ b/c caching cannot determine identical 📖s.
               * Not all of the 📖 fields are uniquely identifiable 🤷🏾‍♀️.
               *
               * `incoming` is the update array of 📚s with a 📖 removed.
               *
               * We tell the cache to use this `incoming` array of 📚s.
               * https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-merge-function
               */
              return [...incoming];
            },
          },
        },
      },
    },
  }),
  headers: {
    authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
