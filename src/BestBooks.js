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
            .then((axiosResults) => console.log(axiosResults.data))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
    const bookApi = `${process.env.REACT_APP_SERVER_URL}/books`;
    axios.get(bookApi).then((res) => {
      console.log(res.data[0]);
      let myBooksArr = [];
      res.data.map((ele) => { myBooksArr.push(ele);
      return myBooksArr;});
      this.setState({ books: res.data[0] });
    });
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <div>{this.state.books && <booksData books={this.state.books} />}</div>
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
