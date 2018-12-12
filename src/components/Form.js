import React from 'react';
import Back from './Back';
import { Link } from "react-router-dom";

const Form = (props) => {
    console.log('props',props)
    return (
        <form className="col-sm-12 form" onSubmit={(e) => props.onHandleSubmit(e, props.history)}>
            <Back />
            <h4>Add a new movie</h4>
            <input
                placeholder="Name of movie" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieName}
                name="newMovieName" /><br />
            <textarea
                cols="50"
                rows="4"
                placeholder="Description" 
                type="textarea"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieDesc}
                name="newMovieDesc" /><br />
            <input
                placeholder="Type of movie" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieType}
                name="newMovieType" /><br />
            <textarea
                cols="50"
                rows="4" 
                placeholder="Image Link" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieImage}
                name="newMovieImage" /><br />
            <input 
                placeholder="Director Name" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieDirector}
                name="newMovieDirector" /><br />
            <input 
                placeholder="Year issued" 
                type="number"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieYear}
                name="newMovieYear" /><br />
            <input 
                placeholder="How many stars?" 
                type="number"
                max="5"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieStars}
                name="newMovieStars" /><br />
            <input 
                placeholder="Length of movie" 
                type="number"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieLength}
                name="newMovieLength" /><br />
            <input 
                placeholder="MPAA" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newMovieMPAA}
                name="newMovieMPAA" /><br />
            <button className="submit">Submit</button>
        </form>
    )
}

export default Form;