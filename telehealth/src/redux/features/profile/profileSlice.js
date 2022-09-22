import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      payload: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        nationality: '',
        department: '',
        preferredLanguage: '',
        preferredCurrency: '',
        lineManager: '',
        address: '',
        phoneNumber: '',
        maritalStatus: '',
        dob: '',
      },
    },
  },
  reducers: {
    getProfileData: (state, profile) => ({
      ...state,
      profile,
    }),
    updateProfileData: (state, profile) => ({
      ...state,
      profile,
    }),
  },
});

export const { getProfileData, updateProfileData } = profileSlice.actions;
export const thisUser = (state) => state.getProfile;

export default profileSlice.reducer;
