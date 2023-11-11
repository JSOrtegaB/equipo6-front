import React from 'react';
import { Box, Heading, Text, SimpleGrid, Image, Divider, List, ListItem, UnorderedList, } from '@chakra-ui/react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const bankLogos = [
    require('../assets/BBVA.png'),
    require('../assets/Santander.png'),
    require('../assets/Citibank.png'),
    require('../assets/HSBC.png'),
    require('../assets/IXE.png'),
    require('../assets/Inbursa.png'),



];

const FinancialEducationPortal = () => {
    return (
        <Box p={5}>
            <Heading as="h1" size="xl" mb={4}>
                Portal de educación financiera
            </Heading>

            <Text fontSize="lg" mb={4}>
                Este portal ayuda a entender las diferentes opciones financieras existentes en el mercado,
                comparando créditos e inversiones. Además, permite simular comparativos de inversión o crédito
                de los diferentes bancos.
            </Text>

            <Heading as="h2" size="lg" mb={4}>
                Bancos Participantes
            </Heading>

            <SimpleGrid columns={3} spacing={5} mb={4}>
                {bankLogos.map((logo, index) => (
                    <Image key={index} src={logo} alt={`Logo del banco ${index + 1}`} />
                ))}
            </SimpleGrid>

            <Divider my={5} />

            <Heading as="h2" size="lg" mb={4}>
                Intereses Compuestos
            </Heading>

            <Text fontSize="lg">
                Los intereses compuestos se calculan con la fórmula:

            </Text>
            <Box my={1}>
                <BlockMath>
                    {"A = P(1 + \\frac{r}{n})^{nt}"}
                </BlockMath>
            </Box>

            Donde:
            <List spacing={3}>
                <UnorderedList>
                    <ListItem><strong>A</strong> es el monto futuro</ListItem>
                    <ListItem><strong>P</strong> es el principal (inversión inicial)</ListItem>
                    <ListItem><strong>r</strong> es la tasa de interés anual</ListItem>
                    <ListItem><strong>n</strong> es el número de veces que se capitaListItemza el interés por año</ListItem>
                    <ListItem><strong>t</strong> es el número de años</ListItem>
                </UnorderedList>
            </List>

        </Box>
    );
};

export default FinancialEducationPortal;
