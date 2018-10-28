import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ()=> {
    return (
        <div className='rmdb-header'>
            <div className='rmdb-header-content'>
                <img className='rmdb-tmdb-logo' src='./images/tmdb_logo.png' alt='tmdb-logo'/>
                <Link to ="/Home">
                        <img className='rmdb-logo' src="./images/reactMovie_logo.png" alt='rmdb-logo'/>

                </Link>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;