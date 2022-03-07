import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

// basic css
import './assets/normalize.css';
import './assets/root.css';

// roboto for mui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
