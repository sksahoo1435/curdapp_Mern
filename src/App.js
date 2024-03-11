import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Home';
import AddProduct from './Component/AddProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
