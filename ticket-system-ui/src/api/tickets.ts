import axios from "axios";
import { ITicket } from "types/ITicket";

const URL = "http://localhost:3200/ticket";

// export async function getAll(token) {
//     const data = await fetch(URL, { headers: { Authorization: `Bearer ${token}` } })
//         .then((response) => response.json())
//         .catch((err) => console.log(err));
//     return data;
// }

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

export async function deleteById(id: number) {
    const ticket = await fetch(`${URL}/${id}`, { method: "DELETE" }).then((res) => res.json());
    return ticket;
}

export async function updateStatus({ id, status }) {
    const body = {
        status: status,
    };
    const ticket = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
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

export async function createComment(
    id: number,
    token: string,
    comment: {
        message: string;
    }
) {
    const ticket = await fetch(`${URL}/${id}/comment`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(comment),
    }).then((res) => res.json());
    return ticket;
}
