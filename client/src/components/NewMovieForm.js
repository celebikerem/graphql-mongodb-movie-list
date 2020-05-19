import React, { Component } from "react";

import { Query, Mutation } from "react-apollo";

//queries
import {
  getDirectorsQuery,
  getMoviesQuery,
  newMovieMutation,
} from "../queries/queries";

class NewMovieForm extends Component {
  state = {
    title: "",
    description: "",
    year: null,
    directorId: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={newMovieMutation}
        onCompleted={() => {
          this.formRef.reset();
        }}
      >
        {(addMovie, { loading, error }) => (
          <div className="container" data-state="New Movie">
            <div className="device" data-view="list">
              <form
                ref={(el) => {
                  this.formRef = el;
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  addMovie({
                    variables: {
                      title: this.state.title,
                      description: this.state.description,
                      year: parseInt(this.state.year, 10),
                      directorId: this.state.directorId,
                    },
                    refetchQueries: [{ query: getMoviesQuery }],
                  });
                }}
              >
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={this.onChange}
                  ></input>
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <div>
                  <label>Year</label>
                  <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    onChange={this.onChange}
                  ></input>
                </div>
                <div>
                  <label>Director</label>
                  <select name="directorId" onChange={this.onChange}>
                    <option>Select Director</option>
                    <Query query={getDirectorsQuery}>
                      {({ loading, error, data }) => {
                        if (loading) {
                          return <option disabled>Loading...</option>;
                        }
                        if (error) {
                          return <option disabled>Error happened.</option>;
                        }

                        return data.directors.map((director) => (
                          <option key={director.id} value={director.id}>
                            {director.name}
                          </option>
                        ));
                      }}
                    </Query>
                  </select>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>Error happened.</div>}
          </div>
        )}
      </Mutation>
    );
  }
}

export default NewMovieForm;
