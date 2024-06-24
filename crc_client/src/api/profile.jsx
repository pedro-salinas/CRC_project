import { instance } from "./axios";

// CRUD Perfil
export function getProfiles() {
    return instance.get("/profiles");
}

export function insertProfileRequest(data) {
    return instance.post("/profile", data);
}

export function updateProfile(id, data) {
    return instance.put("/profile/" + id, data);
}

export function deleteProfile(data) {
    return instance.delete("/profile/" + data);
}
