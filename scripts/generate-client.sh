#! /usr/bin/env bash

set -e
set -x

cd backend
python -c "import app.main; import json; print(json.dumps(app.main.app.openapi()))" > ../openapi.json
cd ..
mv openapi.json frontend/
cd frontend
npx @hey-api/openapi-ts \
-i ./openapi.json \
-o src/client \
-c @hey-api/client-next
npx @biomejs/biome format --write ./src/client