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
      newMovieStars: "",
      newMovieLength: "",
      newMovieMPAA: "",

      editMovieId: "",
      editMovieName: "",
      editMovieDesc: "",
      editMovieType: "",
      editMovieImage: "",
      editMovieDirector: "",
      editMovieYear: "",
      editMovieStars: "",
      editMovieLength: "",
      editMovieMPAA: "",

      isEditButtonClick: false,

      currentPage: 1,
      moviePerPage: 9,
      accordions: {}
    }
  }
  async componentDidMount() {
    const data = await fetch('http://localhost:4000/movies/')
    .then(data => data.json());

    this.setState({
      movies: data.movies
    })
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.onHandleClickOffTarget, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onHandleClickOffTarget, false);
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
        'Content-Type': 'application/json'
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

  delete = async (id) => {
    var newBody = {
      m_id: id
    };
    await fetch('http://localhost:4000/movieDELETE', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      const i = this.state.movies.findIndex((movie) => {
        return movie.m_id === response[0].m_id;
      })
      console.log('i', i)
      if(i !== -1) {
        this.setState({
          movies: [
            ...this.state.movies.slice(0, i),
            ...this.state.movies.slice(i + 1)
          ]
        })
      }
      console.log('response',response)
    })
  }

  update = async (m_id, name, desc, type, image, director, year, stars, length_min, MPAA) => {
    var newBody = {
      m_id,
      name,
      desc,
      type,
      image,
      director,
      year,
      stars,
      length_min,
      MPAA
    };
    await fetch('http://localhost:4000/moviePUT/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      console.log('response',response)
      const i = this.state.movies.findIndex((movie) => {
        return movie.m_id === response[0].m_id;
      })
      this.setState({
          movies: [
            ...this.state.movies.slice(0, i),
            response[0],
            ...this.state.movies.slice(i + 1)
          ]
      });
    })
  }

  onHandleInput = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  onHandleClickPage = (e) => {
    this.setState({
        currentPage: Number(e.target.id)
    });
  }

  onClickDelete = (e, id) => {
    e.preventDefault();
    this.delete(id);
  }

  onClickEdit = (e, m_id, name, desc, type, image, director, year, stars, length_min, MPAA) => {
    e.preventDefault();
    
    this.setState({
      isEditButtonClick: true,
      editMovieId: m_id,
      editMovieName: name,
      editMovieDesc: desc,
      editMovieType: type,
      editMovieImage: image,
      editMovieDirector: director,
      editMovieYear: year,
      editMovieStars: stars,
      editMovieLength: length_min,
      editMovieMPAA: MPAA
    })
  }

  onClickSave = (e, m_id, name, desc, type, image, director, year, stars, length_min, MPAA) => {
    e.preventDefault();

    this.update(m_id, name, desc, type, image, director, year, stars, length_min, MPAA);

    this.setState({
      isEditButtonClick: false,
      editMovieId: "",
      editMovieName: "",
      editMovieDesc: "",
      editMovieType: "",
      editMovieImage: "",
      editMovieDirector: "",
      editMovieYear: "",
      editMovieStars: "",
      editMovieLength: "",
      editMovieMPAA: ""
    })
  }

  handleAccordionClick = (panelNumber) => {
    this.setState({
      accordions: {
          [panelNumber]: !this.state.accordions[panelNumber]
      }
    })
  }

  onHandleSubmit = (e, history) => {
    console.log(history)
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
    history.push("/");
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

  onHandleClickOffTarget = (e) => {
      if (e.target.classList.contains('update')) {
          return;
      } else {
          this.setState({
              isEditButtonClick: false
          });
      }
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
                  movies={this.state.movies}
                  onHandleClickPage={this.onHandleClickPage}
                  onClickDelete={this.onClickDelete}
                  {...this.state} /> 
              }
          />
          <Route
                exact
                path="/movies/id/:id"
                render={(props) =>
                  <Single
                    movies={this.state.movies}
                    handleAccordionClick={this.handleAccordionClick}
                    onClickEdit={this.onClickEdit}
                    onClickSave={this.onClickSave}
                    onHandleClick={this.onHandleClick}
                    onHandleInput={this.onHandleInput}
                    {...this.state}
                    {...props} />
                }
            />
          <Route 
                exact 
                path="/form"
                render={(props) => 
                  <Form
                    onHandleInput={this.onHandleInput}
                    onHandleSubmit={this.onHandleSubmit}
                    {...this.state}
                    {...props}
                  />
                }
          />
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
