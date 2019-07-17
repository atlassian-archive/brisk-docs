#!/usr/bin/env node
/* eslint-disable strict */

'use strict';

const runPipeline = require('./').default;

runPipeline().catch(e => console.error(e));
