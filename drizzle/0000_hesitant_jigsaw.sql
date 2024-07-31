CREATE TABLE IF NOT EXISTS "todoTasks" (
	"id" uuid PRIMARY KEY DEFAULT 'eef0f8d7-e354-47b4-8187-276b05fa85ce' NOT NULL,
	"task" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todoTasks" ADD CONSTRAINT "todoTasks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
