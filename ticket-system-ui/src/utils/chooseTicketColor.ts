import { ITicket } from "../types/ITicket";

export const chooseLabelColor = (ticket: ITicket) => {
    if (ticket.status === "done") {
        return "green";
    } else if (ticket.status === "work in progress") {
        return "blue";
    } else if (ticket.status === "open") {
        return "gray";
    } else if (ticket.status === "cancelled") {
        return "red";
    }
};
