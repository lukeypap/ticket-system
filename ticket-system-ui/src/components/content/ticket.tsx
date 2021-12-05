import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import { getById } from "../../api/tickets";
import { ITicket } from "../../types/ITicket";
import { VStack } from "@chakra-ui/layout";

interface Props {
    id: number;
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

    useEffect(() => {
        const getTicket = async () => {
            setTicket(await getById(id));
        };
        getTicket();
        console.log(ticket);
    }, []);

    return (
        <>
            <PageHeader title={`Ticket ${id}`} />
            <div>
                <p>{ticket.id}</p>
                <p>{ticket.title}</p>
                <p>{ticket.message}</p>
                <p>{ticket.status}</p>
                <p>{ticket.user}</p>
                <p>{ticket.createdAt}</p>
                <p>{ticket.updatedAt}</p>
                {ticket.comments.length !== 0 ? (
                    ticket.comments.map((comment) => (
                        <VStack>
                            <p>{comment.id}</p>
                            <p>{comment.message}</p>
                            <p>{comment.createdAt}</p>
                        </VStack>
                    ))
                ) : (
                    <p>No comments found!</p>
                )}
            </div>
        </>
    );
};
