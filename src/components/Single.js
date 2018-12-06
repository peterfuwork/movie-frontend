import React from 'react';
import { Link } from "react-router-dom";

import Back from "./Back";

const Single = (props) => {
    if(props.movies.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const movie = props.movies.filter(movie => movie.m_id === props.match.params.id);
    return (
        <div className="movie">
            <Back />
            <div>{ movie[0].name }</div>
            <img src={ movie[0].image} />
            <div>{ movie[0].desc }</div>
            <div>{ movie[0].type }</div>
            <div>{ movie[0].director }</div>
            <div>{ movie[0].year }</div>
        </div>
    );
}

export default Single;