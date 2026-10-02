import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),

  date: text("date"),
  heure: text("heure"),

  name: text("name"),
  email: text("email"),
  phone: text("phone"),

  confirme: integer("confirme").default(0),

  link_confirme: text("link_confirme").unique(),
});