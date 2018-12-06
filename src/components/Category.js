import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';


class Category extends Component {
  render() {
    console.log('state',this.props.movies)
    const allMovies = this.props.movies.map(movie => {
            return (
                <Card 
                    key={movie.m_id}
                    id={movie.m_id}
                    name={movie.name}
                    desc={movie.desc}
                    type={movie.type}
                    image={movie.image}
                    director={movie.director}
                    year={movie.year}
                    stars={movie.star}
                    length={movie.length_min}
                    MPAA={movie.MPAA}
                />
            );
        });
    return (
      <div className="Category">
      <Link className="link" to="/form">Add a new movie</Link>
        { allMovies }
      </div>
    );
  }
}

export default Category;