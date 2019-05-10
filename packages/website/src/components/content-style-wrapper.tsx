import styled from '@emotion/styled';
import { math, gridSize } from '@atlaskit/theme';

export default styled.div`
  max-width: ${math.multiply(gridSize, 130)}px;
  padding: 0 ${math.multiply(gridSize, 5)}px;
  margin: ${math.multiply(gridSize, 5)}px auto;
`;
