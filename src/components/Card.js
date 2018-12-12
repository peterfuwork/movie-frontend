import React from 'react';
import { Link } from "react-router-dom";
import { printResult } from './RatingStars';

const Card = (props) => {
    console.log('props',props)
    return (
        <div className="col-xs-6 col-sm-4 movie">
            <div className="delete">
                <a 
                    className="delete-btn" 
                    href="#"
                    onClick={(e) => props.onClickDelete(e, props.m_id)}>X</a>
            </div>
            <Link to={`/movies/id/${props.m_id}`}>
                <img className="img" src={props.image} alt={props.name} />
            <h4 className="name">{props.name}</h4>
            <div className="name">{props.stars !== "" ? props.stars !== undefined ? <div dangerouslySetInnerHTML={{__html: printResult(props.stars)}} /> : <span></span> : <span></span> }</div>
            <div className="type">{props.type}</div>
            </Link>
        </div>
    );
}

export default Card;