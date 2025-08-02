ALTER TABLE "pharmacy_table" ADD COLUMN "isFrozen" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pharmacy_table" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "pharmacy_table" ADD COLUMN "updated_at" timestamp DEFAULT now();