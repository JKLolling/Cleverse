// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };


  const loginAsDemo = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential: 'CoolCat42', password: 'password' }))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='signup_wrapper'>
      <div className='signup_title'> SIGN UP! </div>
      <div className='signup_form_wrapper'>
        <form onSubmit={handleSubmit}>
          <ul className='signup_errorsUl'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='signup_inputDiv'>
            <label htmlFor='email'> Email </label>
            <input
              id='email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='signup_inputDiv'>
            <label htmlFor='username'> Username </label>
            <input
              id='username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='signup_inputDiv'>
            <label htmlFor='password'>Password </label>
            <input
              id='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='signup_inputDiv'>
            <label htmlFor='confirm_password'> Confirm Password </label>
            <input
              id='confirm_password'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className='signup_buttonDiv'>
            <button type="submit">Sign Up</button>
          </div>
          <div>
            Already have an account?
            <NavLink to='/login' className='signup_nav-to-signin'>
              Sign in here
            </NavLink>
          </div>
          <div>
            Don't want an account?
            <NavLink to='/' className='signup_nav-to-signin' activeClassName='selected' onClick={loginAsDemo}>
              Login as a Demo User
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
