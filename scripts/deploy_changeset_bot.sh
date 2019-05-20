#!/bin/sh

cp ../packages/changeset-bot/package.json ../deploy/changeset-bot
cp ../packages/changeset-bot/yarn.lock ../deploy/changeset-bot
cp ../packages/changeset-bot/index.js ../deploy/changeset-bot
cp ../packages/changeset-bot/.env ../deploy/changeset-bot

cd ../deploy/changeset-bot

# Deploy
docker build -t docker.atl-paas.net/atlassian/changeset-bot:0.0.1 .
docker push docker.atl-paas.net/atlassian/changeset-bot:0.0.1
micros service:deploy changeset-bot -f changeset-bot.sd.yml -e stg-east

echo "You did it hooray"


