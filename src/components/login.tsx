import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('nieprawidłowy format email').required('Email jest wymagany'),
  password: Yup.string()
    .min(6, 'Hasło musi mniec minimum 6 znaków')
    .required('Hasło jest wymagane'),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Dane z formularza', values);
    },
  });

  return (
    <div>
      <h2>LogIn</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <label htmlFor="passowrd">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.email && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
}
