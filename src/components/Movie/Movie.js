import React, { Component } from 'react';
import { API_URL, API_KEY} from '../../config';
import Navigation from  '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from  '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

export default class Movie extends Component {
    state = {
        movie: null,
        actors:null,
        directors: [],
        loading: false
    }

    componentWillMount() {
        if(localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
            this.setState({...state});
        }else {
            this.setState({ loading: true})
            //First Fetch the Movie
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
            this.fetchItems(endpoint);
        }
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result);
            if(result.status_code) {
                this.setState({loading:false});
            } else {
                this.setState({movie : result}, ()=>{
                    //Fetching Actors

                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                    fetch(endpoint)
                    .then(result => result.json())
                    
                    .then(result => {
                        console.log(result);
                        const directors = result.crew.filter((member) => member.job === 'Director');

                        this.setState({
                            actors: result.cast,
                            directors,
                            loading:false
                        }, () => {
                            localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                        })
                    })
                })
            }
        })
        .catch(err => console.log('Error :', err));
    } 



  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ?
            <div>
                <Navigation movie={this.state.movie.title} />
                <MovieInfo movie={this.state.movie} directors={this.state.directors} />
                <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
            </div>
            : null}

        {this.state.actors ? 
            <div className='rmdb-movie-grid'>
            <FourColGrid header={'Actors'}>
                
                {this.state.actors.map((el,i) => {
                    return <Actor key={i} actor={el} />
                })}
                </FourColGrid>
            </div>
            : null }
            {!this.state.actors && !this.state.loading ? <h1>No Found</h1> :null}
            {this.state.loading ? <Spinner /> : null}

        }       
        
      </div>
    )
  }
}
