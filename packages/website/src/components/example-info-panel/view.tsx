import * as React from 'react';
import Tabs from '@atlaskit/tabs';
import { gridSize, math, colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import 'prismjs/themes/prism-tomorrow.css';

import CodePanel from './code-panel';
import { ConsumerProps as ExtensionsConsumerProps } from '../extensions';

const Collapsible = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${math.multiply(gridSize, 100)}px;
  transition: width 0.2s;
  overflow-x: auto;
  overflow-y: scroll;
  border-left: 1px solid ${colors.N30};

  &.collapsed {
    width: 0;
    overflow: hidden;
  }
`;

const TabContent = styled.div`
  flex-grow: 0;
`;

const PanelContent = styled.div`
  flex-grow: 1;
`;

export interface Props {
  isExpanded: boolean;
  fileContents: string;
}

type InjectedProps = {
  ExtensionsConsumer: React.ComponentType<ExtensionsConsumerProps>;
} & Props;

type State = {
  selectedTab: number;
};

class ExampleInfoPanel extends React.Component<InjectedProps, State> {
  constructor(props: InjectedProps) {
    super(props);

    this.state = { selectedTab: 0 };
  }

  onTabSelected = (_selected: any, tabIndex: number) => {
    this.setState({ selectedTab: tabIndex });
  };

  render() {
    const { isExpanded, fileContents, ExtensionsConsumer } = this.props;
    const { selectedTab } = this.state;
    const basePanels = [
      { label: 'Code', panel: <CodePanel fileContents={fileContents} /> },
    ];

    return (
      <Collapsible className={isExpanded ? 'expanded' : 'collapsed'}>
        <ExtensionsConsumer extensionPoint="examples-info-panel">
          {extensions => {
            const panels = [
              ...basePanels,
              ...extensions.map(({ Component, meta }) => ({
                label: meta.label,
                panel: <Component fileContents={fileContents} />,
              })),
            ];

            return (
              <React.Fragment>
                {panels.length > 1 ? (
                  <TabContent>
                    <Tabs
                      tabs={panels.map(({ label }) => ({
                        label,
                        content: null,
                      }))}
                      onSelect={this.onTabSelected}
                      selected={selectedTab}
                    />
                  </TabContent>
                ) : null}
                <PanelContent>{panels[selectedTab].panel}</PanelContent>
              </React.Fragment>
            );
          }}
        </ExtensionsConsumer>
      </Collapsible>
    );
  }
}

export default ExampleInfoPanel;
