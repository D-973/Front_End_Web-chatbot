// Import CSS and Bootstrap packages
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS file
import './index.css';

// Import App component
import App from './App';

// Import reportWebVitals for performance measurement
import reportWebVitals from './reportWebVitals';

// Create a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance and log results or send to analytics endpoint
reportWebVitals();