"use server"

import nodemailer from "nodemailer"
import { db } from "@/db"
import { meetings } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import * as z from "zod"

const SubmitSchema = z.object({
     date: z.string(),
     heure: z.string(),
     username: z.string(),
     email: z.string().email({ message: "Format d'e-mail invalide" }).nonempty(),
     phone: z
          .string()
          .regex(/^(?:(?:\+|00)\d{1,3})?0?[1-9]\d{8}$/, {
               message: "Format de téléphone invalide",
          })
          .nonempty(),
})

type SubmitType = z.infer<typeof SubmitSchema>

const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: true,
     auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
     },
})

export async function submit(data: SubmitType) {
     try {
          const validatedData = SubmitSchema.parse(data)

          await db
               .update(meetings)
               .set({
                    name: validatedData.username,
                    email: validatedData.email,
                    phone: validatedData.phone,
               })
               .where(and(eq(meetings.date, validatedData.date), eq(meetings.heure, validatedData.heure)))

          const row = await db
               .select({
                    link_confirme: meetings.link_confirme,
               })
               .from(meetings)
               .where(and(eq(meetings.date, validatedData.date), eq(meetings.heure, validatedData.heure)))
               .limit(1)

          const linkToken = row[0]?.link_confirme

          const baseUrl = process.env.APP_URL?.endsWith("/") ? process.env.APP_URL : `${process.env.APP_URL}/`

          const confirmationLink = linkToken ? `${baseUrl}confirme/${linkToken}` : "#"

          const info = await transporter.sendMail({
               from: process.env.PRIV_EMAIL,
               to: validatedData.email,
               subject: "Confirmation de votre rendez-vous",
               text: `Bonjour ${validatedData.username},

Pour valider votre rendez-vous du ${validatedData.date} à ${validatedData.heure}, veuillez cliquer sur le lien suivant :
${confirmationLink}`,

               html: `<p>Bonjour <b>${validatedData.username}</b>,</p>
<p>Votre rendez-vous du <b>${validatedData.date}</b> à <b>${validatedData.heure}</b> a bien été enregistré.</p>
<p>Pour le valider, veuillez cliquer sur ce lien :
<a href="${confirmationLink}">${confirmationLink}</a></p>`,
          })

          console.log("E-mail envoyé :", info.messageId)

          return { success: true }
     } catch (error) {
          if (error instanceof z.ZodError) {
               return { success: false, error: error.issues }
          }

          console.error("Erreur dans la Server Action :", error)

          return {
               success: false,
               error: "Erreur lors de la mise à jour des données ou de l'envoi de l'e-mail.",
          }
     }
}
