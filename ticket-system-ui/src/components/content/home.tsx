import { HStack, VStack, Flex, Text, Divider, useDisclosure, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { create, deleteById, getAll, updateStatus } from "../../api/tickets";
import { PageHeader } from "../header";
import { ConfirmModal } from "../modal/confirm-modal";
import { FormModal } from "../modal/form-modal";
import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar/index";
import { MyTable } from "../table";
import { TicketCard } from "../table/ticket-card";
import { TicketTable } from "../table/ticket-table";

export const Content = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState(tickets);
    const [searchTerm, setSearchTerm] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalId, setModalId] = useState();
    const [lastCreatedTicket, setLastCreatedTicket] = useState();
    const {
        isOpen: isOpenCreateTicketModal,
        onOpen: onOpenCreateTicketModal,
        onClose: onCloseCreateTicketModal,
    } = useDisclosure();

    useEffect(() => {
        const getTickets = async () => {
            setTickets(await getAll());
        };
        getTickets();
    }, []);

    useEffect(() => {
        const getTickets = async () => {
            setTickets(await getAll());
        };
        getTickets();
    }, [lastCreatedTicket]);

    useEffect(() => {
        const newTickets = tickets.filter(
            (ticket) =>
                `${ticket.id}`.includes(searchTerm) ||
                ticket.title.toLowerCase().includes(searchTerm) ||
                ticket.user.toLowerCase().includes(searchTerm) ||
                ticket.status.toLowerCase().includes(searchTerm)
        );
        setFilteredTickets(newTickets);
    }, [searchTerm]);

    const handleDelete = () => {
        const ticket = deleteById(modalId);
        const newTickets = tickets.filter((ticket) => ticket.id !== modalId);
        setTickets(newTickets);
    };

    const handleCreate = async (values: Object) => {
        const ticket = await create(values);
        const newTickets = tickets;
        newTickets.unshift(ticket);
        setTickets(newTickets);
        setLastCreatedTicket(ticket);
    };

    const handleStatus = async (id: number, status: string) => {
        const ticket = await updateStatus(id, status);
        // const newTickets = tickets.filter((ticket) => ticket.id !== id);
        // newTickets.push(ticket);
        // setTickets(newTickets);
        const newTickets = tickets.map((ticket) => {
            if (ticket.id === id) {
                ticket.status = status;
                return ticket;
            } else {
                return ticket;
            }
        });
        setTickets(newTickets);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLocaleLowerCase());
    };

    return (
        <VStack
            width="full"
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
            <PageHeader
                onOpen={onOpenCreateTicketModal}
                title="Latest Tickets"
                handleSearchChange={handleSearchChange}
            />
            <TicketTable
                tickets={tickets}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                onOpen={onOpen}
                setModalId={setModalId}
                searchTerm={searchTerm}
                filteredTickets={filteredTickets}
            />
            <ConfirmModal
                message="Are you sure you wish to delete this? You can't undo this."
                title="Delete Ticket"
                isOpen={isOpen}
                onClose={onClose}
                icon={<IoWarning />}
                onSubmit={handleDelete}
            />
            <FormModal
                message="Please enter the info below"
                title="Create Ticket"
                isOpen={isOpenCreateTicketModal}
                onClose={onCloseCreateTicketModal}
                icon={<IoWarning />}
                handleCreate={handleCreate}
            />
        </VStack>
    );
};
