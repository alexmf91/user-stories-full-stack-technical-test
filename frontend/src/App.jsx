import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './views/Home';
import SignUpForm from './views/SignUpForm';
import Footer from './components/Footer';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUpForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
