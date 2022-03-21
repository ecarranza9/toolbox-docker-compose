import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/layout/Navbar.js';
import Table from './components/table/Table.js';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Provider store={store}>
    <NavBar />
    <Table />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
