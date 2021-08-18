import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import booksData from "./booksData";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((result) => {
          const jwt = result.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: "get",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: "/auth",
          };
          axios(config)
            .then((axiosResults) => {
              console.log(axiosResults.data);
              const bookApi = `${process.env.REACT_APP_SERVER_URL}/books`;
              axios.get(bookApi).then((res) => {
                let books = res.data;
                console.log(books);
                this.setState({ books: books });
              });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.state.books.map((item) => (
          <div>
            <p>{item.userEmail}</p>
            <h2>{item.bookTitle}</h2>
            <p>{item.bookDescription}</p>
            <h3>{item.bookStatus}</h3>
          </div>
        ))}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
