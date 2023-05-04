BEGIN TRANSACTION;
    DELETE FROM log_entry WHERE created_at < strftime('%Y-%m-%d %H:%M:%f +00:00','now','-1 day');
    DELETE FROM tiktok_log_entry WHERE created_at < strftime('%Y-%m-%d %H:%M:%f +00:00','now','-1 day');
COMMIT
