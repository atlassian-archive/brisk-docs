const getAbsentMessage = commitSha => `###  💥  No Changeset

Merging this PR will not cause any packages to be released. If these changes should not cause updates to packages in this repo, this is fine 🙂

**If these changes should be published to npm, you need to add a changeset.**

[Click here to learn what changesets are, and how to add one](https://github.com/Noviny/changesets/blob/master/docs/adding-a-changeset.md).

Latest commit: ${commitSha}`;

const getApproveMessage = commitSha => `###  🦋  Changeset is good to go

**We got this.**

Not sure what this means? [Click here  to learn what changesets are](https://github.com/Noviny/changesets/blob/master/docs/adding-a-changeset.md).

Latest commit: ${commitSha}`;

const getReleaseMessage = commitSha => `### 🦋🦋 Looks like this is a release branch

There are no new changesets, but you've removed some. Happy publishing!

Latest commit: ${commitSha}`;

const getCommentId = (context, params) =>
  context.github.issues.listComments(params).then(comments => {
    const changesetBotComment = comments.data.find(
      comment => comment.user.login === 'changeset-bot[bot]',
    );
    return changesetBotComment ? changesetBotComment.id : null;
  });

const checkAddedChangesets = (context, params) =>
  context.github.pullRequests.listFiles(params).then(files => {
    const changesetFiles = files.data.filter(
      file => file.filename.startsWith('.changeset') && file.status === 'added',
    );
    return changesetFiles.length > 0;
  });

const checkRemovedChangesets = (context, params) =>
  context.github.pullRequests.listFiles(params).then(files => {
    const changesetFiles = files.data.filter(
      file =>
        file.filename.startsWith('.changeset') && file.status === 'deleted',
    );
    return changesetFiles.length > 0;
  });

const getLatestCommit = (context, params) =>
  context.github.pullRequests.listCommits(params).then(commits => {
    return commits.data.pop();
  });

module.exports = app => {
  app.log('Yay, the app was loaded!');

  // Get an express router to expose new HTTP endpoints
  // Healthcheck
  const router = app.route('/');
  router.get('/healthcheck', (req, res) => {
    res.send('OK');
  });

  app.on(['pull_request.opened', 'pull_request.synchronize'], async context => {
    const params = context.issue();

    const commentId = await getCommentId(context, params);
    const addedChangesets = await checkAddedChangesets(context, params);
    const latestCommit = await getLatestCommit(context, params);
    const removedChangesets = await checkRemovedChangesets(context, params);

    let prComment;
    /*
      We have comments for 3 scenarios:
      - no changesets added or removed
      - no changesets added, some were removed
      - changesets added

      changesets added and removed falls through to 'changesets added' for now
    */
    if (!addedChangesets && !removedChangesets) {
      prComment = context.issue({
        comment_id: commentId,
        body: getAbsentMessage(latestCommit.sha),
      });
    } else if (!addedChangesets && removedChangesets) {
      prComment = context.issue({
        comment_id: commentId,
        body: getReleaseMessage(latestCommit.sha),
      });

      // We extrapolate this is a relase branch
    } else {
      prComment = context.issue({
        comment_id: commentId,
        body: getApproveMessage(latestCommit.sha),
      });
    }

    if (commentId) {
      return context.github.issues.updateComment(prComment);
    }
    return context.github.issues.createComment(prComment);
  });
};
