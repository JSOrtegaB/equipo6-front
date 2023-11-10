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
    Input
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
            console.log("lo que se envia", newProduct);
            const response = await axios.post('https://moneyedwren.backendless.app/api/data/products', { ...newProduct, apr: parseInt(newProduct.apr) });
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
                <ModalHeader>Add New Product</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Bank</FormLabel>
                            <Input name="bank" value={newProduct.bank} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={newProduct.name} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Type</FormLabel>
                            <Input name="type" value={newProduct.type} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>APR</FormLabel>
                            <Input name="apr" value={newProduct.apr} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Add Product
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddNewProductForm;
