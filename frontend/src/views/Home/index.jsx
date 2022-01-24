import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import beLikeLogo from '../../assets/belike-logo.PNG';

import './Home.scss';

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <main className="home-view-component">
      <h1>Welcome to beLike intranet</h1>
      {!isLoggedIn ? (
        <div>
          <p>Register or Login To access</p>
          <Link to="/register">
            <button type="button" className="btn btn-primary">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button type="button" className="btn btn-success">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <img src={beLikeLogo} alt="belike-logo-img" />
      )}
    </main>
  );
}
