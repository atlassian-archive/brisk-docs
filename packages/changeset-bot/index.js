const getAbsentMessage = commitSha => `###  💥 No Changeset

Latest commit: ${commitSha}

Merging this PR will not cause any packages to be released. If these changes should not cause updates to packages in this repo, this is fine 🙂

**If these changes should be published to npm, you need to add a changeset.**

[Click here to learn what changesets are, and how to add one](https://github.com/Noviny/changesets/blob/master/docs/adding-a-changeset.md).`;

const getApproveMessage = commitSha => `###  🦋  Changeset is good to go

Latest commit: ${commitSha}

**We got this.**

Not sure waht this means? [Click here  to learn what changesets are](https://github.com/Noviny/changesets/blob/master/docs/adding-a-changeset.md).`;

module.exports = app => {
  app.log('Yay, the app was loaded!');

  // Get an express router to expose new HTTP endpoints
  // Healthcheck
  const router = app.route('/');
  router.get('/healthcheck', (req, res) => {
    res.send('OK');
  });

  app.on('pull_request.opened', async context => {
    const params = context.issue();

    const getFiles = context.github.pullRequests
      .listFiles(params)
      .then(files => {
        const changesetFiles = files.data.filter(
          file =>
            file.filename.startsWith('.changeset') && file.status === 'added',
        );
        return changesetFiles.length > 0;
      });

    const getLatestCommit = context.github.pullRequests
      .listCommits(params)
      .then(commits => {
        return commits.data.pop();
      });

    Promise.all([getFiles, getLatestCommit]).then(
      ([hasChangeset, latestCommit]) => {
        let prComment;
        if (!hasChangeset) {
          prComment = context.issue({
            body: getAbsentMessage(latestCommit.sha),
          });
        } else {
          prComment = context.issue({
            body: getApproveMessage(latestCommit.sha),
          });
        }

        return context.github.issues.createComment(prComment);
      },
    );
  });

  app.on('pull_request.synchronize', async context => {
    const params = context.issue();

    const getBotComment = context.github.issues
      .listComments(params)
      .then(comments => {
        const changesetBotComment = comments.data.filter(
          comment => comment.user.login === 'changeset-bot[bot]',
        );
        const { id } = changesetBotComment[0];
        return id;
      });

    const getFiles = context.github.pullRequests
      .listFiles(params)
      .then(files => {
        const changesetFiles = files.data.filter(
          file =>
            file.filename.startsWith('.changeset') && file.status === 'added',
        );
        return changesetFiles.length > 0;
      });

    const getLatestCommit = context.github.pullRequests
      .listCommits(params)
      .then(commits => {
        return commits.data.pop();
      });

    Promise.all([getBotComment, getFiles, getLatestCommit]).then(
      ([commentId, hasChangeset, latestCommit]) => {
        let prComment;
        if (!hasChangeset) {
          prComment = context.issue({
            comment_id: commentId,
            body: getAbsentMessage(latestCommit.sha),
          });
        } else {
          prComment = context.issue({
            comment_id: commentId,
            body: getApproveMessage(latestCommit.sha),
          });
        }

        return context.github.issues.updateComment(prComment);
      },
    );
  });
};
