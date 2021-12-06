import { HStack, VStack, Flex, Text, Divider, useDisclosure, Box, Heading } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { setUncaughtExceptionCaptureCallback } from "process";
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
    //hacky initial load fix...
    const [tickets, setTickets] = useState([
        {
            id: -1,
            title: "title",
            user: "user",
            message: "message",
            status: "status",
            priority: "priority",
            createdAt: "2021-12-04T20:46:33.987Z",
            updatedAt: "2021-12-04T20:46:33.987Z",
            comments: [
                {
                    id: -1,
                    message: "message",
                    createdAt: "2021-12-04T20:46:33.987Z",
                },
            ],
        },
    ]);
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
    const jwt = {
        token: "",
    };
    const [currentUser, setCurrentUser] = useState({ firstName: "" });
    const router = useRouter();

    useEffect(() => {
        const getTickets = async () => {
            jwt.token = localStorage.getItem("token");
            const data = await getAll(jwt.token);
            if (data.tickets) {
                setTickets(data.tickets);
                setCurrentUser(data.user);
            } else {
                router.push("/login");
            }
        };
        getTickets();
    }, []);

    useEffect(() => {
        const getTickets = async () => {
            const data = await getAll(jwt.token);
            setTickets(data.tickets);
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
                title={`Welcome ${currentUser.firstName}`}
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
