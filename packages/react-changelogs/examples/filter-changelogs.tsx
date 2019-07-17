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
## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  padding-right: ${math.multiply(gridSize, 2)}px;
`;

const FilterChangeLogs = () => {
  const [range, updateRange] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateRange(event.target.value);
  };

  return (
    <div>
      <FieldWrapper>
        <input
          type="text"
          onChange={handleChange}
          placeholder={'Semver Range: e.g. "> 1.0.6 <= 3.0.2"'}
          value={range}
        />
      </FieldWrapper>
      <Changelog changelog={data} getUrl={() => null} range={range} />
    </div>
  );
};

export default FilterChangeLogs;
