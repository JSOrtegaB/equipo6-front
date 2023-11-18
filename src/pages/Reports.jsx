import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
    const [investmentData, setInvestmentData] = useState({ datasets: [] });
    const [creditData, setCreditData] = useState({ datasets: [] });

    useEffect(() => {
        const fetchSimulations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/simulations`);
                processData(response.data);
            } catch (error) {
                console.error('Error fetching simulations:', error);
            }
        };

        const processData = (data) => {
            let investmentDatasets = {};
            let creditDatasets = {};

            data.forEach(simulation => {
                if (simulation.type === 'inversion') {
                    investmentDatasets[simulation.product] = investmentDatasets[simulation.product] || [];
                    for (let month = 1; month <= simulation.period; month++) {
                        let total = calculateCompoundInterest(simulation.amount, simulation.apr, month / 12);
                        investmentDatasets[simulation.product].push({ x: month, y: total });
                    }
                } else {
                    creditDatasets[simulation.product] = creditDatasets[simulation.product] || [];
                    for (let month = 1; month <= simulation.period; month++) {
                        let totalPayment = calculateCreditPayment(simulation.amount, simulation.apr, simulation.period, month);
                        creditDatasets[simulation.product].push({ x: month, y: totalPayment });
                    }
                }
            });

            setInvestmentData(formatChartData(investmentDatasets));
            setCreditData(formatChartData(creditDatasets));
        };

        fetchSimulations();
    }, []);

    const calculateCompoundInterest = (principal, annualRate, timeYears) => {
        const rate = annualRate / 100;
        return principal * Math.pow((1 + rate / 12), 12 * timeYears);
    };

    const calculateCreditPayment = (principal, annualRate, totalMonths, currentMonth) => {
        const monthlyRate = annualRate / 100 / 12;
        const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        return payment * currentMonth; // Total payment until the current month
    };

    const formatChartData = (data) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        let datasets = [];
        let i = 0;

        for (const product in data) {
            datasets.push({
                label: product,
                data: data[product],
                fill: false,
                backgroundColor: colors[i % colors.length],
                borderColor: colors[i % colors.length]
            });
            i++;
        }

        return { datasets };
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Periodo (Meses)'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfica de simulaciones',
            },
        },
    };

    return (
        <>
            <Heading >Reporte de Inversión</Heading>
            <Line options={chartOptions} data={investmentData} />

            <Heading>Reporte de Crédito</Heading>
            <Line options={chartOptions} data={creditData} />
        </>
    );
}

export default Reports;
