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
        name: "Descripción",
        selector: (row) => row.description,
        sortable: true,
        wrap: true,
    },
    {
        name: "Precio",
        selector: (row) => row.price,
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
        name: "Precio en oferta",
        selector: (row) => row.on_sale_price,
        sortable: true,
        wrap: true,
    },
    {
        name: "Oferta disponible",
        selector: (row) => (row.on_sale ? "Sí" : "No"),
        sortable: true,
        wrap: true,
    },
    {
        name: "Disponible en web",
        selector: (row) => (row.visible ? "Sí" : "No"),
        sortable: true,
        wrap: true,
    },
    {
        name: "Disponible para agendar",
        selector: (row) => (row.agenda ? "Sí" : "No"),
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
        label: "Descripción",
        value: "description",
    },
    {
        label: "Precio",
        value: "price",
    },
    {
        label: "Prefio en oferta",
        value: "on_sale_price",
    },
    {
        label: "Oferta disponible",
        value: "on_sale",
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
