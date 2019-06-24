import * as React from 'react';
import styled from '@emotion/styled';
import Tree from '@atlaskit/tree';
import titleCase from 'title-case';
import { colors } from '@atlaskit/theme';
import LinkWithRouter from './link-with-router';
import { DocsPage, Page } from '../../../types';

const ParentWrapper = styled.div`
  font-size: 10px;
  margin: 4px 0;
  padding: 0;
  color: ${colors.N200};
  text-transform: uppercase;
`;

const isDocsPage = (item: any): item is DocsPage => {
  return item.meta != null;
};

const getTitle = (item: Page) => {
  return (isDocsPage(item) && item.meta.title) || item.id;
};

// Flatten the nested page structure into an object that ak/tree understands
const arrayToTreeItems = (
  arrayItems: Array<Page>,
  {
    parentId,
    parentTitle,
    parentPath,
  }: { parentId: string; parentTitle: string; parentPath?: string },
): any => ({
  // TODO: TSFix - this is return type to be specific
  [parentId]: {
    id: parentId,
    isHeading: !!arrayItems.length,
    isExpanded: true,
    children: arrayItems.map(sub => `${parentId}/${sub.id}`),
    data: {
      title: parentTitle,
      href: parentPath,
    },
  },
  ...arrayItems.reduce((acc, sub) => {
    const id = `${parentId}/${sub.id}`;

    if (sub.children) {
      return {
        ...acc,
        ...arrayToTreeItems(sub.children, {
          parentId: id,
          parentTitle: getTitle(sub),
          parentPath: sub.pagePath,
        }),
      };
    }

    return {
      ...acc,
      [id]: {
        id,
        children: [],
        data: {
          title: getTitle(sub),
          href: sub.pagePath,
        },
      },
    };
  }, {}),
});

type TreeItemProps = {
  item: {
    id: string;
    isHeading: boolean;
    hasChildren: boolean;
    data: {
      href: string;
      title: string;
    };
  };
  provided: {
    draggableProps: Object;
    innerRef: () => any;
  };
};

const TreeItem = ({ item, provided }: TreeItemProps) => {
  const { id, data, isHeading } = item;
  const text = titleCase(data.title);
  if (data.href) {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <LinkWithRouter
          isHeading={isHeading}
          href={data.href}
          id={id}
          text={text}
        />
      </div>
    );
  }

  return (
    <ParentWrapper ref={provided.innerRef} {...provided.draggableProps} id={id}>
      {text}
    </ParentWrapper>
  );
};

export type Props = {
  treeData: {
    rootId: string;
    items: Object;
  };
};

const TreeNavContent = ({ treeData }: Props) => (
  <Tree offsetPerLevel={16} tree={treeData} renderItem={TreeItem} />
);

export { arrayToTreeItems };
export default TreeNavContent;
