const getReleaseLine = async changeset => {
  const [firstLine, ...futureLines] = changeset.summary
    .split('\n')
    .map(l => l.trimRight());

  return `- ${changeset.commit}: ${firstLine}\n${futureLines
    .map(l => `  ${l}`)
    .join('\n')}`;
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    changeset => `- Updated dependencies [${changeset.commit}]:`,
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`,
  );

  return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
