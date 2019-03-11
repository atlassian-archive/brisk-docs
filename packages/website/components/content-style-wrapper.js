import styled from 'styled-components';
import { math, gridSize } from '@atlaskit/theme';

export default styled.div`
  max-width: ${math.multiply(gridSize, 85)}px;
  margin: ${math.multiply(gridSize, 5)}px auto;
`;
