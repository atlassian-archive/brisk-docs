import divideChangelog from '../src/utils/divide-changelog';

const initialProps = `# This package itself

## 1.0.0
- [major] 24601
## 0.5.0
- [minor] Who am I?
## 0.4.3
- [patch] And so, Honor, you see it's true,
- [minor] That man bears no more guilt than you!
## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!`;

describe('create change logs array ', () => {
  it('converts change log string into array of items', () => {
    expect(divideChangelog(initialProps)).toEqual([
      {
        version: '1.0.0',
        md: `## 1.0.0
- [major] 24601`,
      },
      {
        version: '0.5.0',
        md: `## 0.5.0
- [minor] Who am I?`,
      },
      {
        version: '0.4.3',
        md: `## 0.4.3
- [patch] And so, Honor, you see it's true,
- [minor] That man bears no more guilt than you!`,
      },
      {
        version: '0.4.2',
        md: `## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!`,
      },
    ]);
  });
});
