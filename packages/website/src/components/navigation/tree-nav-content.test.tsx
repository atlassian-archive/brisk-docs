import { arrayToTreeItems } from './tree-nav-content';

describe('Tree nav content', () => {
  describe('arrayToTreeItems function', () => {
    it('should convert an array page structure into an ak/tree compatible object', () => {
      const treeItems = arrayToTreeItems(
        [
          {
            id: 'page-1',
            pagePath: '/packages/mock-package1/docs/page-1',
            meta: {
              title: 'Page 1',
            },
          },
          {
            id: 'page-2',
            pagePath: '/packages/mock-package1/docs/page-2',
            meta: {
              title: 'Page 2',
            },
          },
        ],
        {
          parentId: 'mock-package-1',
          parentTitle: 'mock-package-1',
        },
      );
      expect(treeItems).toEqual({
        'mock-package-1': {
          children: ['mock-package-1/page-1', 'mock-package-1/page-2'],
          data: {
            href: undefined,
            title: 'mock-package-1',
          },
          id: 'mock-package-1',
          isExpanded: true,
          isHeading: true,
        },
        'mock-package-1/page-1': {
          children: [],
          data: {
            href: '/packages/mock-package1/docs/page-1',
            title: 'page-1',
          },
          id: 'mock-package-1/page-1',
        },
        'mock-package-1/page-2': {
          children: [],
          data: {
            href: '/packages/mock-package1/docs/page-2',
            title: 'page-2',
          },
          id: 'mock-package-1/page-2',
        },
      });
    });

    it('should not convert the parent item into a heading if it has no arrayItems children', () => {
      const result = arrayToTreeItems([], {
        parentId: 'mock-package-1',
        parentTitle: 'mock-package-1',
      });

      expect(result['mock-package-1'].isHeading).toBe(false);
      expect(result).toEqual({
        'mock-package-1': {
          id: 'mock-package-1',
          isHeading: false,
          isExpanded: true,
          children: [],
          data: {
            title: 'mock-package-1',
            href: undefined,
          },
        },
      });
    });

    it('should set title of items from meta.title if it exists', () => {
      const treeItems = arrayToTreeItems(
        [
          {
            id: 'page-1',
            pagePath: '/packages/mock-package1/docs/page-1',
            meta: {
              title: 'First page',
            },
          },
          {
            id: 'page-2',
            pagePath: '/packages/mock-package1/docs/page-2',
            meta: {
              title: 'Page 2',
            },
          },
        ],
        {
          parentId: 'mock-package-1',
          parentTitle: 'mock-package-1',
        },
      );
      expect(treeItems['mock-package-1/page-1'].data.title).toEqual(
        'First page',
      );
      expect(treeItems['mock-package-1/page-2'].data.title).toEqual('page-2');
    });
  });
});
