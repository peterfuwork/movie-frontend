import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';


class Category extends Component {
  render() {
    console.log('state',this.props.movies)
    const { movies, currentPage, moviePerPage } = this.props;

    // Logic for displaying current todos
    const indexOfLastMovie = currentPage * moviePerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
    const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    
    const renderMovies = currentMovie.map((movie) => {
        return (
            <Card 
                key={movie.m_id}
                m_id={movie.m_id}
                image={movie.image}
                name={movie.name}
                stars={movie.stars}
                type={movie.type}
                onClickDelete={this.props.onClickDelete}
            />
        );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movies.length / moviePerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <span
                className={(this.props.currentPage === number ? 'active ' : '')}
                key={number}
                id={number}
                onClick={this.props.onHandleClickPage}
            >
                {number}
            </span>
        );
    });
    return (
      <div className="Category">
        <div className="col-sm-12 links">
          <Link className="link" to="/form">Add a new movie</Link>
        </div>
        { renderMovies }
        <div className="col-xs-12 pagination">
            { renderPageNumbers }
        </div>
      </div>
    );
  }
}

export default Category;