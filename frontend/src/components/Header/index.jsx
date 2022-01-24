import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import beLikeLogo from '../../assets/belike-logo.PNG';

import { authLogout } from '../../redux/actions/actionCreators/auth';

import './Header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  function handleLogOut() {
    dispatch(authLogout());
  }

  return (
    <header>
      <Link to="/">
        <img src={beLikeLogo} alt="belike-logo-img" />
      </Link>
      {(isLoggedIn && user?.userInfo) && (
        <div>
          <span>
            Hi,
            {' '}
            {user.userInfo?.userName}
          </span>
          <Link to="/">
            <button type="button" onClick={handleLogOut} className="btn btn-outline-primary mx-3">
              LogOut
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
