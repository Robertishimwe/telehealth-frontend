import { createSlice } from '@reduxjs/toolkit';

export const searchQuerySlice = createSlice({
  name: 'Query',
  initialState: {
    value: '',
  },
  reducers: {
    searchQuery: (state, query) => ({
      query,
    }),
  },
});

export const { searchQuery } = searchQuerySlice.actions;
export const thisQuery = (state) => state.Query.value;

export default searchQuerySlice.reducer;
