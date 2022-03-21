import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFilesData = createAsyncThunk(
  'files/getFilesData',
  (fileName) => {
    const url = fileName && fileName !== 'all'
      ? `http://localhost:4000/files/data?fileName=${fileName}`
      : 'http://localhost:4000/files/data';
    return fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => data)
  }
);

export const getFilesList = createAsyncThunk(
  'files/getFilesList',
  () => {
    return fetch('http://localhost:4000/files/list')
      .then(response => {
        return response.json()
      })
      .then(data => data)
  }
);

export const initialState = {
  files: [],
  list: [],
  fileName: undefined,
  isFetching: false
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFileName: (state, action) => {
      state.fileName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFilesData.pending, (state) => {
      state.isFetching = true;
    }),
      builder.addCase(getFilesData.rejected, (state, action) => {
        state.isFetching = false;
      }),
      builder.addCase(getFilesData.fulfilled, (state, action) => {
        state.isFetching = false;
        state.files = action.payload;
      }),
      builder.addCase(getFilesList.pending, (state) => {
        state.isFetching = true;
      }),
      builder.addCase(getFilesList.rejected, (state, action) => {
        state.isFetching = false;
      }),
      builder.addCase(getFilesList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload.files;
      });
  }
});

export const {
  setFileName
} = filesSlice.actions;

export default filesSlice.reducer;