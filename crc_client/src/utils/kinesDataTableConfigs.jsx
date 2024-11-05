// Tiempo
import { formatDate } from "./dateUtils";

// Columnas react data table
export const columns = [
    {
        name: "Nombre",
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
    },
    {
        name: "Especialidad",
        selector: (row) => row.specialty,
        sortable: true,
        wrap: true,
    },
    {
        name: "Color",
        selector: (row) => <input type="color" value={row.color} disabled />,
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
        label: "Nombre",
        value: "name",
    },
    {
        label: "Color",
        value: "color",
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
