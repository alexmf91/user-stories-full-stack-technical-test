/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './RegisterForm.scss';

export default function SignUpForm() {
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
      'Passwords must match'
    ),
  });
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="register-form-view-component"
    >
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
          id="password"
        />
        {errors.confirmPassword && (
          <span className="invalid-feedback">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        className="btn btn-primary mt-4 mx-auto d-flex"
        disabled={!formState.isValid}
      />
    </form>
  );
}
