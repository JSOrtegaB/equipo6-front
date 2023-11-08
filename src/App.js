import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link as ChakraLink,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
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
          <Route path="/start" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sim" element={<Simulations />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
