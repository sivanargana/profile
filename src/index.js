import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import "./style.scss";

axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');

ReactDOM.render(<App />, document.getElementById('root'));

