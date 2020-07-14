import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

function RegisterForm({ userInfo, handleChange, handleSubmit }) {
  const passwordValidation = inputField => {
    if (userInfo.password.length >= 1) {
      if (userInfo.password.length >= 8) {
        return (
          <input
            className={inputField}
            valid
            name="password"
            type="password"
            id="password"
            required
            onChange={handleChange}
            placeholder="password"
          />
        );
      }
      return (
        <input
          className={inputField}
          invalid
          name="password"
          type="password"
          id="password"
          required
          onChange={handleChange}
          placeholder="password"
        />
      );
    }
    return (
      <input
        className={inputField}
        name="password"
        type="password"
        id="password"
        required
        onChange={handleChange}
        placeholder="password"
      />
    );
  };

  const repasswordValidation = inputField => {
    if (userInfo.repassword.length >= 1) {
      if (userInfo.password === userInfo.repassword) {
        return (
          <input
            className={inputField}
            valid
            name="repassword"
            type="password"
            id="repassword"
            required
            onChange={handleChange}
            placeholder="verify password"
          />
        );
      }
      return (
        <input
          className={inputField}
          invalid
          name="repassword"
          type="password"
          id="repassword"
          required
          onChange={handleChange}
          placeholder="verify password"
        />
      );
    }
    return (
      <input
        className={inputField}
        name="repassword"
        type="password"
        id="repassword"
        required
        onChange={handleChange}
        placeholder="verify password"
      />
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="inputForm registerForm">
      <legend>Register</legend>

      <input
        className="inputField"
        name="email"
        type="email"
        id="email"
        onChange={handleChange}
        placeholder="email"
      />

      <input
        className="inputField"
        name="username"
        type="text"
        id="username"
        required
        onChange={handleChange}
        placeholder="username"
      />

      {passwordValidation('inputField')}
      {repasswordValidation('inputField')}

      <div className="btn-wrapper">
        <button data-testid="submit-button" type="submit" className="btn">
          Submit
        </button>
      </div>
    </Form>
  );
}

export default RegisterForm;
