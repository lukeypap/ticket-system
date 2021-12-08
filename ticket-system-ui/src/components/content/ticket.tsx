import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import { getById, updateStatus } from "../../api/tickets";
import { ITicket } from "../../types/ITicket";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";
import { ErrorBoundary } from "../error-bound/ErrorBoundry";
import { CommentCard } from "../comment-card";
interface Props {
    id: any;
}

const initialValues: ITicket = {
    id: -1,
    title: "",
    user: "",
    message: "",
    status: "",
    isOpen: undefined,
    createdAt: "",
    updatedAt: "",
    comments: [],
};

export const Ticket = ({ id }: Props) => {
    const [ticket, setTicket] = useState(initialValues);
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        const getTicket = async () => {
            //Hacky fix find work around or better solution to guarantee url
            if (!id) {
                const windowUrl = window.location.href;
                const newId = windowUrl.substring(29);
                setTicket(await getById(parseInt(newId)));
                //http://localhost:3000/ticket/83
            } else {
                setTicket(await getById(id));
            }
        };
        getTicket();
    }, []);

    const handleStatus = async (id: number, status: string) => {
        const ticket = await updateStatus(id, status);
        console.log(await ticket);
        setTicket(await ticket);
    };

    return (
        <>
            <PageHeader title={`Ticket ${id}`} />
            <Box w="full" h="full">
                <VStack
                    w="90%"
                    h="full"
                    bg={colorMode === "light" ? "white" : "gray.700"}
                    borderRadius="lg"
                    boxShadow="md"
                    my={5}
                    margin="auto"
                >
                    <HStack pt={10} w="full" pl={10} pr={10} justifyContent="space-between">
                        <Heading>{ticket.title}</Heading>
                        <Dropdown
                            ticket={ticket}
                            color={chooseLabelColor(ticket)}
                            handleStatus={handleStatus}
                            size="md"
                        />
                    </HStack>
                    <p>{ticket.message}</p>
                    <p>{ticket.user}</p>
                    <p>{ticket.createdAt}</p>
                    <p>{ticket.updatedAt}</p>
                    {typeof ticket.comments !== "undefined" ? (
                        ticket.comments.map((comment, idx) => (
                            <VStack key={comment.id}>
                                <CommentCard comment={comment} />
                            </VStack>
                        ))
                    ) : (
                        <p>No comments to display!</p>
                    )}
                </VStack>
            </Box>
        </>
    );
};
