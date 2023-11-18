import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './SideBar';

const LayoutWithSidebar = ({ children }) => {
    return (
        <Flex>
            <Box w="17%" p="4">
                <Sidebar />
            </Box>
            <Box w="83%" p="4">
                {children}
            </Box>
        </Flex>
    );
};

export default LayoutWithSidebar;
