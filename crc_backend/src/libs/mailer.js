import mailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { HOST, PORT, MAIL_USER, MAIL_PASSWORD } from "../config.js";

const transporter = mailer.createTransport({
    host: HOST,
    port: PORT,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});

export async function sendAttentionEmail(data) {
    const dataHTML = {
        name: data.name,
        date: data.date,
        hour: data.hour,
    };

    const source = await fs
        .readFileSync(
            "../crc_backend/src/templates/messageTemplate.html",
            "utf-8"
        )
        .toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(dataHTML);

    const info = await transporter.sendMail({
        from: MAIL_USER,
        to: data.email,
        subject: "[CRC Kinesiología] Reserva de hora",
        html: htmlToSend,
    });
}

export async function sendConfirmEmail(data) {
    const dataHTML = {
        name: data.name,
        link: data.link,
    };

    const source = await fs
        .readFileSync(
            "../crc_backend/src/templates/confirmEmailTemplate.html",
            "utf-8"
        )
        .toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(dataHTML);

    const info = await transporter.sendMail({
        from: MAIL_USER,
        to: data.email,
        subject: "[CRC Kinesiología] Confirmación de correo electrónico",
        html: htmlToSend,
    });
}
