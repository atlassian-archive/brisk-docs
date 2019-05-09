# State management: core concepts

Up until recently, we have been using Redux for most of our state management concerns. This provided
us with some significant benefits, one of them being that **Redux is a well-established pattern**
and well-understood from the community perspective. Chances are, if someone new comes to Atlassian
who has experience with React, they will know Redux as well. Also, it is very **formal, structured
and testable**, which helped a lot in creating previous Tangerine guidelines and principles on
structuring apps.

Despite that, Redux has its disadvantages as well.

**It is designed to own all the state**. This does not help developers to think about more granular
types of state that might have different, more suitable patterns. Instead, it encourages treating of
the state as a homogenous pattern, to basically implement big monolithic state machines instead of
thinking more about separation of concerns. This is very similar to the situation with CSS in the
"old days" when the common practice was to have a series of CSS/Less/SASS files, that contained all
of the CSS selectors that were bound to the DOM elements somewhere outside. It had a decent
structure, people invented good rules and architectures around it (BEM - Block Element Modifier
being one of them), but also it required a lot of infrastructure to manage it, and it still was
overwhelming and fundamentally hard to scale to big applications. When the patterns like CSS modules
or CSS-in-js emerged, and it became possible to collocate styles with components, they did not
become just a better solution to a problem that BEM/SASS tried to solve, they changed the rules
entirely and made the problem became irrelevant instead. This is essentially the goal of this page.

**It is fundamentally imperative**. Most of the state management patterns in React are trending
towards being implemented in the components interface itself, which is fundamentally declarative.
And one of the biggest challenges in React since it emerged was that declarative interfaces and the
concept of uni-directional data flow are hard to map between imperative and declarative interfaces.
Because of that, it is quite hard to delegate pieces of state to any declarative state management
solution like Apollo for data fetching or React-router for router state.

**Cross-apps communication vacuum**. Current architecture treats all apps as their own state
containers, where all the state management concerns are completely isolated, and all communication
happens through their public interface, i.e., props API. This is a really clean architecture, and if
instead of that state that all the teams work on was put into one single store, it would have been a
massive scale problem. Unfortunately, it left something of a vacuum around how to deal with the
state that is cross-cutting across apps or sits across multiple layers of the components hierarchy.
And Redux discourages that because of its tendency to monolithic stores, difficulties to syncing it
with other state management solutions, and the fact that one global Redux store is not something
that is feasible for large scale applications.

Those challenges initiated the thinking on where the future of the state management is and what are
the patterns that are emerging to manage those better.

## State management patterns

### Remote state

The remote state can be defined as a state that mirrors remote data set. For example, a list of
issues received from the REST request, or a list of companies provided via GraphQL endpoint would be
a remote state.

