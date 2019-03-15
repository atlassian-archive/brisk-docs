import {
  BackItem,
  MenuSection,
  Separator,
  Item,
} from '@atlaskit/navigation-next';
import Tree from '@atlaskit/tree';
import * as PropTypes from 'prop-types';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import pageInfo from '../../pages-list';
import LinkComponent from './link-component';
import NavHeader from './nav-header';

// Flatten the nested page structure into an object that ak/tree understands
const docsToTreeItems = (docsPages, { parentId, parentTitle }) => ({
  [parentId]: {
    id: parentId,
    hasChildren: true,
    isExpanded: true,
    children: docsPages.map(doc => `${parentId}/${doc.id}`),
    data: {
      title: parentTitle,
    },
  },
  ...docsPages.reduce((acc, doc) => {
    const id = `${parentId}/${doc.id}`;

    if (doc.children) {
      return {
        ...acc,
        ...docsToTreeItems(doc.children, {
          parentId: id,
          parentTitle: doc.id,
        }),
      };
    }

    return {
      [id]: {
        id,
        children: [],
        hasChildren: false,
        data: {
          title: doc.id,
          href: doc.pagePath,
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

const NavContent = () => {
  const treeData = {
    rootId: 'docs',
    items: docsToTreeItems(pageInfo.docs, {
      parentId: 'docs',
      parentTitle: 'Docs',
    }),
  };

  return (
    <>
      <NavHeader headerText="Docs" />
      <MenuSection id="docs-section" parentId="index-section">
        {({ className }) => (
          <div className={className}>
            <BackItem text="Back to home" href="/" component={LinkComponent} />
            <Separator />
            <Tree tree={treeData} renderItem={renderTreeItem} />
          </div>
        )}
      </MenuSection>
    </>
  );
};

export default NavContent;
