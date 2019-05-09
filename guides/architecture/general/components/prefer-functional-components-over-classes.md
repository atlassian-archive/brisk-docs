# Prefer functional components over classes

Functional components have several advantages over classes: smaller bundle size and less boilerplate code.
With hooks coming in React@16.8 we can utilise functional components to the fullest.

## Why not to use classes

**Bundle size**.
The main reason for the change is the fact, that classes as components significantly increase bundle size.

If we take the following class:
```js
import React, { Component } from 'react';
 
export class MyComponent extends Component {
    static defaultProps = {
        foo: 'bar'
    };
   
    render() {
        return <div>Hello</div>;
    }
}
```

It will produce the following output:

```js
var MyComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(MyComponent, _Component);
 
  function MyComponent() {
    _classCallCheck(this, MyComponent);
 
    return _possibleConstructorReturn(this, _getPrototypeOf(MyComponent).apply(this, arguments));
  }
 
  _createClass(MyComponent, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, "Hello");
    }
  }]);
 
  return MyComponent;
}(_react.Component);
 
exports.MyComponent = MyComponent;
 
_defineProperty(MyComponent, "defaultProps", {
  foo: 'bar'
});
```

If we define the same component as functional:

```js

function MyComponent() {
  return (
    <div>Hello</div>
  );
}
 
MyComponent.defaultProps = {
    foo: 'bar'
};
 
export default MyComponent;
```

we'll get the following output:

```js
function MyComponent() {
  return _react.default.createElement("div", null, "Hello");
}
 
MyComponent.defaultProps = {
  foo: 'bar'
};
var _default = MyComponent;
exports.default = _default;
```

You can check it out in [babel playground](https://babeljs.io/en/repl)

**When to use classes**

Migration to hooks might take a while, so it makes sense to keep using classes for statefull components or when lifecycle methods are required.

**Prefer functions over lambdas**
Functions are more preferable over lambdas as it has less symbol "noise" and better syntax highlighting:

```js
const MyComponent = ({
  method = () => {},
  arg = true
}) => {}
```
vs
```js
function MyComponent({
  method = () => {},
  arg = true
}) {}
```

**Don'ts**
Never default export unnamed functions, e.g.
```js
export default () => <div />;
```
as it will fallback into `Unknown` in react-dev-tools, which will make your team mates lifes really really hard.
