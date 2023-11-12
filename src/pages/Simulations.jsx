import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { calculatePayments, calculateEarnings } from '../formulas';

const Simulations = () => {
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('credito');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [simulations, setSimulations] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch products initially
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
            console.log("Entro a calcular inversion");
            const calculateEarningspayments = calculateEarnings(products, amount, period);
            setSimulations(calculateEarningspayments);
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
            user: user ? user : "anonimo"
        }
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/simulations`, body);
        } catch (error) {
            console.error('Error saving simulation:', error);
        }
    };

    return (
        <Box p="4">
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Tipo</FormLabel>
                    <Select onChange={(e) => setType(e.target.value)}>
                        <option value="credito">Credito</option>
                        <option value="inversion">Inversion</option>
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
                            <Th>{type === "credito" ? "CAT" : "Interes"}</Th>
                            <Th>{type === "credito" ? "Pago mensual" : "Interes mensual"}</Th>
                            <Th>Accion</Th>
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
                                    <Button size="sm" onClick={() => handleSave(simulation)}>Guardar</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default Simulations;
