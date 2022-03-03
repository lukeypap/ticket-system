import axios from "axios";

const URL = "http://localhost:3200/user";

export async function getAll(token: string) {
    const data = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } });
    if (!data.status) throw new Error(data.statusText);
    return data;
}
