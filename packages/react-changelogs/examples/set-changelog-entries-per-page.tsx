import * as React from 'react';
import styled from '@emotion/styled';
import { gridSize, math } from '@atlaskit/theme';
import Changelog from '../src/components/changelog';

const data = `# This package itself

## 1.0.0
- [major] 24601
## 0.5.0
- [minor] Who am I?
## 0.4.3
- [patch] And so, Honor, you see it's true,
- [minor] That man bears no more guilt than you!
## 0.3.9
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.8
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.7
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.6
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.5
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.4
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.3
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.2
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.1
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.3.0
- [patch] Who am I?
- [patch] I am Jean Valjean!
## 0.2.9
- [patch] Who am I?
- [patch] I am Jean Valjean!`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  padding-right: ${math.multiply(gridSize, 2)}px;
`;

export default class SetChangelogEntriesPerPage extends React.Component {
  state = { entriesPerPage: 20 };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ entriesPerPage: event.target.value });
  };

  render() {
    const { entriesPerPage } = this.state;
    return (
      <div>
        <FieldWrapper>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Choose number of logs to display per page"
            value={entriesPerPage}
          />
        </FieldWrapper>
        <Changelog
          changelog={data}
          getUrl={() => null}
          entriesPerPage={entriesPerPage}
        />
      </div>
    );
  }
}
