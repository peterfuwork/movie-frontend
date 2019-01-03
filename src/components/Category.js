import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ScrollToTopOnMount from './ScrollToTopOnMount';
import Card from './Card';
import loading from '../assets/loading.gif';


class Category extends Component {
  render() {
    console.log('state',this.props.movies)
    const renderMovies = this.props.movies.map((movie) => {
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
    return (
      <div className="Category">
        <ScrollToTopOnMount />
        <div className="col-sm-12 links">
          <Link className="link" to="/form">Add a new movie</Link>
        </div>
        { renderMovies }
        <div className="col-xs-12 links load-more">
            { this.props.totalPages === this.props.currentPage ? "" : <img src={loading} className="loading" alt="loading" />}
        </div>
      </div>
    );
  }
}

export default Category;