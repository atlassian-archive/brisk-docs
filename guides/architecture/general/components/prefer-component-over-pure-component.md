# With classes, prefer Component over PureComponent

There is sometimes a perception that PureComponents should be used whenever possible to improve
performance of React application.

In large scale applications, especially when there are multiple teams contributing to it, the
benefit of using PureComponents is highly outweighed by the downsides and in tangerine apps is not
recommended.

## Why not to use it

**Performance**. Contrary to the popular opinion PureComponents might actually harm performance if
not used carefully. This is due to the fact that PureComponent implements shouldComponentUpdate with
shallow comparison of state and props, which means that for every function or object or array that
are created within render that check will return true and React will continue its normal
reconciliation process. That basically means that for every render React will perform one additional
operation that does nothing, and code like that for a class that extends PureComponent is slightly
slower than it might be:

```javascript
render() {
  return <AwesomePureComponent someProp={[1,2,3]}/> // new array every time
}

render() {
  return <AwesomePureComponent onClick={() => this.doSomething}/> // new function every time
}

render() {
  return <AwesomePureComponent someProp={{ id: 1 }}/> // new object every time
}

render() {
  return <AwesomePureComponent someProp={someArray.map(mapSomething)}/> // new array every time
}

render() {
  return <AwesomePureComponent someProp={someArray.filter(filterSomething)}/> // new array every time
}

render() {
  return <AwesomePureComponent SomeComponent={<AnotherAwesomeComponent />}/> // new function every time
}
```

Considering that those examples can be seen in every single React tutorial and patterns like that
are extremely common, it is quite easy to make a mistake like this.

**Very limited use**. `shouldComponentUpdate` of the PureComponent
[will skip prop updates](https://reactjs.org/docs/react-api.html#reactpurecomponent) for the whole
component subtree, which means that either it should be a leaf component, or all its children should
be pure as well.

**Novice developers friendliness**.
[Performance optimisations](https://reactjs.org/docs/optimizing-performance.html) is a topic that
requires advanced knowledge of not only React features, but deep understanding of React's
architecture and mechanisms. Most developers that are new to React will not have that knowledge. And
considering how easy it is to make a mistake here and that mistake may affect something as crucial
as performance of a large scale application, PureComponents are not novice developer friendly
feature.

## When to use it

As always with performance, "measure first" should be the very first step. Use them **only** when
there are performance considerations for your application, regressions are identified and measured,
impact of introducing PureComponents is measured and checked, and you have performance monitoring in
place.
