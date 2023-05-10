/*
  @migrations
*/

ALTER TABLE [main].channel ADD COLUMN disable_notification BOOLEAN NOT NULL DEFAULT 1 CHECK (disable_notification IN (0, 1));
ALTER TABLE [main].tiktok_user ADD COLUMN disable_notification BOOLEAN NOT NULL DEFAULT 1 CHECK (disable_notification IN (0, 1));
