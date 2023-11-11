import React from 'react';
import { Box, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box position="fixed" left="0" p="5" w="200px" h="100vh">
            <Stack spacing="4">
                <Link as={RouterLink} to="/start">Inicio</Link>
                <Link as={RouterLink} to="/products">Productos Financieros</Link>
                <Link as={RouterLink} to="/sim">Simulaciones</Link>
                <Link as={RouterLink} to="/sim-table">Simulaciones Guardadas</Link>
                <Link as={RouterLink} to="/reports">Reportes</Link>
            </Stack>
        </Box>
    );
};

export default Sidebar;