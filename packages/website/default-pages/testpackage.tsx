import React from 'react';
import { Route } from 'react-router-dom';

const view = () => <div>This is a test page for routing</div>;

export default () => <Route path="/testpackage" component={view} />;
