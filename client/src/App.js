import React from "react";
import "./App.css";

//Components
import MovieList from "./components/MovieList";
import NewMovieForm from "./components/NewMovieForm";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NewMovieForm></NewMovieForm>
        <MovieList></MovieList>
      </div>
    </ApolloProvider>
  );
}

export default App;
