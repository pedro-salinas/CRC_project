import { instance } from "./axios";

// CRUD Atenciones
export function getAttentions() {
    return instance.get("/attentions");
}

export function getAttentionsByDate(data) {
    return instance.post("/attentions_date", data);
}

export function insertAttentionRequest(data) {
    return instance.post("/attention", data);
}

export function createMultiplesAttentions(data) {
    return instance.post("/attentions_blocked", data);
}

export function updateAttention(id, data) {
    return instance.put("/attention/" + id, data);
}

export function deleteAttention(data) {
    return instance.delete("/attention/" + data);
}
