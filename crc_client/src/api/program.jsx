import { instance } from "./axios";

// CRUD Programa
export function getPrograms() {
    return instance.get("/programs");
}

export function insertProgramRequest(data) {
    return instance.post("/program", data);
}

export function updateProgram(id, data) {
    return instance.put("/program/" + id, data);
}

export function deleteProgram(data) {
    return instance.delete("/program/" + data);
}
