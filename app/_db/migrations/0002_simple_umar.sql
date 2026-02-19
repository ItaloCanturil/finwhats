CREATE TYPE "main"."recurrence_type" AS ENUM('none', 'subscription', 'installment');--> statement-breakpoint
CREATE TYPE "main"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TABLE "main"."transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"type" "main"."transaction_type" NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"amount" numeric(10, 2) NOT NULL,
	"reference_month" date NOT NULL,
	"recurrence_type" "main"."recurrence_type" DEFAULT 'none' NOT NULL,
	"installment_current" integer,
	"installment_total" integer,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "main"."user" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "main"."user"("id") ON DELETE no action ON UPDATE no action;