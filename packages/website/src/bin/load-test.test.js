import path from 'path';
import fs from 'fs-extra';
// Experimental API
import { performance, PerformanceObserver } from 'perf_hooks';
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import { build } from './run-website';

const generateDocs = async (
  directory,
  pageCount,
  pagesPerDir = 5,
  branchingFactor = 3,
) => {
  let remainingPages = pageCount;
  const directories = [directory];

  while (directories.length > 0 && remainingPages > 0) {
    const dirToPopulate = directories.shift();
    // eslint-disable-next-line no-await-in-loop
    await fs.ensureDir(dirToPopulate);

    const pagesToGenerate = Math.min(pagesPerDir, remainingPages);
    const childPages = [];
    for (let i = 0; i < pagesToGenerate; i += 1) {
      childPages.push(
        fs.outputFile(
          path.join(dirToPopulate, `page-${i}.md`),
          `# Page title

some content`,
        ),
      );
    }

    // eslint-disable-next-line no-await-in-loop
    await Promise.all(childPages);
    remainingPages -= pagesToGenerate;

    for (let i = 0; i < branchingFactor; i += 1) {
      directories.push(path.join(dirToPopulate, `dir-${i}`));
    }
  }
};

describe('Website generation load tests', () => {
  it('can build a project with a mid size docs structure', async () => {
    const projectCwd = await copyFixtureIntoTempDir(
      __dirname,
      'load-test-project',
    );

    const docsConfigLocation = path.join(projectCwd, 'docs.config');

    await generateDocs(path.join(projectCwd, 'docs', 'generated'), 100);

    let timingFinished;
    const getBuildTime = new Promise(resolve => {
      timingFinished = resolve;
    });

    const obs = new PerformanceObserver(items => {
      const { duration } = items.getEntries()[0];
      performance.clearMarks();
      timingFinished(duration);
    });
    obs.observe({ entryTypes: ['measure'] });

    performance.mark('BUILD_BEGIN');
    await build(docsConfigLocation);
    performance.mark('BUILD_END');

    performance.measure('Build time', 'BUILD_BEGIN', 'BUILD_END');

    const buildTime = await getBuildTime;
    obs.disconnect();

    expect(buildTime).toBeLessThan(10000);
  });
});
