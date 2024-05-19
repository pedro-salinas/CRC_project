// Tiempo
import moment from "moment-timezone";

export const timeZone = "America/Santiago";

export const columns = [
    {
        name: "Nombre",
        selector: (row) => row.name,
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: "Color",
        selector: (row) => <input type="color" value={row.color} disabled />,
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
