#!/usr/bin/env node
/* eslint-disable strict */

'use strict';

const runBinary = require('./').default;

runBinary().catch(e => console.error(e));
