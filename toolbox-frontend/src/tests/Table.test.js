import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import Table from '../components/table/Table';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';
import { filesMockList } from './mocks';
import filesReducer, { getFilesList } from '../redux/slices/files';
import thunk from 'redux-thunk';

const middlewares = [thunk];

// initialize mockStore which is only the configureStore method which take middlesware as its parameters
const mockStore = configureMockStore(middlewares);

const storeMocked = mockStore({});

const renderWithRedux = (
  component,
  { initialState, store = configureStore({ reducer: filesReducer }) } = {
    list: [],
    files: [],
    isFetching: false
  }
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

// mock fetch call
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(filesMockList)
}));

afterEach(cleanup);

describe('Table Component', () => {

  beforeAll(() => {
    storeMocked.clearActions();
  })

  test('should get files list', () => {
    storeMocked.dispatch(getFilesList()).then((action) => {
      expect(action.payload.files).toEqual(filesMockList.files)
    });
  })

  test('should match snapshot and styles', () => {
    const { asFragment } = renderWithRedux(<Table />);
    expect(asFragment(<Table />)).toMatchSnapshot();
  });
});