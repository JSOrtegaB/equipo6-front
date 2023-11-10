import React from 'react';
import { Text, Image, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoRatio.png';

const Entrance = () => {
    const navigate = useNavigate();

    return (
        <Center h="100vh" flexDirection="column">
            <Image src={logo} boxSize="150px" />
            <Text fontSize="xl" my="4">
                Bienvenido a Ratio, el portal de finanzas personales
            </Text>
            <Button onClick={() => navigate('/start')}>Entrar</Button>
        </Center>
    );
};

export default Entrance;