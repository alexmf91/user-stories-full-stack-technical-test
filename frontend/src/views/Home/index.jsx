import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
  return (
    <main className="home-view-component">
      <h1>Welcome to the beLike intranet</h1>
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
    </main>
  );
}
