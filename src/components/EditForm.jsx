// src/components/EditForm.js
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

const EditForm = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        bank: product.bank,
        name: product.name,
        type: product.type,
        apr: product.apr,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://moneyedwren.backendless.app/api/data/products/${product.objectId}`, formData);
            onClose(); // Close the form
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Box p="4">
            <form onSubmit={handleSubmit}>
                <FormControl id="bank" isRequired>
                    <FormLabel>Bank</FormLabel>
                    <Input name="bank" value={formData.bank} onChange={handleChange} />
                </FormControl>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" value={formData.name} onChange={handleChange} />
                </FormControl>
                <FormControl id="type">
                    <FormLabel>Type</FormLabel>
                    <Input name="type" value={formData.type} onChange={handleChange} />
                </FormControl>
                <FormControl id="apr" isRequired>
                    <FormLabel>APR</FormLabel>
                    <Input name="apr" type="number" value={formData.apr} onChange={handleChange} />
                </FormControl>
                <Button mt="4" colorScheme="blue" type="submit">Update Product</Button>
            </form>
        </Box>
    );
};



export default EditForm;
