#!/bin/zsh

# Reference
# https://litestream.io/alternatives/cron/
# https://gist.github.com/zeroc0d3/b74a35ce52a0f5225c906adce2cf09e5


#❗️Do not use `cp` to back up SQLite databases. It is not transactionally safe.

# Ensure script stops when commands fail.
# set -e

SQLITE_DB_PATH=$HOME/YouTubeTelegramChannel/src/db/db.sqlite;
SQLITE_DB_BACKUP_PATH=$HOME/YouTubeTelegramChannel/src/db/db.backup.sqlite;

function backup() {
    TYPE=$(echo $1)
    if [ $TYPE = "plain" ]
        then
            sqlite3 $SQLITE_DB_PATH < $HOME/YouTubeTelegramChannel/src/scripts/clean-log.sql
            sqlite3 $SQLITE_DB_PATH ".backup '$SQLITE_DB_BACKUP_PATH'"
    elif [ $TYPE = "vacuum" ]
        then
            sqlite3 $SQLITE_DB_PATH < $HOME/YouTubeTelegramChannel/src/scripts/clean-log.sql
            rm $SQLITE_DB_BACKUP_PATH
            sqlite3 $SQLITE_DB_PATH "VACUUM INTO '$SQLITE_DB_BACKUP_PATH'"
    else
        echo "No valid type entered."
        return 1
    fi

    return 0
}

backup "vacuum" && cd $HOME/YouTubeTelegramChannel/ && git add src/db/db.backup.sqlite && git commit -m "DB Backup." && git push origin master
