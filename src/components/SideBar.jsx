import React from 'react';
import { Box, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box position="fixed" left="0" p="5" w="200px" h="100vh">
            <Stack spacing="4">
                <Link as={RouterLink} to="/start">Home</Link>
                <Link as={RouterLink} to="/products">Products</Link>
                <Link as={RouterLink} to="/sim">Simulations</Link>
                <Link as={RouterLink} to="/reports">Reports</Link>
            </Stack>
        </Box>
    );
};

export default Sidebar;