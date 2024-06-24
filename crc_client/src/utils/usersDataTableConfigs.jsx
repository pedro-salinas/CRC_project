// Tiempo
import { formatDate } from "./dateUtils";

// Columnas react data table
export const columns = [
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        wrap: true,
    },
    {
        name: "RUT",
        selector: (row) => row.rut,
        sortable: true,
        wrap: true,
    },
    {
        name: "Nombre",
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
    },
    {
        name: "Teléfono",
        selector: (row) => row.phone,
        sortable: true,
        wrap: true,
    },
    {
        name: "Es staff",
        selector: (row) => (row.is_staff ? "Sí" : "No"),
        sortable: true,
        wrap: true,
    },
    {
        name: "Es admin",
        selector: (row) => (row.is_admin ? "Sí" : "No"),
        sortable: true,
        wrap: true,
    },
    {
        name: "Último ingreso",
        selector: (row) => (row.last_login ? formatDate(row.last_login) : "-"),
        sortable: true,
        wrap: true,
    },
    {
        id: "update",
        name: "Última actualización",
        selector: (row) => (row.updatedAt ? formatDate(row.updatedAt) : "-"),
        sortable: true,
        wrap: true,
    },
    {
        name: "Fecha creación",
        selector: (row) => (row.createdAt ? formatDate(row.createdAt) : "-"),
        sortable: true,
        wrap: true,
    },
];

export const columnsForSelect = [
    {
        label: "Todos los campos",
        value: "all",
    },
    {
        label: "Email",
        value: "email",
    },
    {
        label: "Rut",
        value: "rut",
    },
    {
        label: "Nombre",
        value: "name",
    },
    {
        label: "Teléfono",
        value: "phone",
    },
    {
        label: "Es staff",
        value: "is_staff",
    },
    {
        label: "Es admin",
        value: "is_admin",
    },
    {
        label: "Último ingreso",
        value: "last_login",
    },
    {
        label: "Última actualización",
        value: "updatedAt",
    },
    {
        label: "Fecha creación",
        value: "createdAt",
    },
];
