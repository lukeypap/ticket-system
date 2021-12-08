const URL = "http://192.168.1.25:3200/ticket";

export async function getAll(token) {
    const data = await fetch(URL, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    return data;
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
