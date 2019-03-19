import filterChangelog from '../src/utils/filter-changelog';

const initialProps = [
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
];

describe('filter change logs array',() => {
    it('returns the original array when range is not given', () => {
        expect(filterChangelog(initialProps)).toEqual(initialProps);
    });

    it('returns the filtered array according to given range', () => {
        expect(filterChangelog(initialProps, ">0.4.3")).toEqual([
            {
                version: '1.0.0',
                md: `## 1.0.0
- [major] 24601`,
            },
            {
                version: '0.5.0',
                md: `## 0.5.0
- [minor] Who am I?`,
            },]);
    });
});
