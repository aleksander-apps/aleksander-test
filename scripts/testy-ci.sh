#!/bin/sh
# Testy w torze wydań (docker-compose.test.yml, usługa `test`): jednostkowe + integracyjne z pokryciem i JUnit.
# Tor montuje $POKRYCIE_KATALOG (lcov.info dla Sonara i Jenkinsa) i $RAPORTY_KATALOG (JUnit → Jenkins, Allure).
set -eu
POKRYCIE=${POKRYCIE_KATALOG:-coverage}
RAPORTY=${RAPORTY_KATALOG:-raporty}
mkdir -p "$RAPORTY/junit" /tmp/v8
junit() { printf -- '--test-reporter=spec --test-reporter-destination=stdout --test-reporter=junit --test-reporter-destination=%s' "$RAPORTY/junit/$1.xml"; }
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
RC=0
NODE_V8_COVERAGE=/tmp/v8 NODE_OPTIONS="$(junit unit)" pnpm test || RC=$?
NODE_V8_COVERAGE=/tmp/v8 NODE_OPTIONS="$(junit integracja)" pnpm test:integration || RC=$?
pnpm exec c8 report --temp-directory /tmp/v8 --reporter=lcov --reporter=text-summary --report-dir "$POKRYCIE" \
  --src src --include 'src/**' --exclude 'testy/**' || echo 'pokrycie: raport nie powstał'
exit $RC
