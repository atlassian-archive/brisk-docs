#!/bin/sh

# Clean website directory
rm -rf ../deploy/website
mkdir ../deploy/website

# Build
cd .. && bolt build

cp package.json deploy/website
cp yarn.lock deploy/website

cp -r website/.next deploy/website
cp -r website/static deploy/website

cd deploy/website
bolt

cd ..
docker build -t docker.atl-paas.net/atlassian/jira-frontend-docs-test:0.0.1 .
docker push docker.atl-paas.net/atlassian/jira-frontend-docs-test:0.0.1
micros service:deploy jira-frontend-docs-test -f jira-frontend-docs-test.sd.yml
echo "You did it hooray"


