import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './slices/files';

export default configureStore({
  reducer: {
    files: filesReducer
  },
});

