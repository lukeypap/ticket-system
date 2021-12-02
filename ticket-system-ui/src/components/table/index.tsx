import {
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Flex,
    Button,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ITicket } from "../../types/ITicket";
import { BsCheckLg } from "react-icons/bs";
import { formatDate } from "../../utils/formatDate";

interface Props {
    tickets: ITicket[];
    handleDelete: (id) => {};
    handleCheck: (id) => {};
    onOpen: () => void;
    setModalId: (id) => void;
}

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

export const MyTable = ({ tickets, handleCheck, onOpen, setModalId }: Props) => {
    return (
        <>
            <Table variant="simple">
                <TableCaption>All Tickets</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th>Status</Th>
                        <Th>User</Th>
                        <Th>Last Updated</Th>
                        <Th textAlign="center">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tickets &&
                        tickets.map((ticket) => {
                            return (
                                <Tr
                                    onClick={() => {
                                        console.log(ticket.id);
                                    }}
                                >
                                    <Td>{ticket.id}</Td>
                                    <Td>{ticket.title}</Td>
                                    <Td>
                                        <Button
                                            colorScheme={chooseLabelColor(ticket)}
                                            size="sm"
                                            textTransform="uppercase"
                                            fontSize="xs"
                                            _focus={{}}
                                            _active={{}}
                                            _hover={{ cursor: "default" }}
                                        >
                                            {ticket.status}
                                        </Button>
                                    </Td>
                                    <Td>{ticket.user}</Td>
                                    <Td>{formatDate(ticket.updatedAt)}</Td>
                                    <Td>
                                        <Flex justifyContent="center">
                                            <Button
                                                size="xs"
                                                mx={1}
                                                colorScheme="yellow"
                                                variant="ghost"
                                            >
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
                                                onClick={() => handleCheck(ticket.id)}
                                                aria-label="Done"
                                                isDisabled={ticket.status === "done"}
                                            >
                                                <BsCheckLg />
                                            </Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            );
                        })}
                </Tbody>
            </Table>
        </>
    );
};
