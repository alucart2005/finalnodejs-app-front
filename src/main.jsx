// Importing the required dependencies and styles
import 'bootswatch/dist/vapor/bootstrap.min.css';
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

// Creating a root element for ReactDOM to render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the React component tree with the Redux store as a provider
root.render(
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>
);