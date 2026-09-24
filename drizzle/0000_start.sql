CREATE TABLE "wpisy" (
	"id" serial PRIMARY KEY NOT NULL,
	"tresc" text NOT NULL,
	"utworzono" timestamp with time zone DEFAULT now() NOT NULL
);
