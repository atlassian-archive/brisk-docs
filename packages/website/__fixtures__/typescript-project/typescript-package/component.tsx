// This example demonstrates a react component written in tsx
import React from 'react';

export interface HelloProps {
  compiler: string;
}

export default ({ compiler }: HelloProps) => <h1>Hello from {compiler}!</h1>;
