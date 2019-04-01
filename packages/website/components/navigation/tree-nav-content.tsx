import * as React from 'react';
import { Item } from '@atlaskit/navigation-next';
import Tree from '@atlaskit/tree';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';

type Item =
  | { id: string; children: Array<Item> }
  | { id: string; pagePath: string; children: undefined };

type ArrayItems = Array<Item>;

// Flatten the nested page structure into an object that ak/tree understands
const arrayToTreeItems = (
  arrayItems: ArrayItems,
  { parentId, parentTitle }: { parentId: string; parentTitle: string },
): any => ({
  // TODO: TSFix - this is return type to be specific
  [parentId]: {
    id: parentId,
    hasChildren: true,
    isExpanded: true,
    children: arrayItems.map(sub => `${parentId}/${sub.id}`),
    data: {
      title: parentTitle,
    },
  },
  ...arrayItems.reduce((acc, sub) => {
    const id = `${parentId}/${sub.id}`;

    if (sub.children) {
      return {
        ...acc,
        ...arrayToTreeItems(sub.children, {
          parentId: id,
          parentTitle: sub.id,
        }),
      };
    }

    return {
      ...acc,
      [id]: {
        id,
        children: [],
        hasChildren: false,
        data: {
          title: sub.id,
          href: sub.pagePath,
        },
      },
    };
  }, {}),
});

type TreeItemProps = {
  item: {
    id: string;
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
  const { id, hasChildren, data } = item;

  if (!hasChildren) {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <LinkWithRouter href={data.href} id={id} text={titleCase(data.title)} />
      </div>
    );
  }

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Item id={id} text={titleCase(data.title)} />
    </div>
  );
};

export type Props = {
  treeData: {
    rootId: string;
    items: Object;
  };
};

const TreeNavContent = ({ treeData }: Props) => (
  <Tree tree={treeData} renderItem={TreeItem} />
);

export { arrayToTreeItems };
export default TreeNavContent;
