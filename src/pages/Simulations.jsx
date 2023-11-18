import React, { useState, useEffect, useContext, } from 'react';
import { Box, Button, Center, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Container, Text, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { calculatePayments, calculateEarnings } from '../formulas';
import { AuthContext } from '../context/AuthContext';

import Backendless from 'backendless';

const APP_ID = process.env.REACT_APP_BACKENDLESS_APP_ID;
const API_KEY = process.env.REACT_APP_BACKENDLESS_API_KEY;
Backendless.serverURL = process.env.REACT_APP_BACKENDLESS_URL;
Backendless.initApp(APP_ID, API_KEY);


const Simulations = () => {
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('credito');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [simulations, setSimulations] = useState([]);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useContext(AuthContext);

    const toast = useToast();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'credito') {
            const calculatedSimulations = calculatePayments(products, amount, period);
            setSimulations(calculatedSimulations);
        } else {
            const calculatedEarnings = calculateEarnings(products, amount, period);
            setSimulations(calculatedEarnings);
        }
    };

    const handleSave = async (simulation) => {
        const body = {
            period, amount,
            type,
            monthly_rate: simulation.monthlyPayment,
            product: simulation.name,
            bank: simulation.bank,
            apr: simulation.apr,
            user: user ? user.email : "anonimo"
        };
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/simulations`, body);
        } catch (error) {
            console.error('Error saving simulation:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        Backendless.UserService.login(username, password, true)
            .then(user => {
                login(user);
                setShowLoginForm(false);
                toast({
                    title: "Accesso exitoso",
                    description: "Bienvenido " + user.email + "!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                //console.log(error);

                toast({
                    title: "Error de accesso",
                    description: "Usuario o contraseña incorrectos",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box as="section" width="80%">
            <Container>
                <Box bg="bg.surface" px={{ base: '4', md: '3' }} width="100%" boxShadow="md" borderRadius="lg">
                    <Stack spacing="1">
                        <Text textStyle="sm" color="fg.muted">
                            Selecciona el tipo de operación que deseas realizar, créditos o inversión y el monto que deseas solicitar o invertir.
                            Luego presiona el botón Calcular para obtener los resultados.
                            Al finalizar la simulación, presiona el botón para Guardar los que te interesen para guardar la simulación en la base de datos.
                        </Text>
                    </Stack>
                </Box>
            </Container>

            <Box p="4">
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Tipo</FormLabel>
                        <Select onChange={(e) => setType(e.target.value)}>
                            <option value="credito">Crédito</option>
                            <option value="inversion">Inversión</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired mt="4">
                        <FormLabel>Cantidad</FormLabel>
                        <Input type="number" onChange={(e) => setAmount(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormControl isRequired mt="4">
                        <FormLabel>Periodo (Meses)</FormLabel>
                        <Input type="number" onChange={(e) => setPeriod(parseInt(e.target.value, 10))} />
                    </FormControl>
                    <Button mt="4" type="submit">Calcular</Button>
                </form>

                {simulations.length > 0 && (
                    <Table variant="simple" mt="6">
                        <Thead>
                            <Tr>
                                <Th>Banco</Th>
                                <Th>Producto</Th>
                                <Th>{type === "credito" ? "CAT" : "Interés"}</Th>
                                <Th>{type === "credito" ? "Pago mensual" : "Interés mensual"}</Th>
                                <Th>Acción</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {simulations.map((simulation, index) => (
                                <Tr key={index}>
                                    <Td>{simulation.bank}</Td>
                                    <Td>{simulation.name}</Td>
                                    <Td>{simulation.apr.toFixed(2)}%</Td>
                                    <Td>${simulation.monthlyPayment.toFixed(2)}</Td>
                                    <Td>
                                        <Button size="sm" onClick={() => handleSave(simulation)} isDisabled={!user}>Guardar</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>

            {showLoginForm ? (
                <form onSubmit={handleLogin}>
                    <FormControl isRequired>
                        <FormLabel>Usuario</FormLabel>
                        <Input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired mt="4">
                        <FormLabel>Contraseña</FormLabel>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button mt="4" type="submit">Accessar</Button>
                </form>
            ) : (

                !user && <Center><Button bg='green' color='white' mt="4" onClick={() => setShowLoginForm(true)}>Para por guardar sus simulaciones por favor ingrese con su cuenta haciendo click en este mensaje</Button>
                </Center>)}
        </Box>
    );
};

export default Simulations;
