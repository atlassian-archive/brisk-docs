import * as React from 'react';
import styled from 'styled-components';
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
## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  padding-right: ${math.multiply(gridSize, 2)}px;
`;

export default class FilterChangeLogs extends React.Component {
  state = { range: '' };

   handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       this.setState({range: event.target.value});
    };

  render () {
   const { range } = this.state;
    return (
      <div>
        <FieldWrapper>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder={'Semver Range: e.g. "> 1.0.6 <= 3.0.2"'}
            value={range}
          />
        </FieldWrapper>
        <Changelog changelog={data} getUrl={() => null} range={range}/>
      </div>
    )
  }
}
