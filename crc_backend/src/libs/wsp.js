// import twilio from "twilio";
// import {
//     TWILIO_ACCOUNT_SID,
//     TWILIO_AUTH_TOKEN,
//     TWILIO_WHATSAPP_NUMBER,
// } from "../config.js";

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// export async function sendWhatsAppMessage(data) {
//     const { phoneNumber, name, date, hour } = data;

//     try {
//         const message = await client.messages.create({
//             from: TWILIO_WHATSAPP_NUMBER, // Tu número habilitado para WhatsApp
//             to: `whatsapp:${phoneNumber}`, // Número de destino en formato internacional
//             body: `Hola ${name}, tu reserva está programada para el día ${date} a las ${hour}.`,
//         });

//         console.log("Mensaje de WhatsApp enviado:", message.sid);
//     } catch (error) {
//         console.error("Error al enviar mensaje de WhatsApp:", error);
//     }
// }

// import twilio from "twilio";
// import {
//     TWILIO_ACCOUNT_SID,
//     TWILIO_AUTH_TOKEN,
//     TWILIO_WHATSAPP_NUMBER,
// } from "../config.js";

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
