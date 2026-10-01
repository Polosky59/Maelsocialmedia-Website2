"use server";

import nodemailer from 'nodemailer';
import { openDb } from "../../db/db";
import * as z from "zod";

const SubmitSchema = z.object({
    date: z.string(),
    heure: z.string(),
    username: z.string(),
    email: z.string().email({ message: "Format d'e-mail invalide" }),
    phone: z.string().regex(/^(?:(?:\+|00)\d{1,3})?0?[1-9]\d{8}$/, { message: "Format de téléphone invalide" })
});

type SubmitType = z.infer<typeof SubmitSchema>;

export async function submit(data: SubmitType) {
    try {
        const validatedData = SubmitSchema.parse(data);
        const db = await openDb();
        
        await db.run(
            `UPDATE meting
             SET name = ?, email = ?, phone = ?
             WHERE date = ? AND heure = ?`,
            [validatedData.username, validatedData.email, validatedData.phone, validatedData.date, validatedData.heure]
        );

        const row = await db.get<{ link_confirme: string }>(
            'SELECT link_confirme FROM meting WHERE date = ? AND heure = ?',
            [validatedData.date, validatedData.heure]
        );

        const baseUrl = process.env.APP_URL?.endsWith('/') 
            ? process.env.APP_URL 
            : `${process.env.APP_URL}/`;

        const confirmationLink = row?.link_confirme 
            ? `${baseUrl}confirme/${row.link_confirme}` 
            : '#';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"Mon Application" <${process.env.EMAIL_USERNAME}>`,
            to: validatedData.email,
            subject: 'Confirmation de votre rendez-vous',
            text: `Bonjour ${validatedData.username},\n\nPour valider votre rendez-vous du ${validatedData.date} à ${validatedData.heure}, veuillez cliquer sur le lien suivant : ${confirmationLink}`,
            html: `<p>Bonjour <b>${validatedData.username}</b>,</p><p>Votre rendez-vous du <b>${validatedData.date}</b> à <b>${validatedData.heure}</b> a bien été enregistré.</p><p>Pour le valider, veuillez cliquer sur ce lien : <a href="${confirmationLink}">${confirmationLink}</a></p>`
        });

        console.log('E-mail envoyé : %s', info.messageId);

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues };
        }
        console.error("Erreur dans la Server Action :", error);
        return {
            success: false,
            error: "Erreur lors de la mise à jour des données ou de l'envoi de l'e-mail.",
        };
    }
}