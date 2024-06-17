// Tiempo
import moment from "moment-timezone";
export const timeZone = "America/Santiago";

// Columnas react data table
export const columns = [
    {
        name: "RUT",
        selector: (row) => row.rut,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Nombre",
        selector: (row) => row.name,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Teléfono",
        selector: (row) => row.phone,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Última actualización",
        selector: (row) =>
            row.updatedAt
                ? moment(row.updatedAt)
                      .tz(timeZone)
                      .format("YYYY-MM-DD HH:mm:ss")
                : "-",
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Fecha creación",
        selector: (row) =>
            row.createdAt
                ? moment(row.createdAt)
                      .tz(timeZone)
                      .format("YYYY-MM-DD HH:mm:ss")
                : "-",
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
];

export const columnsForSelect = [
    {
        label: "Todos los campos",
        value: "all",
    },
    {
        label: "RUT",
        value: "rut",
    },
    {
        label: "Nombre",
        value: "name",
    },
    {
        label: "Email",
        value: "email",
    },
    {
        label: "Teléfono",
        value: "phone",
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
