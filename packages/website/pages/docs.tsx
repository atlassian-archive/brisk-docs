import * as React from 'react';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
} from '@atlaskit/table-tree';
import Link from 'next/link';
import titleCase from 'title-case';

import Page, { Section, Title } from '../components/page';
import pageInfo from '../pages-list';
import DocsNavContent from '../components/navigation/docs-nav-content';
import NavigationWrapper from '../components/navigation-wrapper';
import PageTitle from '../components/page-title';

export default class Docs extends React.Component {
  state = {
    expansionMap: {},
  };

  render() {
    const { expansionMap } = this.state;

    return (
      <>
        <PageTitle title="Documents" />
        <NavigationWrapper navContent={DocsNavContent}>
          <Page>
            <Title>Documents Overview</Title>
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
          </Page>
        </NavigationWrapper>
      </>
    );
  }
}
