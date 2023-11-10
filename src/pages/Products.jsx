import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import EditForm from '../components/EditForm';
import AddNewProductForm from '../components/AddNewProductForm';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

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

    const closeEditForm = () => {
        setSelectedProduct(null);
    };

    const onProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
        setIsAddingNew(false);
    };

    const handleAddNewClick = () => {
        setIsAddingNew(true);
    };

    const closeAddForm = () => {
        setIsAddingNew(false);
    };

    const renderTable = () => (
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
                    <Tr key={product.objectId}>
                        <Td>{product.bank}</Td>
                        <Td>{product.name}</Td>
                        <Td>{product.type}</Td>
                        <Td isNumeric>{product.apr}</Td>
                        <Td>
                            <Button size="sm" mr="2" onClick={() => handleEditClick(product)}>Edit</Button>
                            <Button size="sm" colorScheme="red" onClick={() => handleDelete(product.objectId)}>Delete</Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );

    return (
        <Box p="4">
            <Box display="flex" justifyContent="flex-end" mb="4">
                <IconButton
                    icon={<AddIcon />}
                    onClick={handleAddNewClick}
                    aria-label="Add New Product"
                />
            </Box>
            {isAddingNew ? (
                <AddNewProductForm onClose={closeAddForm} onProductAdded={onProductAdded} />
            ) : selectedProduct ? (
                <EditForm product={selectedProduct} onClose={closeEditForm} />
            ) : (
                renderTable()
            )}
        </Box>
    );
};

export default Products;
