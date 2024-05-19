import { instance } from "./axios";

// CRUD Ususario
export function insertUserRequest(data) {
    return instance.post("/user", data);
}

export function verifyEmailRequest(data) {
    return instance.get("/confirm/" + data);
}

export function getUsers() {
    return instance.get("/users");
}

export function updateUser(id, data) {
    return instance.put("/user/" + id, data);
}

export function updateCurrentUser(data) {
    return instance.put("/user", data);
}

export function deleteUser(data) {
    return instance.delete("/user/" + data);
}

// Sesión de usuario
export function loginRequest(data) {
    return instance.post("/login", data);
}

export function verifyToken() {
    return instance.get("/verify");
}

export function logout() {
    return instance.get("/logout");
}
