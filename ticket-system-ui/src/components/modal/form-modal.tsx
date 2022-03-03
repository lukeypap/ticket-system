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
    Select,
    useToast,
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
    priority: "low",
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

    const toast = useToast();

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
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="message"
                            value={values.message}
                            placeholder="Write a short description of your issue..."
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Priority</FormLabel>
                        <Select
                            name="priority"
                            onChange={handleInputChange}
                            value={values.priority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Select>
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
                            toast({
                                title: "Ticket Created",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        }}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
