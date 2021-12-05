const URL = "http://localhost:3200/ticket";

export async function getAll() {
    const tickets = await fetch(URL).then((response) => response.json());
    return tickets;
}

export async function getById(id: number) {
    const ticket = await fetch(`${URL}/${id}`).then((res) => res.json());
    return ticket;
}

export async function deleteById(id: number) {
    const ticket = await fetch(`${URL}/${id}`, { method: "DELETE" }).then((res) => res.json());
    return ticket;
}

export async function updateStatus(id: number, status: string) {
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

export async function create(values: Object) {
    const ticket = await fetch(`${URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
    return ticket;
}

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
