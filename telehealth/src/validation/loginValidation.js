import * as yup from 'yup';

const validationsForm = {
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
      'password must at least contain one uppercase & lowercase letter, number, special character and at least 8 characters'
    )
    .required('Enter your password'),
};

export default validationsForm;
