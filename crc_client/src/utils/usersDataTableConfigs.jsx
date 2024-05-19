// Tiempo
import moment from "moment-timezone";

export const timeZone = "America/Santiago";

export const columns = [
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
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
        name: "Teléfono",
        selector: (row) => row.phone,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Es staff",
        selector: (row) => (row.is_staff ? "Sí" : "No"),
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Es admin",
        selector: (row) => (row.is_admin ? "Sí" : "No"),
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Último ingreso",
        selector: (row) =>
            row.last_login
                ? moment(row.last_login)
                      .tz(timeZone)
                      .format("YYYY-MM-DD HH:mm:ss")
                : "-",
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
                ? moment(row.createdAt).tz(timeZone).format("YYYY-MM-DD HH:mm")
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
