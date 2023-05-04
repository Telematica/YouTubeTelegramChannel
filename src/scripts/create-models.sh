#!/bin/bash

SQLITE_DB_PATH=src/db/db.sqlite

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
