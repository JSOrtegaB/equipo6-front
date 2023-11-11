import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select  // Import Select from Chakra UI
} from '@chakra-ui/react';
import axios from 'axios';

const AddNewProductForm = ({ onClose, onProductAdded }) => {
    const [newProduct, setNewProduct] = useState({
        bank: '',
        name: '',
        type: '',
        apr: ''
    });

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { ...newProduct, apr: parseFloat(newProduct.apr) };
            console.log("lo que se envia", body);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, body);
            onProductAdded(response.data); // Update the product list in parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Agrega un nuevo Producto</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Banco</FormLabel>
                            <Input name="bank" value={newProduct.bank} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Nombre</FormLabel>
                            <Input name="name" value={newProduct.name} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Tipo</FormLabel>
                            <Select name="type" value={newProduct.type} onChange={handleChange}>
                                <option value="">Seleccione un tipo</option>
                                <option value="credito">Crédito</option>
                                <option value="inversion">Inversión</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Interés Anual</FormLabel>
                            <Input name="apr" value={newProduct.apr} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Agrega Producto
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddNewProductForm;
