// Tiempo
import moment from "moment-timezone";

export const timeZone = "America/Santiago";

export const columns = [
    {
        name: "Fecha",
        selector: (row) =>
            `${row.year}-${String(row.month).padStart(2, "0")}-${String(
                row.day
            ).padStart(2, "0")} ${row.hour}:00`,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Programa",
        selector: (row) => row.program.name,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Kinesiólogo",
        selector: (row) => row.kine.name,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Cliente",
        selector: (row) => row.client.name,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Estado",
        selector: (row) => row.state,
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
        label: "Año",
        value: "year",
    },
    {
        label: "Mes",
        value: "month",
    },
    {
        label: "Dia",
        value: "day",
    },
    {
        label: "Hora",
        value: "hour",
    },
    {
        label: "Programa",
        value: "program",
    },
    {
        label: "Kinesiólogo",
        value: "kine",
    },
    {
        label: "Cliente",
        value: "client",
    },
    {
        label: "Estado",
        value: "state",
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
