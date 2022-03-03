import { HStack, Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ITicket } from "../../types/ITicket";
import { TicketCard } from "./ticket-card";
import Link from "next/link";

interface Props {
    tickets: ITicket[];
    handleDelete: (id) => void;
    handleStatus: (id, status) => void;
    onOpen: () => void;
    setModalId: (id) => void;
    searchTerm: string;
    filteredTickets: ITicket[];
}

export const TicketTable = ({
    tickets,
    handleDelete,
    handleStatus,
    onOpen,
    setModalId,
    searchTerm,
    filteredTickets,
}: Props) => {
    return (
        <VStack pb={2} w="full" px={10}>
            <HStack
                mt={0}
                spacing={{ base: 4, "2xl": 12 }}
                p={5}
                w="full"
                letterSpacing={1}
                fontSize="xs"
                fontWeight="semibold"
                opacity="0.7"
                maxW="7xl"
            >
                <Box w="20px">
                    <Text>ID</Text>
                </Box>
                <Box w="200px">
                    <Text>TITLE</Text>
                </Box>
                <Box w="180px">
                    <Text>NAME</Text>
                </Box>
                <Box w="100px">
                    <Text>ASSIGNEE</Text>
                </Box>
                <Box w="150px">
                    <Text>STATUS</Text>
                </Box>
                <Box w="120px">
                    <Text>CREATED</Text>
                </Box>
                <Box>
                    <Text>ACTIONS</Text>
                </Box>
            </HStack>

            {searchTerm ? (
                filteredTickets.map((ticket, id) => (
                    <TicketCard
                        key={id}
                        ticket={ticket}
                        handleStatus={handleStatus}
                        onOpen={onOpen}
                        handleDelete={handleDelete}
                        setModalId={setModalId}
                    />
                ))
            ) : tickets ? (
                tickets.map((ticket, id) => (
                    <TicketCard
                        key={id}
                        ticket={ticket}
                        handleStatus={handleStatus}
                        onOpen={onOpen}
                        handleDelete={handleDelete}
                        setModalId={setModalId}
                    />
                ))
            ) : (
                <p>Unauth</p>
            )}
        </VStack>
    );
};
