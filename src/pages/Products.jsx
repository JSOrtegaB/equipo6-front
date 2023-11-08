import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://moneyedwren.backendless.app/api/data/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Inside Products component

    const handleDelete = async (objectId) => {
        try {
            await axios.delete(`https://moneyedwren.backendless.app/api/data/products/${objectId}`);
            setProducts(products.filter(product => product.objectId !== objectId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    // Update the Actions column in the renderTable function
    <Td>
        <Button size="sm" mr="2" onClick={() => handleEditClick(product)}>Edit</Button>
        <Button size="sm" colorScheme="red" onClick={() => handleDelete(product.objectId)}>Delete</Button>
    </Td>


    // Inside Products component

    const closeEditForm = () => {
        setSelectedProduct(null);
    };

    // Pass the onClose prop to the EditForm component
    { selectedProduct ? <EditForm product={selectedProduct} onClose={closeEditForm} /> : renderTable() }

    // Inside Products component, after the useEffect hook

    const renderTable = () => {
        return (
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Bank</Th>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th isNumeric>APR</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map(product => (
                        <Tr key={product.objectId} onClick={() => setSelectedProduct(product)}>
                            <Td>{product.bank}</Td>
                            <Td>{product.name}</Td>
                            <Td>{product.type}</Td>
                            <Td isNumeric>{product.apr}</Td>
                            <Td>
                                <Button size="sm" mr="2">Edit</Button>
                                <Button size="sm" colorScheme="red">Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    };

    return (
        <Box p="4">
            {selectedProduct ? <EditForm product={selectedProduct} /> : renderTable()}
        </Box>
    );

};

export default Products;