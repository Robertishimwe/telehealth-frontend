import * as yup from 'yup';

const validationsPassword = {
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
      'password must at least contain one uppercase & lowercase letter, number, special character and at least 8 characters'
    )
    .required('Enter your password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Confirm your password'),
};

export default validationsPassword;
