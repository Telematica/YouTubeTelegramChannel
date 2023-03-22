#!/bin/bash

SQLITE_DB_PATH=src/db/db.sqlite
SQLITE_SQL_SCHEMA_PATH=src/db/schema.sql
SQLITE_SQL_DATA_PATH=src/db/data.sql

# Sequelize db bootstrap script
rm $SQLITE_DB_PATH && \
cat $SQLITE_SQL_SCHEMA_PATH | sqlite3 $SQLITE_DB_PATH && \
sqlite3 $SQLITE_DB_PATH < $SQLITE_SQL_DATA_PATH && \
npx sequelize-auto \
-h localhost \
-d $SQLITE_DB_PATH \
-u root \
--dialect sqlite \
-o "./src/db/models" \
--lang js \
--useDefine --caseModel o --caseFile k --caseProp o --additional "./src/db/sequelize-auto-config.json"
# --noAlias
# --noInitModels
# --tables escorts_profile
