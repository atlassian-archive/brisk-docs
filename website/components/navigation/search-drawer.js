import { Component } from 'react';
import PropTypes from 'prop-types';
import { QuickSearch, ResultBase, ResultItemGroup } from '@atlaskit/quick-search';
import Drawer from '@atlaskit/drawer';
import capitalize from 'lodash.capitalize';
import data from '../../data/pages-list.json';
import Link from './link-component';

const prettyTitle = id =>
    id
        .split('-')
        .map(capitalize)
        .join(' ');

const remapPages = (pages, packageId, type) =>
    pages.map(({ id, pagePath: path }) => ({
        id,
        title: prettyTitle(id),
        path,
        type,
        package: packageId,
    }));

// We will likely change this because this is very suboptimal. Relies on some down-the-line display decisions
const newData = data.packages.map(({ packageId, homePath, docs, examples }) => ({
    title: packageId,
    pages: [
        { id: 'readme', title: 'Readme', path: homePath, type: 'readme' },
        ...remapPages(docs, packageId, 'package-docs'),
        ...remapPages(examples, packageId, 'package-examples'),
    ],
}));

class SearchDrawer extends Component {
    state = {
        query: '',
    };

    filterPage = (packageId, { title: pageTitle }) => {
        const { query } = this.state;
        return (
            packageId.toLowerCase().includes(query.toLowerCase()) ||
            pageTitle.toLowerCase().includes(query.toLowerCase())
        );
    };

    filterPackages = () => {
        const stuff = newData.map(({ title, pages }) => {
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
            <Drawer isOpen={isOpen} width="medium" shouldUnmountOnExit onClose={closeDrawer}>
                <QuickSearch
                    linkComponent={Link}
                    onSearchInput={event => this.setState({ query: event.currentTarget.value })}
                    placeholder="Filter documents by name or package"
                >
                    {this.filterPackages()}
                </QuickSearch>
            </Drawer>
        );
    }
}

SearchDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
};

export default SearchDrawer;
