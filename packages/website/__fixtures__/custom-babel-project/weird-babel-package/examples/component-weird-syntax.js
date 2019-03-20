import React from 'react';

const Example = props => (
  <div>
    <h1>Hello</h1> <p>Thank you for building me.</p>
    <p>You are visitor #</p>
    {props?.visitor?.count}
  </div>
);

export default () => <Example visitor={{ count: 1000 }} />;
