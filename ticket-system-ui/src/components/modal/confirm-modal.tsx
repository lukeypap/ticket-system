import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    Text,
    Icon,
    useToast,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IoIosWarning } from "react-icons/io";

interface Props {
    message: string;
    title: string;
    onSubmit: any;
    isOpen: boolean;
    onClose: () => void;
    icon: ReactElement;
}

export const ConfirmModal = ({ message, title, onSubmit, isOpen, onClose, icon }: Props) => {
    const toast = useToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={2} pb={10}>
                    <VStack textAlign="center">
                        <Icon as={IoIosWarning} color="orange.300" w={32} h={32} />
                        <Text>{message}</Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={() => {
                            onSubmit();
                            onClose();
                            toast({
                                title: "Ticket Deleted.",
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                            });
                        }}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
