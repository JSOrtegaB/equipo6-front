// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LayoutWithSidebar from './components/LayoutWithSidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import Simulations from './pages/Simulations';
import Reports from './pages/Reports';
import Entrance from './pages/Entrance';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/start" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
          <Route path="/products" element={<LayoutWithSidebar><Products /></LayoutWithSidebar>} />
          <Route path="/sim" element={<LayoutWithSidebar><Simulations /></LayoutWithSidebar>} />
          <Route path="/reports" element={<LayoutWithSidebar><Reports /></LayoutWithSidebar>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
