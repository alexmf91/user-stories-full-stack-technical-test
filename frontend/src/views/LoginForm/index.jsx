/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { authLogin } from '../../redux/actions/actionCreators/auth';

import '../RegisterForm/RegisterForm.scss';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, errorMessage } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .concat(Yup.string().required('Password is required'))
      .min(7, 'Password must be at least 7 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .matches(/[#]/, 'Password must contain one #'),
  });
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  function onSubmit(userData) {
    dispatch(authLogin(userData));
  }

  useEffect(() => {
    if (isLoggedIn) {
      toast.success('Login Successfuly');
      setTimeout(() => {
        navigate('/profile', { replace: true });
      }, 1000);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (errorMessage) {
      toast.error('Something when wrong, check your credentials and try it again');
    }
  }, [errorMessage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="register-form-view-component"
    >
      <Toaster />
      <div>
        <label htmlFor="userName">Username</label>
        <input
          {...register('userName', { required: true })}
          className={`form-control ${
            formState.errors.userName ? 'is-invalid' : ''
          }`}
          id="userName"
        />
        {errors.userName && (
          <span className="invalid-feedback">
            {formState.errors.userName?.message}
          </span>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="password">Password</label>
        <input
          {...register('password', { required: true })}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          type="password"
          id="password"
        />
        {errors.password && (
          <span className="invalid-feedback">{errors.password?.message}</span>
        )}
      </div>
      <input
        type="submit"
        value="Login"
        className="btn btn-primary mt-4 mx-auto d-flex"
        disabled={!formState.isValid}
      />
    </form>
  );
}
