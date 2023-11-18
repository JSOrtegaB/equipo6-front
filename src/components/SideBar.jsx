import React, { useContext } from 'react';
import { Box, Stack, Link, Flex, Spacer, Avatar, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    // Replace 'YourUsername' with dynamic username if available
    const { user, login, logout } = useContext(AuthContext);
    const username = user?.email;
    console.log("User en sidebar: ", user);

    // Logout function - implement the logic for logging out
    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
    };

    return (
        <Box position="fixed" left="0" p="5" w="200px" h="100vh">
            <Flex direction="column" h="100%">
                <Stack spacing="4">
                    {/* Existing Links */}
                    <Link as={RouterLink} to="/start">Inicio</Link>
                    <Link as={RouterLink} to="/products">Productos Financieros</Link>
                    <Link as={RouterLink} to="/sim">Simulaciones</Link>
                    {user && <Link as={RouterLink} to="/sim-table">Simulaciones Guardadas</Link>}
                    <Link as={RouterLink} to="/reports">Reportes</Link>
                </Stack>

                {/* Spacer to push the rest to the bottom */}
                <Spacer />

                {/* User info and Logout link */}
                {user && <Box textAlign="left" mb="100%">
                    <Avatar name={username} />
                    <Text mt="2">{username}</Text>
                    <Button mt="4" size="sm" onClick={handleLogout}>Salir</Button>
                </Box>}
            </Flex>
        </Box>
    );

};

export default Sidebar;
