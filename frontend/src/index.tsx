import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/AdminPage';
import UserPage from './components/UserPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/user" element={<UserPage />}/>
    </Routes>
  </BrowserRouter>
    
  </React.StrictMode>
);
