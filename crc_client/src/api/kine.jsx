import { instance } from "./axios";

// CRUD Kine
export function getKines() {
    return instance.get("/kines");
}

export function insertKineRequest(data) {
    return instance.post("/kine", data);
}

export function updateKine(id, data) {
    return instance.put("/kine/" + id, data);
}

export function deleteKine(data) {
    return instance.delete("/kine/" + data);
}
