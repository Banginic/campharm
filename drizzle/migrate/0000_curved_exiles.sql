CREATE TABLE "drug_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"trade_name" varchar(500) DEFAULT '' NOT NULL,
	"dosage_form" varchar(255),
	"dosage_strength" varchar(255),
	"generic_name" varchar(255),
	"price" integer DEFAULT 0 NOT NULL,
	"pharmacy_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pharmacy_table" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pharmacy_table_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pharmacy_name" varchar(255) NOT NULL,
	"email" varchar(25) NOT NULL,
	"pharmacist_name" varchar(50) DEFAULT 'No Verified' NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"region" varchar(15) NOT NULL,
	"town" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"isOnCall" boolean DEFAULT false NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL,
	"isOpen" boolean DEFAULT true NOT NULL,
	"location" jsonb NOT NULL,
	"isFrozen" boolean DEFAULT false NOT NULL,
	"weekly_schedule" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "pharmacy_table_pharmacy_name_unique" UNIQUE("pharmacy_name"),
	CONSTRAINT "pharmacy_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "drug_table" ADD CONSTRAINT "drug_table_pharmacy_id_pharmacy_table_id_fk" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacy_table"("id") ON DELETE cascade ON UPDATE no action;