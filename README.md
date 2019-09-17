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

## Example
### Input
```ttl
wd:Q3277 p:P31 wds:Q3277-2BA3D084-AE61-4636-9106-BD8EEED2A75D .

wds:Q3277-2BA3D084-AE61-4636-9106-BD8EEED2A75D a wikibase:Statement,
    wikibase:BestRank ;
  wikibase:rank wikibase:NormalRank ;
  ps:P31 wd:Q4 ;
  prov:wasDerivedFrom wdref:6e6507a1b57b745dcd1a7e07ee5a366ad47a3a33 .

wd:Q3277 p:P19 wds:Q3277-36CEF006-7668-4159-84FE-3D7A21074308 .

wds:Q3277-36CEF006-7668-4159-84FE-3D7A21074308 a wikibase:Statement,
    wikibase:BestRank ;
  wikibase:rank wikibase:NormalRank ;
  ps:P19 "foo bar" .

wdref:3257d0cdc4712d22ffadb1e75ae7e9a2b2e46112 a wikibase:Reference ;
  pr:P12 "some value" ;
  pr:P22 "http://www.some.domain/230210880" .
```

### Output
```ttl
<https://my.domain/entity/Q3277> <https://my.domain/prop/P31> <https://my.domain/entity/statement/Q3277-2BA3D084-AE61-4636-9106-BD8EEED2A75D> .

<https://my.domain/entity/statement/Q3277-2BA3D084-AE61-4636-9106-BD8EEED2A75D> a wikibase:Statement,
    wikibase:BestRank ;
  wikibase:rank wikibase:NormalRank ;
  <https://my.domain/prop/statement/P31> <https://my.domain/entity/Q4> ;
  prov:wasDerivedFrom <https://my.domain/reference/6e6507a1b57b745dcd1a7e07ee5a366ad47a3a33> .

<https://my.domain/entity/Q3277> <https://my.domain/prop/P19> <https://my.domain/entity/statement/Q3277-36CEF006-7668-4159-84FE-3D7A21074308> .

<https://my.domain/entity/statement/Q3277-36CEF006-7668-4159-84FE-3D7A21074308> a wikibase:Statement,
    wikibase:BestRank ;
  wikibase:rank wikibase:NormalRank ;
  <https://my.domain/prop/statement/P19> "foo bar" .

<https://my.domain/reference/3257d0cdc4712d22ffadb1e75ae7e9a2b2e46112> a wikibase:Reference ;
  <https://my.domain/prop/reference/P12> "some value" ;
  <https://my.domain/prop/reference/P22> "http://www.some.domain/230210880" .
```
