import React, { Component } from 'react';
import Category from './Category';
import Single from './Single';
import Form from './Form';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      newMovieName: "",
      newMovieDesc: "",
      newMovieType: "",
      newMovieImage: "",
      newMovieDirector: "",
      newMovieYear: "",
      onChangeStars: "",
      newMovieLength: "",
      newMovieMPAA: ""
    }
  }
  async componentDidMount() {
    const data = await fetch('http://localhost:4000/movies/')
    .then(data => data.json());

    this.setState({
      movies: data.movies
    })
  }

  post = async (name, desc, type, image, director, year, stars, length, MPAA) => {
    var newBody = {
      name,
      desc,
      type,
      image,
      director,
      year,
      stars,
      length,
      MPAA
    };
    await fetch('http://localhost:4000/moviePOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(newBody)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('response',response);
      this.setState({
        movies: [...this.state.movies, ...response]
      })
    })
  }

  onChangeName = (e) => {
    this.setState({
      newMovieName: e.target.value
    });
  }
  onChangeDesc = (e) => {
    this.setState({
      newMovieDesc: e.target.value
    });
  }
  onChangeType = (e) => {
    this.setState({
      newMovieType: e.target.value
    });
  }
  onChangeImage = (e) => {
    this.setState({
      newMovieImage: e.target.value
    });
  }
  onChangeDirector = (e) => {
    this.setState({
      newMovieDirector: e.target.value
    });
  }
  onChangeYear = (e) => {
    this.setState({
      newMovieYear: e.target.value
    });
  }
  onChangeStars = (e) => {
    this.setState({
      newMovieStars: e.target.value
    });
  }
  onChangeLength = (e) => {
    this.setState({
      newMovieLength: e.target.value
    });
  }
  onChangeMPAA = (e) => {
    this.setState({
      newMovieMPAA: e.target.value
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.newMovieName;
    const desc = this.state.newMovieDesc;
    const type = this.state.newMovieType;
    const image = this.state.newMovieImage;
    const director = this.state.newMovieDirector;
    const year = this.state.newMovieYear;
    const stars = this.state.newMovieStars;
    const length = this.state.newMovieLength;
    const MPAA = this.state.newMovieMPAA;
    

    this.post(name, desc, type, image, director, year, stars, length, MPAA);
    e.target.reset();
    this.setState({
      newMovieName: "",
      newMovieDesc: "",
      newMovieType: "",
      newMovieImage: "",
      newMovieDirector: "",
      newMovieYear: "",
      newMovieStars: "",
      newMovieLength: "",
      newMovieMPAA: ""
    })
   
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <section className="row movies">
          <Route  
              exact 
              path="/" 
              render={(props) => 
                <Category
                  movies={this.state.movies} /> 
              }
          />
          <Route
                exact
                path="/movies/id/:id"
                render={(props) =>
                  <Single
                    movies={this.state.movies}
                    {...props} />
                }
            />
          <Route 
                exact 
                path="/form"
                render={(props) => 
                  <Form 
                    onChangeName={this.onChangeName}
                    onChangeDesc={this.onChangeDesc}
                    onChangeType={this.onChangeType}
                    onChangeImage={this.onChangeImage}
                    onChangeDirector={this.onChangeDirector}
                    onChangeYear={this.onChangeYear}
                    onChangeStars={this.onChangeStars}
                    onChangeLength={this.onChangeLength}
                    onChangeMPAA={this.onChangeMPAA}
                    onHandleSubmit={this.onHandleSubmit}
                  />
                }
          />
            {/* <span class="fa fa-star"></span>
            <span class="fa fa-star-o"></span>
            <span class="fa fa-star-half-o"></span> */} 
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