![Remote state](https://tangerine.staging.atl-paas.net/static/remote-state.png)

A good example of implementing this pattern would be Apollo and Query component that fetches a
GraphQL query and exposes the result to your component so that you can render your UI based on the
data it returns.

### Async state

Although async state is often conflated with the remote state, it is important to make a distinction
here. While the remote state is a state that represents remote data, async state represents metadata
about it: whether a request is loading, finished loading, failed for some reason. This information
almost always comes from the same state management system, but it is important to think about it
independently because it is also can be relevant for other situations like loading async js bundles.

![Async state](https://tangerine.staging.atl-paas.net/static/async-state.png)

There are two main patterns that have emerged in this area:

-   provide isLoading/isError/data through render props which is currently implemented in Apollo
-   React.lazy/Suspence combination that provides a way to do smart code splitting of components
    with dynamic imports within a call to React.lazy and Suspense component to render them.

### Router state

As the name suggests, this is the state that provides routing data and API to manipulate that data.
This state owned by the browser and ideally, nothing should try to synchronize with it directly. It
should be treated as an ultimate immutable store. The UI then becomes just a pure function of that
state, where it manages all the implications and side effects of changing routes with either
mounting/unmounting components or updating props on mounted components. The most important principle
here is that all other states are effectively derived from the router state, encapsulated within
their components/pages with a really strong contract in the way they are communicating with the
outside world. For example, if an Issue component needs a different issue id, it should be able to
receive it entirely via updating a prop. When a link is clicked and the route changes, the router
should be able to just flow this change down and just update a prop on a component. Everything else
would be kicked off by this process, which maintains really strict uni-directional data flow that
flux describes.

That way implementation details of a particular router do not matter and any router can be used to
transfer the router state down to encapsulated components. The router does not store that state,
neither controls it, it just provides an API to the router state and window.location is ultimately
the store.

![Async state](https://tangerine.staging.atl-paas.net/static/router-state.png)

De-facto industry standard here is react-router which provides declarative routing solution to React
applications.

### Shared state

The shared state can be defined as a state that exists where there are multiple independent
components that should not or can not have knowledge of each other need to independently read from
or operate on a piece of that state.

A good example of a shared state could be navigation's expand/collapse state and a Form app that
needs to know whether navigation is expanded, collapsed or resized to adjust its layout. Also, this
Form could have a button to expand its layout into the full-screen mode (or, essentially, collapse
the navigation). Meanwhile, the navigation itself has the UI that controls expanding/collapsing and
mounts/unmounts components based on that state. They operate independently, Navigation component
should not have to know about the presence of the Form, nor the Form should have the knowledge about
the existence of Navigation component. So the UI state of Navigation is a shared state since it
exists separately from either of those consumers/operators on it.

Knowing this, another way to define shared state would be as "state that is independent of the UI
that is rendering it".

Another important reason for the shared state to exist is to avoid deep prop drilling within the
components' hierarchy. Imagine Navigation and Form relationship if shared state concept did not
exist. In that case, every component around that form, which might not know that this form exists,
would have to accept the Navigation state and API as props and pass them down to their children.
Those components between the root of the app and the form are the definition of components that
should not have knowledge of each other.

![Shared state](https://tangerine.staging.atl-paas.net/static/shared-state.png)

The simplest way to implement shared state that is commonly used now is via React context api.

### Local state

The easiest way to define local state is as the opposite to the shared state. So if the shared state
is the state when multiple components that should not have to have knowledge of each other need to
subscribe to/operate on a single piece of state, local state is the state that only components that
should know about each other would need to interact with. A good example of the local state might be
a form, where, as an example, additional fields appear after a value in an input field has changed,
and submit button is disabled until all the required fields are filled. In this case, the form knows
about all the components inside it, therefore it holds all the state, passes portions of it to the
relevant input components and listens to the onChange events those inputs expose.

Although in the example this looks simple enough, in reality, it is sometimes quite difficult to
distinguish between local and shared state. More often than not it boils down to the "how big and
complex is this UI and how much it changes over time", and sometimes solutions that are used for the
shared state could be preferred as a local state management to avoid props drilling.

![Local state](https://tangerine.staging.atl-paas.net/static/local-state.png)

### Controlled state

The controlled state can encapsulate different types of state within itself. From the consumer
perspective, they are invisible and do not really matter. What is important is whether the state is
a function of props (controlled) or a function of internal state (uncontrolled). In the form example
above the select component fetches the list of the companies thus controlling async and remote
state. It also has the ability to manipulate its own open or closed state, which is a local state
for that component. The select can expose initialOpen/isOpen + onChange props for the consumers,
which is a well-established pattern, to switch between uncontrolled/controlled state respectively.

![Local state](https://tangerine.staging.atl-paas.net/static/controlled-state.png)

## API bindings patterns

Although API bindings patterns are the last, they are probably the most important ones.
Encapsulation, decomposition and separation of concerns are the cornerstones of a development at
scale, which in React world is basically the ability to scope things to a particular component in
the hierarchy. This is especially important on a scale when the same people could be authors and
consumers of components at the same time and anything, however big, can be just a component for
someone else. It is very rare to have any kind of certainty here, and having something as global and
unique as navigation that is almost guaranteed to be the only one on a page ever is an exception. In
most of the cases, an assertion like this can not be made. For example, a modal dialog: on the
surface, it looks like there can be only one on a page until you remember about "modal on modal"
pattern. Or, stepping a bit closer to for example Jira and looking at Issue view: generally, there
is only one Issue view on the screen, but what if there were two? It is very easy to imagine
something like "merge issue" or "revert issue" interface, where two issues on the same screen
appear, with the functionality available to compare their content and to do something with it
afterwards.

### Props API

The oldest and the most known pattern here is the props API, which has been with React since forever
and which is, coincidentally, one of the major parts of the Tangerine architecture. So regardless of
any other emerging patterns, it needs to be taken into account that a well-designed props API goes a
long way.

### Render props

Another very powerful pattern that emerged not that long ago and recently gained a lot of popularity
is Render props pattern. Render props is essentially a component being able to expose public API to
the code where it is being used. When with props API and composing components in a traditional way
there is only input data, with render props allow to expose not only input but also the output and
re-map that output to its children. This provides a greater flexibility and more opportunities for
components composition and re-use.

Imagine, for example, that you are a developer that composes a UI interface. You have your building
blocks: ComponentA, ComponentB and ComponentC. Based on the value that is provided to ComponentA and
ComponentB they are exposing some data and you want to pass this data to the ComponentC, and on
ComponentC you have a callback on activating which you want to do something with one of the
components above. With the "traditional" props API you do not have much of a choice other than
introducing another entity like a Redux store, event emittier, or just plain old components state in
simple cases, that wires all of them together.

```javascript
class ComposingComponents extends Component<Props> {
    onDataLoadedCallback = outputData => {
        this.setState({ data: outputData });
    };

    onSomethingHappened = otherData => {
        this.setState({ something: otherData });
    };

    doSomething = value => {
        // do something with ComponentA
    };

    render() {
        return (
            <ComponentA value={'Value'} onDataLoaded={this.onDataLoadedCallback}>
                <ComponentB value={'B-value'} onSomethingHappened={this.onSomethingHappened}>
                    <ComponentC
                        data={this.state.outputData}
                        something={this.state.something}
                        onAnotherThing={this.doSomething}
                    />
                </ComponentB>
            </ComponentA>
        );
    }
}
```

With render props as part of the components API they can be composed naturally together, without the
need to involve another component to manipulate their relationship.

```javascript
const ComponentsWithRenderProps = () => (
    <ComponentA value={'Value'}>
        {({ data, doSomethingWithComponentA }) => (
            <ComponentB value={'B-value'}>
                {something => (
                    <ComponentC
                        data={data}
                        something={something}
                        onAnotherThing={doSomethingWithComponentA}
                    />
                )}
            </ComponentB>
        )}
    </ComponentA>
);
```

To make this example closer to the real life you can imagine ComponentA to be a router, ComponentB a
Query component and ComponentC as Issue view that is rendered based on the issueId from the router
and data that is fetched based on that issueId, with the ability to re-fetch said data from within
Issue view itself.

```javascript
const SPAShell = () => (
    <Router>
        {({ issueId }) => (
            <Query query={issueQuery} variables={{ issueId }}>
                {({ data, fetchMore }) => (
                    <Issue issueId={issueId} issueData={data} onSomething={fetchMore} />
                )}
            </Query>
        )}
    </Router>
);
```

## Conclusion

It is clear that everything in the industry is leaning towards hierarchy and composability. It is
important that we are able to compose together different solutions for different problems, like for
example React Router that controls routing and Apollo that controls data fetching and integrate them
easily with apps and components. Therefore we expect state management of the future to look like
potentially different technologies that implement these different types of state rather than one big
Redux store, and what we are currently working on defining at a Tangerine level what the right set
of technologies and libraries should be used for those patterns.
