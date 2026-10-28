CREATE TABLE "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"heure" text NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"confirme" integer DEFAULT 0,
	"link_confirme" text,
	CONSTRAINT "meetings_link_confirme_unique" UNIQUE("link_confirme")
);
