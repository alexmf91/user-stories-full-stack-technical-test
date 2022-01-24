/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserData } from '../../redux/actions/actionCreators/auth';

export default function Profile() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else {
      dispatch(getUserData(user.token));
      setCurrentUser(user);
    }
  }, [user, isLoggedIn]);

  return (
    <main className="container-sm m-5 p-5">
      <p>
        <strong>Id:</strong>
        {' '}
        {currentUser?.userInfo?._id}
      </p>
      <p>
        <strong>Username:</strong>
        {' '}
        {currentUser?.userInfo?.userName}
      </p>
    </main>
  );
}
