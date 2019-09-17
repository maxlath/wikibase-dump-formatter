# wikibase dump formatter

Extends Wikibase dump prefixed URIs with a custom domain.

## Install
```
git clone https://github.com/maxlath/wikibase-dump-formatter
cd wikibase-dump-formatter
npm install
```

## Run
```sh
# Generate the dump
docker-compose exec wikibase /bin/sh -c "php ./extensions/Wikibase/repo/maintenance/dumpRdf.php --log /dev/null" > dump.ttl
# Extend the URIs
cat dump.ttl | ./format.js 'https://my.domain' > formatted_dump.ttl
# Validate
npm run validate-ttl formatted_dump.ttl
# Load the dump to a previously created Blazegraph namespace (example here with namespace "foo")
curl http://localhost:9999/bigdata/namespace/foo/dataloader -H 'Content-Type: application/x-turtle' -d@./formatted_dump.ttl
```
