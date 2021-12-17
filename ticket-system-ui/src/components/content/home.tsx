import { VStack, Flex, useDisclosure, Spinner, Text } from "@chakra-ui/react";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { create, deleteById, getAll, updateStatus } from "../../api/tickets";
import { PageHeader } from "../header";
import { ConfirmModal } from "../modal/confirm-modal";
import { FormModal } from "../modal/form-modal";
import { TicketTable } from "../table/ticket-table";

export const Content = () => {
    const jwt = {
        token: "",
    };
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            jwt.token = localStorage.getItem("token");
        }
    }
    const { data, isLoading, error, isError } = useQuery(["getAll", jwt.token], () =>
        getAll(jwt.token)
    );
    const { isLoading: mutationLoading, mutate: createTicket } = useMutation(create, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAll");
        },
    });
    const { mutate: deleteTicket } = useMutation(deleteById, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAll");
        },
    });
    const { mutate: updateTicketStatus } = useMutation(updateStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAll");
        },
    });

    const [filteredTickets, setFilteredTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalId, setModalId] = useState();
    const {
        isOpen: isOpenCreateTicketModal,
        onOpen: onOpenCreateTicketModal,
        onClose: onCloseCreateTicketModal,
    } = useDisclosure();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data) {
            const newTickets = data.data.tickets.filter(
                (ticket) =>
                    `${ticket.id}`.includes(searchTerm) ||
                    ticket.title.toLowerCase().includes(searchTerm) ||
                    ticket.user.firstName.toLowerCase().includes(searchTerm) ||
                    ticket.status.toLowerCase().includes(searchTerm)
            );
            setFilteredTickets(newTickets);
        }
    }, [searchTerm]);

    const handleDelete = () => {
        deleteTicket(modalId);
    };

    const handleCreate = async (values: Object) => {
        createTicket({ values: values, token: jwt.token });
    };

    const handleStatus = async (id: number, status: string) => {
        updateTicketStatus({ id: id, status: status });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLocaleLowerCase());
    };

    if (isLoading) {
        return (
            <Flex alignItems="center" justifyContent="center" w="full" h="full">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Flex>
        );
    }

    if (isError || !data) {
        return (
            <Text pt={10} fontWeight="light">
                An Error occured.
            </Text>
        );
    }

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
                title={`Welcome ${data.data.user.firstName}`}
                handleSearchChange={handleSearchChange}
                addText={"Here's the most recent tickets..."}
                renderSearchBar={true}
            />
            {isLoading ? (
                <Text>LOADING...</Text>
            ) : (
                <TicketTable
                    tickets={data.data.tickets}
                    handleDelete={handleDelete}
                    handleStatus={handleStatus}
                    onOpen={onOpen}
                    setModalId={setModalId}
                    searchTerm={searchTerm}
                    filteredTickets={filteredTickets}
                />
            )}

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
