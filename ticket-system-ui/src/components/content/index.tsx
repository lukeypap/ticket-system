import { HStack, VStack, Flex, Text, Divider, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { deleteById, getAll, updateStatus } from "../../api/tickets";
import { PageHeader } from "../header";
import { ConfirmModal } from "../modal";
import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar/index";
import { MyTable } from "../table";

export const Content = () => {
    const [tickets, setTickets] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalId, setModalId] = useState();

    useEffect(() => {
        const getTickets = async () => {
            setTickets(await getAll());
        };
        getTickets();
    }, []);

    const handleDelete = () => {
        const ticket = deleteById(modalId);
        const newTickets = tickets.filter((ticket) => ticket.id !== modalId);
        setTickets(newTickets);
        return ticket;
    };

    const handleCheck = async (id: number) => {
        const ticket = await updateStatus(id, "done");
        const newTickets = tickets.filter((ticket) => ticket.id !== id);
        newTickets.push(ticket);
        setTickets(newTickets);
        return ticket;
    };

    return (
        <HStack width="full" flex={1} overflow="hidden">
            <Sidebar />
            <VStack width="full" height="full" style={{ marginInlineStart: "0px" }}>
                <Navbar />
                <VStack pt={8} width="full" height="full" spacing={4} overflow="hidden">
                    <PageHeader />
                    <Divider />
                    <VStack
                        width="full"
                        p={14}
                        overflow="auto"
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                                borderRadius: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "brand.red",
                            },
                        }}
                    >
                        <MyTable
                            tickets={tickets}
                            handleDelete={handleDelete}
                            handleCheck={handleCheck}
                            onOpen={onOpen}
                            setModalId={setModalId}
                        />
                        <ConfirmModal
                            message="Are you sure you wish to delete this? You can't undo this."
                            title="Delete Ticket"
                            isOpen={isOpen}
                            onClose={onClose}
                            icon={<IoWarning />}
                            onSubmit={handleDelete}
                        />
                    </VStack>
                </VStack>
            </VStack>
        </HStack>
    );
};
