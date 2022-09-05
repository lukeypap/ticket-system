export async function login(values: Object) {
    const token = await fetch("https://ticket-system-production.up.railway.app/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return token;
}

export async function verifyToken(token: string) {
    const res = await fetch("https://ticket-system-production.up.railway.app/ticket", {
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    if (res.statusCode === 401) {
        return false;
    }
    return true;
}
