import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

const Simulations = () => {
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('credit');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [simulations, setSimulations] = useState([]);

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

    const calculatePayments = () => {
        // Filter products where type is 'credit'
        const filteredProducts = products.filter(product => product.type === 'credito');

        return filteredProducts.map(product => {
            const monthlyRate = product.apr / 1200; // Convert APR to a monthly rate
            const totalPayments = period; // Total number of monthly payments
            const presentValue = amount; // Loan amount

            // Calculate monthly payment using the compound interest formula
            const monthlyPayment = monthlyRate * presentValue / (1 - Math.pow(1 + monthlyRate, -totalPayments));

            return { ...product, monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment };
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'credit') {
            const calculatedSimulations = calculatePayments();
            setSimulations(calculatedSimulations);
        }        // For investments, add your calculation logic
    };

    const handleSave = async (simulation) => {
        try {
            await axios.post('https://your-api-url/simulation', simulation);
            // Handle post success (e.g., show message or update state)
        } catch (error) {
            console.error('Error saving simulation:', error);
        }
    };

    return (
        <Box p="4">
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select onChange={(e) => setType(e.target.value)}>
                        <option value="credito">Credito</option>
                        <option value="inversion">Inversion</option>
                    </Select>
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel>Amount</FormLabel>
                    <Input type="number" onChange={(e) => setAmount(parseFloat(e.target.value))} />
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel>Period (Months)</FormLabel>
                    <Input type="number" onChange={(e) => setPeriod(parseInt(e.target.value, 10))} />
                </FormControl>
                <Button mt="4" type="submit">Calculate</Button>
            </form>
            {simulations.length > 0 && (
                <Table variant="simple" mt="6">
                    <Thead>
                        <Tr>
                            <Th>Bank</Th>
                            <Th>Name</Th>
                            <Th>APR</Th>
                            <Th>Monthly Payment</Th>
                            <Th>Action</Th>
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
                                    <Button size="sm" onClick={() => handleSave(simulation)}>Save</Button>
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
