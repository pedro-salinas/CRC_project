import { instance } from "./axios";

// CRUD Cliente
export function getClients() {
    return instance.get("/clients");
}

export function insertClientRequest(data) {
    return instance.post("/client", data);
}

export function updateClient(id, data) {
    return instance.put("/client/" + id, data);
}

export function deleteClient(data) {
    return instance.delete("/client/" + data);
}
