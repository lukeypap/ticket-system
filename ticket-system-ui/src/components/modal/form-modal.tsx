import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    Textarea,
} from "@chakra-ui/react";
import React, { ReactElement, useRef, useState } from "react";

interface Props {
    message: string;
    title: string;
    handleCreate: any;
    isOpen: boolean;
    onClose: () => void;
    icon: ReactElement;
}

const initialValues = {
    title: "",
    user: "",
    message: "",
};

export const FormModal = ({ message, title, handleCreate, isOpen, onClose, icon }: Props) => {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const fieldValue = { [name]: value };
        setValues({
            ...values,
            [name]: value,
        });
    };

    const initialRef = useRef();
    return (
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            value={values.title}
                            ref={initialRef}
                            placeholder="Title of your issue."
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>User</FormLabel>
                        <Input
                            name="user"
                            value={values.user}
                            placeholder="Your name."
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="message"
                            value={values.message}
                            placeholder="Write a short description of your issue..."
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            handleCreate(values);
                            onClose();
                            setValues(initialValues);
                        }}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
