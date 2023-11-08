import React from 'react';
import { Box, Text, Image, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoRatio.png';

const Entrance = () => {
    const navigate = useNavigate();

    return (
        <Center h="100vh" flexDirection="column">
            <Image src={logo} boxSize="150px" />
            <Text fontSize="xl" my="4">
                Welcome to My App
            </Text>
            <Button onClick={() => navigate('/start')}>Enter</Button>
        </Center>
    );
};

export default Entrance;