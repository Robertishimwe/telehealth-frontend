import * as yup from 'yup';

const validationForm = {
  dob: yup.date().min('12-31-2010').max('12-31-1800'),
  nationality: yup.string(),
  gender: yup.string().valid('male', 'female', 'prefer not say').required(),
  preferredLanguage: yup.string().required(),
  preferredCurrency: yup.string().required(),
  department: yup.string().required(),
  address: yup.string().required(),
  lineManager: yup.string(),
  phoneNumber: yup.string().required().required(),
  maritalStatus: yup.string().valid('Single', 'Married', 'Widowed').required(),
};

export default validationForm;
