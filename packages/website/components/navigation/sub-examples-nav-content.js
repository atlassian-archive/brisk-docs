import {
  Item,
} from '@atlaskit/navigation-next';
import Tree from '@atlaskit/tree';
import * as PropTypes from 'prop-types';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';

// Flatten the nested page structure into an object that ak/tree understands
const docsToTreeItems = (subExamples, { parentId, parentTitle }) => ({
  [parentId]: {
    id: parentId,
    hasChildren: true,
    isExpanded: true,
    children: subExamples.map(sub => `${parentId}/${sub.id}`),
    data: {
      title: parentTitle,
    },
  },
  ...subExamples.reduce((acc, sub) => {
    const id = `${parentId}/${sub.id}`;

    if (sub.children) {
      return {
        ...acc,
        ...docsToTreeItems(sub.children, {
          parentId: id,
          parentTitle: sub.id,
        }),
      };
    }

    return {
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

const renderTreeItem = ({ item, provided }) => {
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

renderTreeItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  provided: PropTypes.shape({
    draggableProps: PropTypes.object.isRequired,
  }).isRequired,
};

const SubExampleNavContent = ({ subExamples }) => {
  const treeData = {
    rootId: 'subExamples',
    items: docsToTreeItems(subExamples, {
      parentId: 'subExamples',
      parentTitle: 'sub examples',
    }),
  };

  return (
    <Tree tree={treeData} renderItem={renderTreeItem} />
  );
};

SubExampleNavContent.propTypes = {
  subExamples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pagePath: PropTypes.string,
    }),
  ).isRequired,
};

export default SubExampleNavContent;
