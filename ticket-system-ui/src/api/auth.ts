const URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(values: Object) {
    const token = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return token;
}

export async function register(values: Object) {
    console.log(JSON.stringify(values));
    const user = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return user;
}

export async function verifyToken(token: string) {
    const res = await fetch(`${URL}/ticket`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
    if (res.statusCode === 401) {
        return false;
    }
    return true;
}
