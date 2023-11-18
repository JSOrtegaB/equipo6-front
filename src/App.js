// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LayoutWithSidebar from './components/LayoutWithSidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import Simulations from './pages/Simulations';
import SimulationsTable from './pages/SimulationsTable';
import Reports from './pages/Reports';
import Entrance from './pages/Entrance';
import { AuthProvider } from './context//AuthContext';

function App() {

  const [user, setUser] = React.useState({});
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route path="/start" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
            <Route path="/products" element={<LayoutWithSidebar><Products /></LayoutWithSidebar>} />
            <Route path="/sim" element={<LayoutWithSidebar><Simulations /></LayoutWithSidebar>} />
            <Route path="/sim-table" element={<LayoutWithSidebar><SimulationsTable /></LayoutWithSidebar>} />
            <Route path="/reports" element={<LayoutWithSidebar><Reports /></LayoutWithSidebar>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
