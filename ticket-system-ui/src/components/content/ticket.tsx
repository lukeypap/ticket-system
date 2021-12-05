import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import { getById } from "../../api/tickets";
import { ITicket } from "../../types/ITicket";
import { VStack } from "@chakra-ui/layout";
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
    comments: [
        {
            id: -1,
            message: "",
            createdAt: "",
        },
    ],
};

export const Ticket = ({ id }: Props) => {
    const [ticket, setTicket] = useState(initialValues);

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
                {ticket.comments[0].message !== "" ? (
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
