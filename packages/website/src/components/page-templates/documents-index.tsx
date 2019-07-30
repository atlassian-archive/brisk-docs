import * as React from 'react';
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
import { getTitle } from '../../model/page';
import { DocsPage } from '../../../types';

const NoDocsMessage = () => (
  <SectionMessage appearance="warning">
    We couldn&apos;t find any document pages in your provided docs directory
  </SectionMessage>
);

type DocsTableProps = {
  docKey: string;
};

type DocsTableState = {
  expansionMap: {
    [pageId: string]: boolean;
  };
};

class DocsTable extends React.Component<DocsTableProps, DocsTableState> {
  state: DocsTableState = { expansionMap: {} };

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
            render={(page: DocsPage) => (
              <Row
                itemId={page.id}
                items={page.children}
                hasChildren={page.children && page.children.length > 0}
                isExpanded={Boolean(expansionMap[page.id])}
                onExpand={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [page.id]: true,
                    },
                  })
                }
                onCollapse={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [page.id]: false,
                    },
                  })
                }
              >
                <Cell singleLine>{getTitle(page)}</Cell>
                <Cell>
                  <Link href={page.pagePath}>
                    {() =>
                      page.pagePath.replace(new RegExp(`^/?${docKey}/`), '')
                    }
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

type DocsProps = {
  data: {
    key: string;
  };
};

const Docs = ({ data }: DocsProps) => (
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

export default Docs;
