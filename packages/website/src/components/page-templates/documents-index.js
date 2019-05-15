import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
} from '@atlaskit/table-tree';
import SectionMessage from '@atlaskit/section-message';
import titleCase from 'title-case';
import Page, { Section, Title } from '../page';
import pageInfo from '../../pages-list';
import DocsNavContent from '../navigation/docs-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import PageTitle from '../page-title';
import Link from '../switch-link';

const NoDocsMessage = () => (
  <SectionMessage appearance="warning">
    We couldn&apos;t find any document pages in your provided docs directory
  </SectionMessage>
);

class DocsTable extends React.Component {
  state = { expansionMap: {} };

  render() {
    const { expansionMap } = this.state;
    const { docKey } = this.props;
    return (
      <Section>
        <TableTree>
          <Headers>
            <Header width={300}>Name</Header>
            <Header width={400}>Path</Header>
          </Headers>
          <Rows
            items={pageInfo[docKey]}
            render={({ id, pagePath, children }) => (
              <Row
                itemId={id}
                items={children}
                hasChildren={children && children.length > 0}
                isExpanded={Boolean(expansionMap[id])}
                onExpand={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [id]: true,
                    },
                  })
                }
                onCollapse={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [id]: false,
                    },
                  })
                }
              >
                <Cell singleLine>{titleCase(id)}</Cell>
                <Cell>
                  <Link href={pagePath}>
                    <a>{pagePath}</a>
                  </Link>
                </Cell>
              </Row>
            )}
          />
        </TableTree>
      </Section>
    );
  }
}

DocsTable.propTypes = {
  docKey: PropTypes.string,
};

const Docs = ({ data }) => (
  <>
    <PageTitle title={titleCase(data.key)} />
    <NavigationWrapper navContent={() => <DocsNavContent docId={data.key} />}>
      <Page>
        <Title>{`${titleCase(data.key)} Overview`}</Title>
        {Object.keys(pageInfo).slice(1).length > 0 ? (
          <DocsTable docKey={data.key} />
        ) : (
          <NoDocsMessage />
        )}
      </Page>
    </NavigationWrapper>
  </>
);

Docs.propTypes = { data: { key: PropTypes.string } };
export default Docs;
