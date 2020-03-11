import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
import GenreTickbox from "../GenreTickbox/GenreTickbox";
import RatingInput from "../RatingInput/RatingInput";

const idKey = "f450619cfd627e04628610fdf07f671a";
const baseUrl = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/w500";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      genres: [],
      checkedGenres: [],
      rating: "3"
    };
    this.renderMovies = this.renderMovies.bind(this);
    this.renderGenres = this.renderGenres.bind(this);
    this.checkGenre = this.checkGenre.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`${baseUrl}movie/now_playing?api_key=${idKey}&language=en-GB`)
      .then(res => res.json())
      .then(data => {
        function compare(a, b) {
          if (a.popularity > b.popularity) {
            return -1;
          }
          if (a.popularity < b.popularity) {
            return 1;
          }
          // a must be equal to b
          return 0;
        }
        this.setState({ movies: data.results.sort(compare) });
      });

    fetch(`${baseUrl}genre/movie/list?api_key=${idKey}&language=en-GB`)
      .then(res => res.json())
      .then(data => {
        this.setState({ genres: data.genres });
      });
  }

  renderMovies = movies => {
    //  const moviesWithSelectedGenres = movies.reduce((acc,movie) => {
    //     const isAnySelected = this.state.checkedGenres.every((checkedGenreId) => {
    //       return movie.genre_ids.includes(checkedGenreId);
    //     })
    //     return isAnySelected ? [...acc, movie] : acc;
    //    }, [])
    const moviesWithSelectedGenres = movies.filter(movie => {
      const isAnySelected = this.state.checkedGenres.every(checkedGenreId => {
        return movie.genre_ids.includes(checkedGenreId);
      });
      return isAnySelected;
    });

    console.log(movies);
    if (this.state.checkedGenres.length) {
      return moviesWithSelectedGenres
        .filter(movie => movie.vote_average > this.state.rating)
        .map(movie => {
          return (
            <div key={movie.id} className="movie-list-items-wrapper">
              <li>
                <div>
                  <img className="movie-img" src={`${imgUrl}${movie.poster_path}`} alt="poster"></img>
                </div>
                <div className="movie-title">{movie.title}</div>
                <hr />
                <div className="movie-genre">
                  {this.renderGenres(this.state.genres, movie.genre_ids)}
                </div>
              </li>
            </div>
          );
        });
    } else {
      return movies
        .filter(movie => movie.vote_average > this.state.rating)
        .map(movie => {
          return (
            <div key={movie.id} className="movie-list-items-wrapper">
              <li>
                <div>
                  <img className="movie-img" src={`${imgUrl}${movie.poster_path}`} alt="poster"></img>
                </div>
                <div className="movie-title">{movie.title}</div>
                <hr></hr>
                <div className="movie-genre">
                  {this.renderGenres(this.state.genres, movie.genre_ids)}
                </div>
              </li>
            </div>
          );
        });
    }
  };

  renderGenres = (genres, genre_ids = []) => {
    return genres.map(genre => {
      return genre_ids.map(id => {
        if (id === genre.id) {
          return <p key={genre.id}>{genre.name}</p>;
        }
      });
    });
  };

  checkGenre = (id, isChecked) => {
    isChecked
      ? this.setState({
          checkedGenres: this.state.checkedGenres.filter(genreId => {
            return genreId !== id;
          })
        })
      : this.setState({ checkedGenres: [...this.state.checkedGenres, id] });
  };

  handleChange(event) {
    this.setState({ rating: event.target.value });
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <ul className="checkbox-wrapper">
          <GenreTickbox
            checkedGenres={this.state.checkedGenres}
            genres={this.state.genres}
            check={this.checkGenre}
          />
        </ul>
        <RatingInput
          ratingValue={this.state.rating}
          handleRating={this.handleChange}
        />
        <ul className="movie-list">
          {this.state.movies && this.renderMovies(this.state.movies)}
        </ul>
      </div>
    );
  }
}

export default App;
