import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config'; 
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from '../elements/Spinner/Spinner';
import '../Home/Home.css';

class Home extends Component {
  state = {
      movies: [],
      heroImage: null,
      loading: false,
      currentPage: 0,
      totalPages: 0,
      searchTerm: ''
  }

 

  componentDidMount(){
    if(localStorage.getItem('HomeState')){
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({...state});
    }else {
      this.setState({ loading: true});
      const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      // const endPoint = 'https://api.themoviedb.org/3/tv/popular?api_key=89225c5d1dfa0a1cd50e93070a537502&language=en-US&page=1'
      this.fetchItems(endPoint);
    }
  }

  searchItems = (searchTerm) => {
    console.log(searchTerm);
    let endPoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm : searchTerm
    })

    if(searchTerm === ''){
      endPoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    }else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endPoint);
  }

  loadMoreItems = () => {
    let endPoint = '';
    this.setState({loading:true});
    
    if(this.state.searchTerm === ''){
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1 }`;
    }else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    }

    this.fetchItems(endPoint);
  }





  //Fetching the API
  fetchItems = (endPoint) => {
    fetch(endPoint)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      this.setState({
        movies : [...this.state.movies, ...result.results],
        heroImage: this.state.heroImage || result.results[0],
        loading:false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, ()=>{
        localStorage.setItem('HomeState', JSON.stringify(this.state));
      })
    })
    .catch(err => console.log("Error: " , err))
  }





  render(){
      return (
        <div className='rmdb-home'>
         {this.state.heroImage ? 
          <div>
            <HeroImage 
              image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title = {this.state.heroImage.orginal_title}
              text = {this.state.heroImage.overview}
            />
            <SearchBar 
              callback= {this.searchItems}
            />
          </div> : null }
            <div className='rmdb-home-grid'>
            <FourColGrid 
              header= {this.state.searchTerm ? `You searched For ${this.state.searchTerm}` : 'Ppoupluar Movies'}
              loading= {this.state.loading}
            >
              {this.state.movies.map ((el,i) => {
                return <MovieThumb
                          key={i}
                          clickable = {true}
                          image= {el.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}` : './images/no_image.jpg'}
                          movieId = {el.id}
                          movieName = {el.orginal_title} />


              })}
              </FourColGrid>
              {this.state.loading ? <Spinner /> : null}
              {(this.state.currentPage <= this.state.totalPages && !this.state.loading)} ?
                <LoadMoreBtn text='Load More Movies' onClick={this.loadMoreItems} />
            </div>
            
            
           
        </div>
      )
  }
}

export default Home;
