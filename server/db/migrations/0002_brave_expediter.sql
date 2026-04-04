ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_stripe_customer_id_unique";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_stripe_subscription_id_unique";--> statement-breakpoint
DROP INDEX "members_user_idx";--> statement-breakpoint
DROP INDEX "members_org_idx";--> statement-breakpoint
DROP INDEX "members_role_idx";--> statement-breakpoint
DROP INDEX "subscriptions_org_idx";--> statement-breakpoint
DROP INDEX "subscriptions_status_idx";--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "organization_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN "invited_at";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "stripe_subscription_id";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "tran_id";