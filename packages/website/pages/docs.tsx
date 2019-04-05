import * as React from 'react';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
} from '@atlaskit/table-tree';
import SectionMessage from '@atlaskit/section-message';
import Link from 'next/link';
import titleCase from 'title-case';

import Page, { Section, Title } from '../components/page';
import pageInfo from '../pages-list';
import DocsNavContent from '../components/navigation/docs-nav-content';
import NavigationWrapper from '../components/navigation-wrapper';
import PageTitle from '../components/page-title';

const NoDocsMessage = () => (
  <SectionMessage appearance="warning">
    We couldn&apos;t find any docs pages in your provided docs directory
  </SectionMessage>
);

type State = { expansionMap: { [s: string]: boolean } };

class DocsTable extends React.Component<{}, State> {
  state: State = { expansionMap: {} };

  render() {
    const { expansionMap } = this.state;

    return (
      <Section>
        <TableTree>
          <Headers>
            <Header width={300}>Name</Header>
            <Header width={400}>Path</Header>
          </Headers>
          <Rows
            items={pageInfo.docs}
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

const Docs = () => (
  <>
    <PageTitle title="Documents" />
    <NavigationWrapper navContent={DocsNavContent}>
      <Page>
        <Title>Documents Overview</Title>
        {pageInfo.docs ? <DocsTable /> : <NoDocsMessage />}
      </Page>
    </NavigationWrapper>
  </>
);

export default Docs;
