# changeset-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that Bot to detect changesets in PRs

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Installing in your repository

Install the bot from https://github.com/apps/changeset-bot and select the desired repository.

In your repository settings, add a new webhook with the following values.

- Payload URL - `https://smee.io/TNpTJ36TKInIWlgB`
- Content type - `application/json`
- Trigger events - `Pull requests`

## Behaviour

The changeset bot will listen for pull requests being opened and pull requests that have been updated, upon which it will 
then scan through the files for a changeset that has been added. The bot will make a comment on the PR stating 
whether it found a changeset or not, as well as the message of the latest commit. If the PR is being updated 
then the bot will update the existing comment.

## Deploying to Now

1. Install the Now CLI or create an alias for `node_modules/now/download/dist/now` as `now`.
2. Add the environment variables as secrets:
    - `now secret add app-id 28616`
    - `now secret add webhook-secret changesetbot`
    - `now secret add private-key-base64-encoded $(cat /path/to/private-key.pem | base64)`
3. Run `now deploy`

When Now has finished deploying, it will provide the URL to access your app. By default, the project’s directory name 
will be used to generate the URL (ie https://my-app-directory-name.now.sh). Currently the Github app webhook url is 
set to https://changeset-bot.pyu.now.sh, so it is probably easier to alias your URL to this instead of changing
the settings in the app.

`now alias <your-url> https://changeset-bot.pyu.now.sh`
