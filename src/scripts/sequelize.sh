#!/bin/bash

# Sequelize db bootstrap script
rm src/db/db.sqlite && cat src/db/schema.sql | sqlite3 src/db/db.sqlite && \
npx sequelize-auto \
-h localhost \
-d src/db/db.sqlite \
-u root \
--dialect sqlite \
-o "./src/db/models" \
--lang js \
--useDefine --caseModel o --caseFile k --caseProp o --noAlias --additional "./src/db/sequelize-auto-config.json"
# --noInitModels
# --tables escorts_profile
