import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Input } from '@chakra-ui/react';
import axios from 'axios';
import { monthlyPaymentFormula, interestEarnedFormula } from '../formulas';

const SimulationsTable = () => {
    const [simulations, setSimulations] = useState([]);

    useEffect(() => {
        const fetchSimulations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/simulations`);
                setSimulations(response.data);
            } catch (error) {
                console.error('Error fetching simulations:', error);
            }
        };

        fetchSimulations();
    }, []);

    const handleDelete = async (simulationObjId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/simulations/${simulationObjId}`);
            setSimulations(simulations.filter(simulation => simulation.objectId !== simulationObjId));
        } catch (error) {
            console.error('Error deleting simulation:', error);
        }
    };

    const handleAmountChange = (event, simulationId) => {
        const newSimulations = simulations.map(simulation => {
            if (simulation.simulationId === simulationId) {
                return {
                    ...simulation,
                    amount: event.target.value,
                    monthly_rate: monthlyPaymentFormula(simulation.apr, simulation.amount, simulation.period),
                };
            } else {
                return simulation;
            }
        });
        setSimulations(newSimulations);
    };

    const handlePeriodChange = (event, simulationId) => {
        const newSimulations = simulations.map(simulation => {
            if (simulation.simulationId === simulationId) {
                return {
                    ...simulation,
                    period: event.target.value,
                    monthly_rate: monthlyPaymentFormula(simulation.apr, simulation.amount, simulation.period),
                };
            } else {
                return simulation;
            }
        });
        setSimulations(newSimulations);
    };

    const handleSave = async (simulation) => {
        const body = {
            apr: parseFloat(simulation.apr),
            amount: parseInt(simulation.amount),
            product: simulation.product,
            period: parseInt(simulation.period),
            type: simulation.type,
            monthly_rate: parseFloat(simulation.monthly_rate),
            bank: simulation.bank,
        };
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/simulations/${simulation.objectId}`, body);
        } catch (error) {
            console.error('Error updating simulation:', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatCurrency = (amount, locale = 'en-US', currency = 'MXN') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    return (
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Creado</Th>
                        <Th>Banco</Th>
                        <Th>Producto</Th>
                        <Th>Tipo</Th>
                        <Th>Interés</Th>
                        <Th>Cantidad</Th>
                        <Th>Periodo</Th>
                        <Th>Importe Mensual</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {simulations.map(simulation => (
                        <Tr key={simulation.simulationId}>
                            <Td>{formatDate(simulation.created)}</Td>
                            <Td>{simulation.bank}</Td>
                            <Td>{simulation.product}</Td>
                            <Td>{simulation.type}</Td>
                            <Td>{simulation.apr}</Td>
                            <Td>
                                <Input type="number" value={simulation.amount} onChange={(event) => handleAmountChange(event, simulation.simulationId)} />
                            </Td>
                            <Td>
                                <Input type="number" value={simulation.period} onChange={(event) => handlePeriodChange(event, simulation.simulationId)} />
                            </Td>
                            <Td>{formatCurrency(simulation.monthly_rate)}</Td>
                            <Td>
                                <Button colorScheme="blue" mr={3} onClick={() => handleSave(simulation)}>
                                    Guardar
                                </Button>
                                <Button colorScheme="red" onClick={() => handleDelete(simulation.objectId)}>
                                    Borrar
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default SimulationsTable;
