ALTER TABLE "main"."user" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."user" ADD CONSTRAINT "user_phone_unique" UNIQUE("phone");