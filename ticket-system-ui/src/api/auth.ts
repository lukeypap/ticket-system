export async function login(values: Object) {
    const token = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return token;
}

export async function verifyToken(token: string) {
    const res = await fetch(`${process.env.API_URL}/ticket`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    if (res.statusCode === 401) {
        return false;
    }
    return true;
}
