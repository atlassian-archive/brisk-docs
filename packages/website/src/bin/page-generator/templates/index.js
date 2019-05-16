const changelogTemplate = require('./changelog');
const example = require('./example');
const singleComponentTemplate = require('./single-component');
const wrappedComponentTemplate = require('./wrapped-component');

module.exports.changelogTemplate = changelogTemplate;
module.exports.exampleTemplate = example.exampleTemplate;
module.exports.singleComponentTemplate = singleComponentTemplate;
module.exports.wrappedComponentTemplate = wrappedComponentTemplate;
module.exports.exampleWithDecoratorTemplate =
  example.exampleWithDecoratorTemplate;
