export function formatDate(dateString) {
    const date = new Date(dateString);
    const tzOffset = date.getTimezoneOffset() / 60;

    //GMT-4 (Chile) (Cambiar a 3 en horario de verano o ¿5?)
    const chileOffset = 4;
    date.setHours(date.getHours() - tzOffset + chileOffset);

    // Formatear datos
    const formattedDate = date
        .toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(",", "");

    return formattedDate;
}
