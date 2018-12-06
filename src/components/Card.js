import React from 'react';
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div className="col-sm-4 movie">
            <Link to={`/movies/id/${props.id}`}>
                <img className="img" src={props.image} alt={props.name} />
            </Link>
            <h4 className="name">{props.name}</h4>
            <div className="type">{props.type}</div>
        </div>
    );
}

export default Card;