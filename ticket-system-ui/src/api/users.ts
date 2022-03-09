import axios from "axios";

const URL = "http://localhost:3200/user";

export async function getAll(token: string) {
    const data = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } });
    if (!data.status) throw new Error(data.statusText);
    console.log(data);
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
