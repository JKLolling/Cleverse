// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const nav = document.getElementsByClassName('nav')[0]
    const body = document.getElementsByTagName('body')[0]
    nav.classList.add('form_bottom')
    body.classList.add('black_background')
    return () => {
      nav.classList.remove('form_bottom')
      body.classList.remove('black_background')
    }
  }, []);

  if (sessionUser) return (
    <Redirect to="/" />
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='signup_wrapper'>
      <div className='signup_title'> SIGN IN! </div>
      <div className='signup_form_wrapper'>
        <form onSubmit={handleSubmit}>
          <ul className='signup_errorsUl'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='signup_inputDiv'>
            <label htmlFor='credential'> Username or Email </label>
            <input
              id='credential'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div className='signup_inputDiv'>
            <label htmlFor='password'> Password </label>
            <input
              id='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='signup_buttonDiv'>
            <button type="submit">Log In</button>
          </div>
          <div>
            Don't have an account yet?
            <NavLink to='/signup' className='signup_nav-to-signin'>
              Sign up here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
