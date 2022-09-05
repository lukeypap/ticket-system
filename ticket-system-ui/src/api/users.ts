import axios from "axios";

const URL = `${process.env.API_URL}/user`;

export async function getAll(token: string) {
    const data = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } });
    if (!data.status) throw new Error(data.statusText);
    return data;
}

export async function create({ values, token }) {
    const user = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return user;
}

export async function deleteById({ id, token }) {
    const user = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    return user;
}
