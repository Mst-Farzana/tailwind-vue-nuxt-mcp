ALTER TABLE "subscriptions" ADD COLUMN "tran_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_tran_id_unique" UNIQUE("tran_id");