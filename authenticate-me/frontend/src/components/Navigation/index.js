// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" id='nav_login'>SIGN IN</NavLink>
        <NavLink to="/signup" id='nav_signup'>SIGN UP</NavLink>
      </>
    );
  }

  return (
    <nav className='nav'>
      <ul>
        <li>
          <input type='search' placeholder='Search for lyrics & more...' />
        </li>
        <li id='nav_logo'>
          <NavLink exact to="/">CLEVERSE</NavLink>
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
