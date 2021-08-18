import React, { Component } from "react";

class booksData extends Component {
  render() {
    return (
      <div>
        <p>{this.props.books.email}</p>
        <h2>{this.props.books.title}</h2>
        <p>{this.props.books.description}</p>
        <h3>{this.props.books.status}</h3>
      </div>
    );
  }
}

export default booksData;
