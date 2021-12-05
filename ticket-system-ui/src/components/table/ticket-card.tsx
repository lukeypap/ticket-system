import Link from "next/link";
import { Flex, Box, Badge, Text, HStack, Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import { ITicket } from "../../types/ITicket";
import { formatDate } from "../../utils/formatDate";
import { Dropdown } from "../dropdown";

interface Props {
    ticket: ITicket;
    handleDelete: (id) => void;
    handleStatus: (id, status) => void;
    onOpen: () => void;
    setModalId: (id) => void;
}

export const TicketCard = ({ ticket, handleStatus, handleDelete, onOpen, setModalId }: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const chooseLabelColor = (ticket) => {
        if (ticket.status === "done") {
            return "green";
        } else if (ticket.status === "work in progress") {
            return "blue";
        } else if (ticket.status === "open") {
            return "gray";
        } else if (ticket.status === "cancelled") {
            return "red";
        }
    };
    return (
        <Flex
            boxShadow="md"
            p={3}
            py={4}
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            borderRadius="md"
            w="full"
            borderLeft="8px"
            opacity="0.8"
            borderLeftColor={`${chooseLabelColor(ticket)}.400`}
            _hover={{
                bg: `${colorMode === "light" ? "white" : "gray.600"}`,
                transition: "transform 0.2s",
                transform: "scale(1.005)",
                opacity: 1,
            }}
        >
            <HStack spacing={5} fontSize="sm">
                <Box w="15px">
                    <Text fontSize="xs">{ticket.id}</Text>
                </Box>
                <Box w="200px">
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
                <Box w="140px">
                    <Text>{ticket.user}</Text>
                    <Text
                        fontWeight="light"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        fontSize="xs"
                        opacity="0.8"
                    >
                        test@gmail.com
                    </Text>
                </Box>
                <Box w="150px">
                    <Dropdown
                        color={chooseLabelColor(ticket)}
                        ticket={ticket}
                        handleStatus={handleStatus}
                    />
                </Box>
                <Box w="130px" fontSize="xs">
                    <Text>{formatDate(ticket.createdAt)}</Text>
                </Box>
                <Box>
                    <Flex justifyContent="center" alignItems="center">
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
