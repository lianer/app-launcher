import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './layouts/App';
import reportWebVitals from './reportWebVitals';
import { SettingsContext } from './context/root-context';
import { settings } from './state/Settings';

// basic css
import './assets/normalize.css';
import './assets/root.css';

// roboto for mui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// init state
import './init-state';

// drag links
import './drag-links';

ReactDOM.render(
  <React.StrictMode>
    <SettingsContext.Provider value={settings}>
      <App />
    </SettingsContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
