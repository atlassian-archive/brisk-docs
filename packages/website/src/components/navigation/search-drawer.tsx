import * as React from 'react';
import {
  QuickSearch,
  ResultBase,
  ResultItemGroup,
} from '@atlaskit/quick-search';
import Drawer from '@atlaskit/drawer';
import capitalize from 'lodash.capitalize';
import data from '../../pages-list';
import Link from './link-component';
import { Pages } from '../../../types';

const prettyTitle = (id: string) =>
  id
    .split('-')
    .map(capitalize)
    .join(' ');

const remapPages = (pages: Pages, packageId: string, type: string) =>
  pages.map(({ id, pagePath: path }) => ({
    id,
    title: prettyTitle(id),
    path,
    type,
    package: packageId,
  }));

// We will likely change this because this is very suboptimal. Relies on some down-the-line display decisions
const newData = data.packages.map(
  ({ packageId, homePath, docs, examples, parentId }) => ({
    title: parentId
      ? `${parentId.split('/').join(' -> ')} -> ${packageId}`
      : packageId,
    pages: [
      { id: 'readme', title: 'Readme', path: homePath, type: 'readme' },
      ...remapPages(docs, packageId, 'package-docs'),
      ...remapPages(examples, packageId, 'package-examples'),
    ],
  }),
);

const remapChild = (pages: Pages, docId: string, type: string) =>
  pages.map(({ id, pagePath: path }) => ({
    id,
    title: prettyTitle(id),
    path,
    type,
    parent: docId,
  }));

const getDocuments = () =>
  Object.keys(data)
    .slice(1)
    .map(docs =>
      // @ts-ignore
      data[docs].map(({ id, pagePath, children }) => ({
        title: id,
        pages: children
          ? [...remapChild(children || [], id, 'nested-docs')]
          : [{ id: 'readme', title: id, path: pagePath, type: 'readme' }],
      })),
    );

const newDocs: any[] = [];
getDocuments().forEach(x => newDocs.push(...x));

export type Props = {
  isOpen: boolean;
  closeDrawer: () => any;
};

class SearchDrawer extends React.Component<Props> {
  state = {
    query: '',
  };

  filterPage = (packageId: string, { title: pageTitle }: { title: string }) => {
    const { query } = this.state;
    return (
      packageId.toLowerCase().includes(query.toLowerCase()) ||
      pageTitle.toLowerCase().includes(query.toLowerCase())
    );
  };

  filterPackagesAndDocs = () => {
    const parsedData = newDocs.length > 0 ? newData.concat(newDocs) : newData;
    const stuff = parsedData.map(({ title, pages }) => {
      const newNewPages = pages.filter(page => this.filterPage(title, page));
      if (newNewPages.length < 1) return null;
      return (
        // NB this margin counteracts a negative margin in `@atlaskit/item, a package
        // that should be erased from existence.
        <div key={title} style={{ marginLeft: '12px' }}>
          <ResultItemGroup title={title}>
            {newNewPages.map(({ title: pageTitle, path }) => (
              <ResultBase
                key={pageTitle}
                text={pageTitle}
                href={path}
                resultId={path}
                // TODO: Figure out what this prop does in resultBase
                type=""
              />
            ))}
          </ResultItemGroup>
        </div>
      );
    });

    if (stuff.filter(a => a).length < 1) {
      return (
        <div>
          Sorry, we can
          {"'"}t find anything matching that search!
        </div>
      );
    }
    return stuff;
  };

  render() {
    const { isOpen, closeDrawer } = this.props;

    return (
      <Drawer
        isOpen={isOpen}
        width="medium"
        shouldUnmountOnExit
        onClose={closeDrawer}
      >
        <QuickSearch
          linkComponent={Link}
          onSearchInput={event =>
            this.setState({ query: event.currentTarget.value })
          }
          placeholder="Filter documents by name or package"
        >
          {this.filterPackagesAndDocs()}
        </QuickSearch>
      </Drawer>
    );
  }
}

export default SearchDrawer;
