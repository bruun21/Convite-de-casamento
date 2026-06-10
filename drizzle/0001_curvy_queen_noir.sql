ALTER TABLE "invitations" ADD COLUMN "external_reference" text;--> statement-breakpoint
CREATE UNIQUE INDEX "invitations_external_reference_idx" ON "invitations" USING btree ("external_reference");