/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { authRegister } from '../../redux/actions/actionCreators/auth';

import './RegisterForm.scss';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .concat(Yup.string().required('Password is required'))
      .min(7, 'Password must be at least 7 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .matches(/[#]/, 'Password must contain one #'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match',
    ),
  });
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  function onSubmit(userData) {
    dispatch(authRegister(userData));
    setIsRegistered(true);
  }

  useEffect(() => {
    if (isRegistered) {
      toast.success('Register Successfuly, redirecting to login...');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }
  }, [isRegistered]);

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
      <div className="form-group col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          className={`form-control ${
            errors.confirmPassword ? 'is-invalid' : ''
          }`}
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <span className="invalid-feedback">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        value="Register"
        className="btn btn-primary mt-4 mx-auto d-flex"
        disabled={!formState.isValid}
      />
    </form>
  );
}
