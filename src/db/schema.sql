PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA main.auto_vacuum = FULL;
CREATE TABLE IF NOT EXISTS [main].channel (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  vanity TEXT DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  deleted_at DATETIME NULL DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS [main].live (
  vid TEXT NOT NULL PRIMARY KEY,
  channel_id TEXT NOT NULL,
  live BOOLEAN NOT NULL DEFAULT 0 CHECK (live IN (0, 1)),
  title TEXT NOT NULL,
  thumbnail TEXT DEFAULT NULL,
  scheduled_start_time DATETIME DEFAULT NULL,
  actual_start_time TIMESTAMP DEFAULT NULL,
  view_count INTEGER DEFAULT 0,
  live_since TEXT DEFAULT NULL,
  start_timestamp DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  deleted_at DATETIME NULL DEFAULT NULL,
  FOREIGN KEY(channel_id) REFERENCES channel(id)
);
CREATE TABLE IF NOT EXISTS [main].log_entry (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  log_status_id INTEGER NOT NULL,
  channel_id TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
  deleted_at DATETIME NULL DEFAULT NULL,
  FOREIGN KEY(log_status_id) REFERENCES log_status(id),
  FOREIGN KEY(channel_id) REFERENCES channel(id)
);
CREATE TABLE IF NOT EXISTS [main].log_status (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  type TEXT DEFAULT NULL,
  status TEXT NOT NULL,
  code TEXT NOT NULL
);
/* @todo create a DELETE statement to delete all log entries before current week */
/*
 ALTER TABLE [main.log_entry] ADD COLUMN message TEXT NOT NULL;
 ALTER TABLE [main.log_entry] ADD COLUMN type TEXT NOT NULL;
 ALTER TABLE [main.log_entry] DROP COLUMN error;
 ALTER TABLE [main.log_entry] DROP COLUMN info;
 */