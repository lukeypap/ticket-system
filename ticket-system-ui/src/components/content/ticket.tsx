import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import * as ticketApi from "../../api/tickets";
import { Box, Divider, Flex, Heading, HStack, VStack, Text } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";
import { CommentCard } from "../comment/comment-card";
import { CommentBox } from "../comment/comment-box";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { formatDate } from "src/utils/formatDate";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import AssigneeDropdown from "components/dropdown/assigneeDropdown";
import { getAll } from "src/api/users";
interface Props {
    id: any;
}

export const Ticket = ({ id }: Props) => {
    const queryClient = useQueryClient();
    const { colorMode, toggleColorMode } = useColorMode();
    const [comment, setComment] = useState({ message: "" });
    const payload = {
        id: id,
        token: "",
    };
    const router = useRouter();
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            payload.token = localStorage.getItem("token");
        }
    }

    useEffect(() => {});

    const { data, isLoading, error, isError } = useQuery(["getById", payload], () =>
        ticketApi.getById(payload)
    );

    const {
        data: userData,
        isLoading: userIsLoading,
        error: userError,
        isError: userIsError,
    } = useQuery(["getAllUsers", payload.token], () => getAll(payload.token));

    const { mutate: updateTicketStatus } = useMutation(ticketApi.updateStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries("getById");
        },
    });

    const { mutate: postTicketComment } = useMutation(ticketApi.createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("getById");
        },
    });

    const handleStatus = async (id: number, status: string) => {
        updateTicketStatus({ id: id, status: status, token: payload.token });
    };

    const handlePost = async () => {
        const token = localStorage.getItem("token");
        postTicketComment({ id, token, comment });
    };

    return (
        <>
            {isLoading || !id ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <HStack w="full" alignItems="center" spacing={10}>
                        <PageHeader title={`Ticket ${id}`} renderSearchBar={false} />

                        <Box
                            fontSize="xs"
                            fontWeight="light"
                            alignContent="left"
                            pt={5}
                            opacity="0.6"
                        >
                            <Breadcrumb separator={<BsChevronRight color="gray.500" />}>
                                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                                    <BreadcrumbLink
                                        href="/"
                                        as={Link}
                                        _hover={{ textDecoration: "underline" }}
                                    >
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                                    <BreadcrumbLink
                                        href={`/ticket/${id}`}
                                        as={Link}
                                    >{`Ticket ${id}`}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Box>
                    </HStack>
                    <Box w="full" h="full">
                        <VStack
                            w="90%"
                            maxW="1280px"
                            h="full"
                            bg={colorMode === "light" ? "white" : "gray.700"}
                            borderRadius="lg"
                            boxShadow="md"
                            my={0}
                            margin="auto"
                            px={10}
                        >
                            <HStack pt={10} w="full" pb={5} justifyContent="space-between">
                                <Heading fontSize="2xl" fontWeight="md" opacity="0.8">
                                    {data.ticket.title}
                                </Heading>
                                <Dropdown
                                    ticket={data.ticket}
                                    color={chooseLabelColor(data.ticket)}
                                    handleStatus={handleStatus}
                                    size="sm"
                                />
                            </HStack>
                            <Divider w="94%" />
                            <HStack px={10} py={1} alignItems="top" w="full" h="50%">
                                <VStack alignItems="left" w="70%">
                                    <HStack pb={5} pt={2}>
                                        <Avatar
                                            size="sm"
                                            name={
                                                data.ticket.user.firstName +
                                                " " +
                                                data.ticket.user.lastName
                                            }
                                        />
                                        <Text fontWeight="semibold">
                                            {data.ticket.user.firstName +
                                                " " +
                                                data.ticket.user.lastName}{" "}
                                        </Text>
                                        <Text>raised this request.</Text>
                                    </HStack>
                                    <Text fontWeight="semibold" fontSize="sm" opacity="0.8">
                                        Description
                                    </Text>
                                    <Text fontSize="sm" fontWeight="light" pt={2} opacity="0.8">
                                        {data.ticket.message
                                            ? data.ticket.message
                                            : "There's nothing here..."}
                                    </Text>
                                </VStack>
                                <Divider orientation="vertical" />
                                <HStack alignItems="top" w="35%" fontSize="xs" pl={3} pt={3}>
                                    <VStack fontWeight="semibold" spacing={3}>
                                        <Text pb={1} pt={1}>
                                            Raised By:
                                        </Text>
                                        <Text pb={1}>Asignee:</Text>
                                        <Text>Created:</Text>
                                        <Text>Updated:</Text>
                                        <Text>Priority:</Text>
                                    </VStack>
                                    <VStack alignItems="right" pl={3} spacing={3}>
                                        <HStack>
                                            <Avatar
                                                size="xs"
                                                name={
                                                    data.ticket.user.firstName +
                                                    " " +
                                                    data.ticket.user.lastName
                                                }
                                            />
                                            <Text>
                                                {data.ticket.user.firstName +
                                                    " " +
                                                    data.ticket.user.lastName}
                                            </Text>
                                        </HStack>
                                        <AssigneeDropdown
                                            ticket={data.ticket}
                                            users={userData.data}
                                            token={payload.token}
                                        />
                                        <Text>{formatDate(data.ticket.createdAt)}</Text>
                                        <Text>{formatDate(data.ticket.updatedAt)}</Text>
                                        <Text>
                                            {data.ticket.priority[0].toUpperCase() +
                                                data.ticket.priority.substring(1)}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </HStack>
                            <Divider w="94%" />
                            <VStack w="75%" pt={10}>
                                {typeof data.ticket.comments !== "undefined" ? (
                                    data.ticket.comments.map((comment) => (
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
            )}
        </>
    );
};
