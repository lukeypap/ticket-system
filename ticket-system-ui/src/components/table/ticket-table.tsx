import { HStack, Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ITicket } from "../../types/ITicket";
import { TicketCard } from "./ticket-card";

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
                spacing={5}
                p={5}
                w="full"
                letterSpacing={1}
                fontSize="xs"
                fontWeight="semibold"
                opacity="0.7"
            >
                <Box w="20px">
                    <Text>ID</Text>
                </Box>
                <Box w="200px">
                    <Text>TITLE</Text>
                </Box>
                <Box w="100px">
                    <Text>NAME</Text>
                </Box>
                <Box w="150px">
                    <Text>STATUS</Text>
                </Box>
                <Box w="160px">
                    <Text>LAST UPDATED</Text>
                </Box>
                <Box>
                    <Text>ACTIONS</Text>
                </Box>
            </HStack>
            {searchTerm
                ? filteredTickets.map((ticket) => (
                      <TicketCard
                          ticket={ticket}
                          handleStatus={handleStatus}
                          onOpen={onOpen}
                          handleDelete={handleDelete}
                          setModalId={setModalId}
                      />
                  ))
                : tickets.map((ticket) => (
                      <TicketCard
                          ticket={ticket}
                          handleStatus={handleStatus}
                          onOpen={onOpen}
                          handleDelete={handleDelete}
                          setModalId={setModalId}
                      />
                  ))}
        </VStack>
    );
};