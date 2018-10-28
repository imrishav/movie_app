import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

export default class SearchBar extends Component {
    state = {
        value: ''
    }

    timeout = null;

    dhundoMovie = (event) => {
      
      this.setState({ value: event.target.value})
      clearTimeout(this.timeout);
  
      this.timeout = setTimeout(()=>{
        this.props.callback(this.state.value)
      },500);
    }

    render() {
        return (
            <div className='rmdb-searchbar'>
            <div className='rmdb-searchbar-content'>
                <FontAwesome className='rmdb-fa-search' name='search' size='2x' />
                <input
                    type='text'
                    className='rmdb-searchbar-input'
                    placeholder='Search Movies Here'
                    onChange={this.dhundoMovie}
                    value={this.state.value}
                
                />
            
            </div>
                Search Bar
            </div>
        )
    }
}
