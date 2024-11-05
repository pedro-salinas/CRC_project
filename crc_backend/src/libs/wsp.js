// import twilio from "twilio";
// import {
//     TWILIO_ACCOUNT_SID,
//     TWILIO_AUTH_TOKEN,
//     TWILIO_WHATSAPP_NUMBER,
// } from "../config.js";

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// export async function sendWhatsAppMessage(data) {
//     const dataText = {
//         name: data.name,
//         date: data.date,
//         hour: data.hour,
//         specialty: data.specialty,
//         phoneNumber: data.phone,
//     };

//     const twilioWhatsAppNumber = "whatsapp:" + TWILIO_WHATSAPP_NUMBER;
//     const recipientNumber = "whatsapp:+569" + dataText.phoneNumber;

//     const text = `
//     Estimado(a) ${dataText.name},

//     Gracias por agendar su cita en CRC Kinesiología. Este correo electrónico es para confirmar que su atención, con especialización en el área de ${dataText.specialty}, ha sido agendada con éxito para el día ${dataText.date} a las ${dataText.hour}.

//     Le recordamos que nuestra clínica se encuentra ubicada en:
//     1 Poniente 1258, entre 2 y 3 Norte, piso 7 oficina 711, Talca

//     Si por alguna razón no puede asistir a su cita, le agradeceríamos que nos lo informe con anticipación para que podamos reprogramarla. Asimismo, si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros respondiendo este correo.

//     En caso de que quiera cancelar su cita, le recomendamos que se ponga en contacto antes del día estipulado para poder cancelarlo y realizar un reembolso.

//     Esperamos verlo(a) pronto en CRC Kinesiología.

//     Atentamente,
//     Ks. Christopher Ramírez Calderón
//     `;
//     console.log(twilioWhatsAppNumber);
//     const message = await client.messages.create({
//         from: twilioWhatsAppNumber,
//         to: recipientNumber,
//         body: text,
//     });
// }
