import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/css/app.css';
import App from './App.jsx';

createRoot(document.querySelector('#root')).render(<App />);
