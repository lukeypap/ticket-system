const URL = "http://localhost:3200/ticket";

export async function getAll() {
    const tickets = await fetch(URL).then((response) => response.json());
    return tickets;
}

export async function deleteById(id: number) {
    const ticket = await fetch(`${URL}/${id}`, { method: "DELETE" }).then((res) => res.json());
    return ticket;
}

export async function updateStatus(id: number, status: string) {
    const body = {
        status: "done",
    };
    const ticket = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    return ticket;
}
