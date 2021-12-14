import axios from "axios";

export async function login(values: Object) {
    const token = await fetch("http://localhost:3200/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return token;
}

export async function verifyToken(token: string) {
    const res = await axios.get("http://localhost:3200/ticket", {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    if (!res.data.user) {
        return false;
    }
    return true;
}
