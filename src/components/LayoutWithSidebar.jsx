// src/components/LayoutWithSidebar.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './SideBar'; // Assume you have a Sidebar component

const LayoutWithSidebar = ({ children }) => {
    return (
        <Flex>
            <Box w="20%" p="4">
                <Sidebar />
            </Box>
            <Box w="80%" p="4">
                {children}
            </Box>
        </Flex>
    );
};

export default LayoutWithSidebar;
