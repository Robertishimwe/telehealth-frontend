import * as yup from 'yup';

const validationsForm = {
  nationality: yup.string(),
  gender: yup.mixed().oneOf(['male', 'female', 'prefer not say']),
  department: yup.string(),
  address: yup.string(),
  phoneNumber: yup.number(),
  lineManager: yup.string(),
  preferredLanguage: yup.string(),
  preferredCurrency: yup.string(),
  dob: yup.date().min('12-31-1800').max('12-31-2010'),
  maritalStatus: yup.mixed().oneOf(['Single', 'Married', 'Widowed']),
};

export default validationsForm;
