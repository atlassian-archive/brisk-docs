const nock = require('nock');
const { Probot } = require('probot');
const changesetBot = require('.');

const pullRequestOpen = require('./test/fixtures/pull_request.opened.json');

nock.disableNetConnect();

describe('changeset-bot', () => {
  let probot;

  beforeEach(() => {
    probot = new Probot({});
    const app = probot.load(changesetBot);

    // just return a test token
    app.app = () => 'test';
  });

  it.only('should add a comment when there is no comment', async () => {
    nock('https://api.github.com')
      .get('/repos/pyu/testing-things/issues/1/comments')
      .reply(200, []);

    nock('https://api.github.com')
      .get('/repos/pyu/testing-things/pulls/1/files')
      .reply(200, [
        { filename: '.changeset/something/changes.md', status: 'added' },
      ]);

    nock('https://api.github.com')
      .get('/repos/pyu/testing-things/pulls/1/commits')
      .reply(200, [{ sha: 'ABCDE' }]);

    const result = nock('https://api.github.com')
      .post('/repos/pyu/testing-things/issues/1/comments')
      .reply((uri, requestBody) => {
        console.log(requestBody);
        expect('something').toBe('something else');
      });

    await probot.receive({
      name: 'pull_request',
      payload: pullRequestOpen,
    });
  });
  it('should add update a comment when there is a comment', async () => {
    throw false;
  });
  it('should show correct message if there is a changeset', async () => {
    throw false;
  });
  it('should show correct message if there is no changeset', async () => {
    throw false;
  });
});
