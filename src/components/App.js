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
      moviePerPage: 6,
      totalPages: null,
      scrolling: false,
      accordions: {}
    }
  }
  async componentDidMount() {
    // https://fierce-dawn-79367.herokuapp.com/movies
    const { currentPage, moviePerPage, movies } = this.state;
    const data = await fetch(`http://localhost:4000/movies/find?per=${moviePerPage}&page=${currentPage}`)
    .then(data => data.json())
    this.setState({
      movies: data.currentMovie
    })
    
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillMount() {
    this.loadMovies();
    document.addEventListener('mousedown', this.onHandleClickOffTarget, false);
    document.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scrolling, totalPages, currentPage } = this.state;
    if (scrolling) { return }
    if(totalPages <= currentPage) { return }
    const lastElement = document.querySelector('.links.load-more');
    if(lastElement !== null) {
      const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      let bottomOffset = 30;
      if(pageOffset > lastElementOffset - bottomOffset) {
        this.loadMore();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onHandleClickOffTarget, false);
    document.removeEventListener('scroll', this.handleScroll)
  }

  loadMovies = () => {
    const { currentPage, moviePerPage, movies } = this.state;
    const url = `http://localhost:4000/movies/find?per=${moviePerPage}&page=${currentPage}`;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => this.setState({
        movies: [...movies, ...json.currentMovie],
        scrolling: false,
        totalPages: json.total_pages
      }));
  }

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      scrolling: true,
    }), this.loadMovies);
  }

  // handleScroll = () => {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     console.log(this.state.currentPage);
  //     this.setState({
  //       currentPage: Number(this.state.currentPage) + 1
  //     });
  //   }
  // }


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
    await fetch('http://localhost:4000/movies/moviePOST/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newBody)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if(this.state.totalPages === this.state.currentPage) {
        this.setState({
          movies: [
            ...this.state.movies, response.movie[0]
          ]
        })
      } else {
        console.log('success')
      }
    })
  }

  delete = async (id) => {
    var newBody = {
      m_id: id
    };
    await fetch('http://localhost:4000/movies/movieDELETE', {
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
    await fetch('http://localhost:4000/movies/moviePUT/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      console.log(response)
      return response.json();
    })
    .then((response) => {
      
      const i = this.state.movies.findIndex((movie) => {
        return movie.m_id === response[0].m_id;
      })
      console.log('i',i)
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
    window.scrollTo(0, 0);
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
                      onHandleClickPage={this.onHandleClickPage}
                      onClickDelete={this.onClickDelete}
                      loadMore={this.loadMore}
                      {...this.state} /> 
                  }
              />
              <Route
                    exact
                    path="/movies/id/:id"
                    render={(props) =>
                      <Single
                        handleAccordionClick={this.handleAccordionClick}
                        onClickEdit={this.onClickEdit}
                        onClickSave={this.onClickSave}
                        onHandleClick={this.onHandleClick}
                        onHandleInput={this.onHandleInput}
                        onClickTest={this.onClickTest}
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
