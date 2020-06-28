import React from 'react';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';

function LoginForm({ handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <legend>DJ Helper</legend>

      <input
        className="inputField"
        id="username"
        data-testid="usernameInput"
        name="username"
        type="text"
        required
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        className="inputField"
        data-testid="passwordInput"
        name="password"
        type="password"
        id="password"
        required
        onChange={handleChange}
        placeholder="Password"
      />
      <div className="btn-wrapper">
        <button data-testid="submit-button" type="submit" className="btn">
          Log In
        </button>
      </div>
      <p className="loginForgot">Forgot password?</p>
    </form>
  );
}

export default LoginForm;
