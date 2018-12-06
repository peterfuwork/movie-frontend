import React from 'react';
import Back from './Back';

const Form = (props) => {
    return (
        <form onSubmit={(e) => props.onHandleSubmit(e)}>
            <Back />
            <h4>Add a new movie</h4>
            <input
                placeholder="Name of movie" 
                type="text"
                onChange={(e) => props.onChangeName(e)}
                value={props.newMovieName} /><br />
            <textarea
                cols="50"
                rows="4"
                placeholder="Description" 
                type="textarea"
                onChange={(e) => props.onChangeDesc(e)}
                value={props.newMovieDesc} /><br />
            <input
                placeholder="Type of movie" 
                type="text"
                onChange={(e) => props.onChangeType(e)}
                value={props.newMovieType} /><br />
            <input 
                placeholder="Image Link" 
                type="text"
                onChange={(e) => props.onChangeImage(e)}
                value={props.newMovieImage} /><br />
            <input 
                placeholder="Director Name" 
                type="text"
                onChange={(e) => props.onChangeDirector(e)}
                value={props.newMovieDirector} /><br />
            <input 
                placeholder="Year issued" 
                type="number"
                onChange={(e) => props.onChangeYear(e)}
                value={props.newMovieYear} /><br />
            <input 
                placeholder="How many stars?" 
                type="number"
                onChange={(e) => props.onChangeStars(e)}
                value={props.newMovieStars} /><br />
            <input 
                placeholder="Length of movie" 
                type="number"
                onChange={(e) => props.onChangeLength(e)}
                value={props.newMovieLength} /><br />
            <input 
                placeholder="MPAA" 
                type="text"
                onChange={(e) => props.onChangeMPAA(e)}
                value={props.newMovieMPAA} /><br />
            <button>Submit</button>
        </form>
    )
}

export default Form;