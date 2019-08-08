import React from 'react';
import styled from 'styled-components';
import { css, cx } from 'emotion';

const Thing = styled.div`
  height: 30px;
  width: 30px;
  background-color: rebeccapurple;
`;

const simple = css`
  height: 30px;
  width: 30px;
  background-color: hotpink;
`;

export default () => (
  <div>
    <Thing />
    <div className={cx(simple)} />
    {/* <div
      css={{
        height: '90px',
        width: '90px',
        backgroundColor: 'hotpink',
      }}
    >
      Lol no
    </div> */}
    <h2>&lt;ul&gt;</h2>
    <ul>
      <li>First list item</li>
      <li>Second list item</li>
      <li>
        <p>Third list item</p>
        <ul>
          <li>Nested lists as well</li>
          <li>Nested lists as well</li>
          <li>Nested lists as well</li>
        </ul>
      </li>
      <li>
        <p>Fourth list item</p>
        <ol>
          <li>Nested ordered lists as well</li>
          <li>Nested ordered lists as well</li>
          <li>Nested ordered lists as well</li>
        </ol>
      </li>
    </ul>
  </div>
);
