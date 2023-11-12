import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import axios from 'axios';

const EditForm = ({ product, onClose, onSaveEditData }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${editedProduct.objectId}`,
                { bank: editedProduct.bank, name: editedProduct.name, type: editedProduct.type, apr: parseFloat(editedProduct.apr) });
            console.log(response.data);
            onSaveEditData(response.data);
            onClose(); // close the form upon successful edit
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Box p="4">
            <FormControl id="bank" mb="4">
                <FormLabel>Banco</FormLabel>
                <Input name="bank" type="text" value={editedProduct.bank} onChange={handleChange} />
            </FormControl>
            <FormControl id="name" mb="4">
                <FormLabel>Producto</FormLabel>
                <Input name="name" type="text" value={editedProduct.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="type" mb="4">
                <FormLabel>Tipo</FormLabel>
                <Input name="type" type="text" value={editedProduct.type} onChange={handleChange} />
            </FormControl>
            <FormControl id="apr" mb="4">
                <FormLabel>Interés Anual</FormLabel>
                <Input name="apr" type="number" value={editedProduct.apr} onChange={handleChange} />
            </FormControl>
            <Button colorScheme="blue" mr="4" onClick={handleSubmit}>Guardar</Button>
            <Button onClick={onClose}>Cancelar</Button>
        </Box>
    );
};

export default EditForm;
