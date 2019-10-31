/* eslint-disable import/no-extraneous-dependencies */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
};

Enzyme.configure({ adapter: new Adapter() });
