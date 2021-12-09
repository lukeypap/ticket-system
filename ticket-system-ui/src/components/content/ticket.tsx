import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import { createComment, getById, updateStatus } from "../../api/tickets";
import { ITicket } from "../../types/ITicket";
import { Box, Divider, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";
import { ErrorBoundary } from "../error-bound/ErrorBoundry";
import { CommentCard } from "../comment/comment-card";
import { CommentBox } from "../comment/comment-box";
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
    const [comment, setComment] = useState({ message: "" });

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
        setTicket(await ticket);
    };

    const handlePost = async () => {
        const token = localStorage.getItem("token");
        const ticket = await createComment(id, token, comment);
        setTicket(await ticket);
    };

    return (
        <>
            <PageHeader title={`Ticket ${id}`} renderSearchBar={false} />
            <Box w="full" h="full">
                <VStack
                    w="90%"
                    maxW="1280px"
                    h="full"
                    bg={colorMode === "light" ? "white" : "gray.700"}
                    borderRadius="lg"
                    boxShadow="md"
                    my={5}
                    margin="auto"
                >
                    <HStack pt={10} w="full" pl={10} pr={10} pb={5} justifyContent="space-between">
                        <Heading fontSize="2xl" fontWeight="md" opacity="0.8">
                            {ticket.title}
                        </Heading>
                        <Dropdown
                            ticket={ticket}
                            color={chooseLabelColor(ticket)}
                            handleStatus={handleStatus}
                            size="sm"
                        />
                    </HStack>
                    <Divider w="94%" />
                    <p>{ticket.message}</p>
                    <p>{ticket.user}</p>
                    <p>{ticket.createdAt}</p>
                    <p>{ticket.updatedAt}</p>
                    <Divider w="94%" />
                    <VStack w="75%">
                        {typeof ticket.comments !== "undefined" ? (
                            ticket.comments.map((comment, idx) => (
                                <CommentCard key={comment.id} comment={comment} />
                            ))
                        ) : (
                            <p>No comments to display!</p>
                        )}
                        <CommentBox
                            handlePost={handlePost}
                            comment={comment}
                            setComment={setComment}
                        />
                    </VStack>
                </VStack>
            </Box>
        </>
    );
};
