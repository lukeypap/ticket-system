import Link from "next/link";
import { Flex, Box, Text, HStack, Button, useColorMode, Avatar, VStack } from "@chakra-ui/react";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ITicket } from "../../types/ITicket";
import { formatDate } from "../../utils/formatDate";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";

interface Props {
    ticket: ITicket;
    handleDelete: (id) => void;
    handleStatus: (id, status) => void;
    onOpen: () => void;
    setModalId: (id) => void;
}

export const TicketCard = ({ ticket, handleStatus, handleDelete, onOpen, setModalId }: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            boxShadow="md"
            p={3}
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            borderRadius="md"
            w="full"
            maxW="7xl"
            borderLeft="8px"
            opacity="0.8"
            borderLeftColor={`${chooseLabelColor(ticket)}.400`}
            _hover={{
                bg: `${colorMode === "light" ? "white" : "gray.600"}`,
                transition: "transform 0.2s",
                transform: "scale(1.005)",
                opacity: 1,
            }}
            justifyContent="space-between"
        >
            <HStack spacing={{ base: 5, "2xl": 12 }} fontSize="sm">
                <Box w="15px" overflow="hidden">
                    <Text fontSize="xs">{ticket.id}</Text>
                </Box>
                <Box w="200px" overflow="hidden">
                    <Text
                        fontWeight="semibold"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                    >
                        {ticket.title}
                    </Text>
                    <Text
                        fontWeight="light"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        fontSize="xs"
                        opacity="0.8"
                    >
                        {ticket.message ? ticket.message : "Empty description..."}
                    </Text>
                </Box>
                <Box w="180px">
                    <VStack w="full" alignItems="start">
                        <HStack pb={1}>
                            <Avatar name={ticket.user} size="xs" />
                            <Text>{ticket.user}</Text>
                        </HStack>
                        <Text
                            fontWeight="light"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            fontSize="xs"
                            opacity="0.8"
                            style={{ marginTop: "0px" }}
                        >
                            test@gmail.com
                        </Text>
                    </VStack>
                </Box>
                <Box w="150px">
                    <Dropdown
                        color={chooseLabelColor(ticket)}
                        ticket={ticket}
                        handleStatus={handleStatus}
                        size="xs"
                    />
                </Box>
                <Box w="80px" fontSize="xs">
                    <Text>{formatDate(ticket.createdAt)}</Text>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button size="xs" mx={1} colorScheme="yellow" variant="ghost">
                            <FaEdit />
                        </Button>
                        <Button
                            size="xs"
                            mx={1}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => {
                                onOpen();
                                setModalId(ticket.id);
                            }}
                        >
                            <FaTrash />
                        </Button>
                        <Button
                            size="xs"
                            mx={1}
                            colorScheme="green"
                            variant="ghost"
                            onClick={() => handleStatus(ticket.id, "done")}
                            aria-label="Done"
                            isDisabled={ticket.status === "done"}
                        >
                            <BsCheckLg />
                        </Button>
                        <Link
                            href={{
                                pathname: "/ticket/[id]",
                                query: { id: ticket.id },
                            }}
                        >
                            <Button
                                alignItems="center"
                                fontSize="0.7rem"
                                mx={4}
                                textTransform="uppercase"
                                colorScheme="blue"
                                color="blue.500"
                                variant="ghost"
                                letterSpacing={1}
                                aria-label="Done"
                                size="sm"
                            >
                                details
                            </Button>
                        </Link>
                    </Flex>
                </Box>
            </HStack>
        </Flex>
    );
};
