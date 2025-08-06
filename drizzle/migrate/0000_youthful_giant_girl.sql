CREATE TABLE "daily_schedule_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" varchar(255) DEFAULT '' NOT NULL,
	"is_open" boolean DEFAULT true NOT NULL,
	"is_on_call" boolean DEFAULT false NOT NULL,
	"opening_time" time NOT NULL,
	"closing_time" time NOT NULL,
	"pharmacy_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drug_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"trade_name" varchar(255) DEFAULT '' NOT NULL,
	"description" varchar(500) DEFAULT '' NOT NULL,
	"dosage_form" varchar(255),
	"dosage_strength" varchar(255),
	"generic_name" varchar(255),
	"price" integer DEFAULT 0 NOT NULL,
	"in_stock" boolean DEFAULT true NOT NULL,
	"pharmacy_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pharmacy_table" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pharmacy_table_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pharmacy_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"pharmacist_name" varchar(50) DEFAULT 'Not Verified' NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"region" varchar(50) NOT NULL,
	"town" varchar(100) NOT NULL,
	"address" varchar(100) DEFAULT '' NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"licence_number" varchar(100) DEFAULT 'N/A' NOT NULL,
	"location" jsonb DEFAULT '{"lat":0,"lng":0}'::jsonb NOT NULL,
	"is_frozen" boolean DEFAULT false NOT NULL,
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
ALTER TABLE "daily_schedule_table" ADD CONSTRAINT "daily_schedule_table_pharmacy_id_pharmacy_table_id_fk" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacy_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drug_table" ADD CONSTRAINT "drug_table_pharmacy_id_pharmacy_table_id_fk" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacy_table"("id") ON DELETE cascade ON UPDATE no action;