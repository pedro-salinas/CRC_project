export function formatDate(dateString) {
    const date = new Date(dateString);
    const tzOffset = date.getTimezoneOffset() / 60;

    //GMT-4 (Chile)
    const chileOffset = 4;
    date.setHours(date.getHours() - tzOffset + chileOffset);

    // Format the date into the desired format
    const formattedDate = date
        .toLocaleString("es-CL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        .replace(",", "");

    return formattedDate;
}
