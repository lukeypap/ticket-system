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
