ALTER TABLE "drug_table" ALTER COLUMN "trade_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "drug_table" ALTER COLUMN "trade_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "drug_table" ADD COLUMN "description" varchar(500) DEFAULT '' NOT NULL;