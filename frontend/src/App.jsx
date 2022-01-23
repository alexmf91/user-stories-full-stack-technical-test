import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './views/Home';
import RegisterForm from './views/RegisterForm';
import Footer from './components/Footer';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
