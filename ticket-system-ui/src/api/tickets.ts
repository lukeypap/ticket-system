import axios from "axios";
import { ITicket } from "types/ITicket";

const URL = `${process.env.API_URL}/ticket`;

export async function getAll(token: string) {
    const data = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } });
    if (!data.status) throw new Error(data.statusText);
    return data;
}

export async function getById({ id, token }) {
    const ticket = await fetch(`${URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    return ticket;
}

export async function deleteById({ id, token }) {
    const ticket = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    return ticket;
}

export async function updateStatus({ id, status, token }) {
    const body = {
        status: status,
    };
    const ticket = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    return ticket;
}

export async function create({ values, token }) {
    const ticket = await fetch(`${URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return ticket;
}

export async function createComment({ id, token, comment }) {
    const ticket = await fetch(`${URL}/${id}/comment`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(comment),
    }).then((res) => res.json());
    return ticket;
}

export async function updateAsignee({ id, token, userId }) {
    const body = {
        asignee: {
            id: userId,
        },
    };
    const ticket = await fetch(`${URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(body),
    }).then((res) => res.json());
    return ticket;
}
