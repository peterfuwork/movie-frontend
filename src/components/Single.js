import React from 'react';
import Back from "./Back";
import ScrollToTopOnMount from './ScrollToTopOnMount';

const Single = (props) => {
    if(props.movies.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const movie = props.movies.filter(movie => movie.m_id === Number(props.match.params.id));
    return (
        <div className="movie">
            <ScrollToTopOnMount />
            <Back />
            <div className="col-xs-12 col-sm-7">
                <div className="img-wrapper">
                    <img className="img single" src={ movie[0].image} alt={movie[0].name} />
                </div>
            </div>
            <div className="col-xs-12 col-sm-5 update">
                <div className={`save-hidden update ${props.isEditButtonClick === true ? "active" : ""}`}>
                    <div className="save update">
                        <a 
                            href="#" 
                            className="save-btn update"
                            onClick={(e) => props.onClickSave(e, movie[0].m_id, props.editMovieName, props.editMovieDesc, props.editMovieType, props.editMovieImage, props.editMovieDirector, props.editMovieYear, props.editMovieStars, props.editMovieLength, props.editMovieMPAA)}>(Save)</a>
                    </div>
                    <legend className="update" htmlFor="editMovieName">Movie Name:</legend>
                    <input
                        className="update"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieName}
                        name="editMovieName" />
                    <legend className="update" htmlFor="editMovieDesc">Description:</legend>
                    <textarea
                        className="update"
                        cols="50"
                        rows="7"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieDesc}
                        name="editMovieDesc" />
                    <legend className="update" htmlFor="editMovieType">Type:</legend>
                    <input
                        className="update"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieType}
                        name="editMovieType" />
                    <legend className="update" htmlFor="editMovieImage">Image Link:</legend>
                    <textarea
                        className="update"
                        cols="50"
                        rows="7"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieImage}
                        name="editMovieImage" />
                    <legend className="update" htmlFor="editMovieDirector">Director:</legend>
                    <input
                        className="update"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieDirector}
                        name="editMovieDirector" />
                    <legend className="update" htmlFor="editMovieYear">Year:</legend>
                    <input
                        className="update"
                        type="number"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieYear}
                        name="editMovieYear" /><br />
                    <legend className="update" htmlFor="editMovieStars">Rating:</legend>
                    <select
                        className="update"
                        value={Number(props.editMovieStars)}
                        onChange={(e) => props.onHandleInput(e)}
                        name="editMovieStars"
                        >
                        <option value="5">5</option>
                        <option value="4.5">4.5</option>
                        <option value="4">4</option>
                        <option value="3.5">3.5</option>
                        <option value="3">3</option>
                        <option value="2.5">2.5</option>
                        <option value="2">2</option>
                        <option value="1.5">1.5</option>
                        <option value="1">1</option>
                        <option value="0.5">0.5</option>
                        <option value="0">0</option>
                    </select><br />
                    <legend className="update" htmlFor="editMovieLength">Movie Length (mins):</legend>
                    <input
                        className="update"
                        type="number"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieLength}
                        name="editMovieLength" />
                    <legend className="update" htmlFor="editMovieMPAA">MPAA:</legend>
                    <input
                        className="update"
                        type="text"
                        onChange={(e) => props.onHandleInput(e)}
                        value={props.editMovieMPAA}
                        name="editMovieMPAA" />
                </div>
                <div className={`edit-hidden ${props.isEditButtonClick === true ? "" : "active"}`}>
                    
                    <div className="edit">
                        <a 
                            href="#" 
                            className="edit-btn"
                            onClick={(e) => props.onClickEdit(e, movie[0].m_id, movie[0].name, movie[0].desc, movie[0].type, movie[0].image, movie[0].director, movie[0].year, movie[0].stars, movie[0].length_min, movie[0].MPAA)}>(Edit)</a>
                    </div>
                    <div className="title single">{ movie[0].name }</div>
                    <div className="desc single">{ movie[0].desc }</div>
                    <div className="spec">
                        <div className="list" onClick={() => props.handleAccordionClick(1)}>
                        
                            <div className="list-title" dangerouslySetInnerHTML={{__html: `${props.accordions[1] ? '<span class="fa fa-caret-down"></span><span>  Type</span>' : '<span class="fa fa-caret-right"></span><span>  Type</span>'}`}}></div>
                            <div className={`value ${props.accordions[1]? "active" :""}`}>{movie[0].type}</div>
                        </div>
                        <div className="list" onClick={() => props.handleAccordionClick(2)}>
                            <div className="list-title" dangerouslySetInnerHTML={{__html: `${props.accordions[2] ? '<span class="fa fa-caret-down"></span><span>  Director</span>' : '<span class="fa fa-caret-right"></span><span>  Director</span>'}`}}></div>
                            <div className={`value ${props.accordions[2]? "active" :""}`}>{movie[0].director}</div>
                        </div>
                        <div className="list" onClick={() => props.handleAccordionClick(3)}>
                            <div className="list-title" dangerouslySetInnerHTML={{__html: `${props.accordions[3] ? '<span class="fa fa-caret-down"></span><span>  Year</span>' : '<span class="fa fa-caret-right"></span><span>  Year</span>'}`}}></div>
                            <div className={`value ${props.accordions[3]? "active" :""}`}>{movie[0].year}</div>
                        </div>
                        <div className="list" onClick={() => props.handleAccordionClick(4)}>
                            <div className="list-title" dangerouslySetInnerHTML={{__html: `${props.accordions[4] ? '<span class="fa fa-caret-down"></span><span>  Length</span>' : '<span class="fa fa-caret-right"></span><span>  Length</span>'}`}}></div>
                            <div className={`value ${props.accordions[4]? "active" :""}`}>{movie[0].length_min} minutes</div>
                        </div>
                        <div className="list" onClick={() => props.handleAccordionClick(5)}>
                            <div className="list-title" dangerouslySetInnerHTML={{__html: `${props.accordions[5] ? '<span class="fa fa-caret-down"></span><span>  MPAA</span>' : '<span class="fa fa-caret-right"></span><span>  MPAA</span>'}`}}></div>
                            <div className={`value ${props.accordions[5]? "active" :""}`}>{movie[0].MPAA}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <input onKeyPress={(e) => props.onClickTest(e)} onClick={(e) => props.onClickTest(e)} /> */}
        </div>
    );
}

export default Single;