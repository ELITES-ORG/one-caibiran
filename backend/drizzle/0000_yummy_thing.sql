CREATE TABLE "sessions" (
	"sid" text PRIMARY KEY NOT NULL,
	"data" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"user_id" uuid
);
--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");