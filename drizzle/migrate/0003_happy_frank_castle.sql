ALTER TABLE "pharmacy_table" ALTER COLUMN "otp_expiry_time" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "pharmacy_table" ALTER COLUMN "otp_expiry_time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "drug_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;