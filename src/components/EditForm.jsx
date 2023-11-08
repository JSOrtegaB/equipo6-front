import React from 'react';
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

const EditForm = ({ product, onClose }) => {
    // You will need to manage the form state and handle form submission

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Your form fields will go here */}
                    <FormControl>
                        <FormLabel>Bank</FormLabel>
                        <Input placeholder="Bank" defaultValue={product.bank} />
                        {/* Repeat for other fields */}
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Save Changes</Button>
                    {/* Add the functionality to save changes */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditForm;
