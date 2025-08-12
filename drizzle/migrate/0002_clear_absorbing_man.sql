ALTER TABLE "pharmacy_table" ALTER COLUMN "verification_otp" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "pharmacy_table" ALTER COLUMN "verification_otp" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "pharmacy_table" ALTER COLUMN "verification_otp" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pharmacy_table" ADD COLUMN "photo_id" varchar DEFAULT '' NOT NULL;