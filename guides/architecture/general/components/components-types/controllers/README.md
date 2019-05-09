# State controllers

Useful pre-read: [State Management](../../state-management)

Every time there is a need to share some state or stateful logic between different parts of the
application it should be extracted into a component that we call a "controller".

-   [Local state and stateful logic](./stateful-logic.md)
-   [Shared state](./shared-state.md)

**Important**: major purpose of the controller is to share state or stateful logic only, not to sync the
state with remote data. For that purpose we have a concept of a "service"

# Local state and stateful logic

With remote and async state handled by [services] there are not that many state management concerns
left. In most cases, it is perfectly okay and even encouraged to handle simple local state within
the component itself.

```javascript
// Classic never gets old
export default class MyFancyModal extends Component {
    state = {
        isOpen: false,
    };

    onClose = () => {
        this.setState({ isOpen: false });
    };

    onButtonClick = () => {
        this.setState({ isOpen: true });
    };

    render() {
        const { isOpen } = this.state;

        return (
            <Fragment>
                <Button onClick={this.onButtonClick}>Show feedback</Button>
                {isOpen && <ModalDialog onClose={this.onClose} />}
            </Fragment>
        );
    }
}
```

There are, however, cases when the local state is not enough:

-   Stateful logic becomes too complicated and blows the logic of the component out of proportion
    (for example, a complicated form with multiple dependencies between form elements)
-   Stateful logic is something that is generic enough and there is a need to re-use it across
    multiple components (for example, open/close logic for a modal dialog)
-   There is a possibility a piece of this state would need to be shared between isolated components
    (for example, whether navigation is collapsed/expanded)

When a situation like this occurs, it might be a good idea to extract that stateful logic into its
own “controller”, expose its API through render props (the same way Services do that) and then
consume it from the main component like any other component/hook. That way the concept of “stateful
logic” becomes something of an isolated concern and this “state controller” could be refactored to
use React context API in the future, without any refactoring in the consumer component itself.

Classic state example from above then turns into a tiny UI functional component, that consumes
stateful logic:

```javascript
const MyFancyModal = () => (
    <ModalStateController>
        {({ isOpen, toggle }) => (
            <Fragment>
                <Button onClick={toggle}>Show feedback</Button>
                {isOpen && <ModalDialog onClose={toggle} />}
            </Fragment>
        )}
    </ModalStateController>
);
```

And “state controller” that implements stateful logic:

```javascript
export default class ModalStateController extends Component {
    state = {
        isOpen: false,
    };

    toggle = () => {
        const { isOpen } = this.state;

        this.setState({ isOpen: !isOpen });
    };

    render() {
        const { isOpen } = this.state;
        const { children } = this.props;
        const toggle = this.toggle;

        return children({ isOpen, toggle });
    }
}
```

**This technique is very useful in order to think about the state as something that can be an
independent entity and that can encapsulate and share a particular concern between different apps.**

The beauty of this pattern is the “optimize for refactoring” approach. If there will be a need to
share not only the logic but also the actual state between different apps or components, the only
place where refactoring would occur would be the “state controller”. From the UI component
perspective, the external API of that component will stay the same.

## Stateful logic and hooks

With hooks landing in React, stateful logic that will always stay just the logic and that won't
require to share any state data between different parts of the app, could be extracted into a hook
instead of a component.

See the [guide on hooks (TBD)](../../../hooks) for more details

# Sharing state within a package

While for the most cases within a package local state and
[components composition](https://reactjs.org/docs/composition-vs-inheritance.html) to manipulate and
share state and data would be enough, there will be times when there is a need for an exception.
Usually, it happens when:

-   a package is very big, and there is a need to share state between a parent component and a child
    component that is very deep in the hierarchy and hidden behind a few layers of composition.
-   a component wants to share some state with some of the neighbours that have no direct
    connections to it

Consider, for example, a case when there is an “Issue View” package, that has somewhere deep an
“activities” component in the main content area, “watchers” component in the sidebar area, and both
of them (and only two of them) need to react to a situation when a user adds/removes themselves to
the watchers list.

![shared state example](https://tangerine.staging.atl-paas.net/static/shared-state-example.png)

Instead of lifting the “watchers” state to Issue view component (as we had to do with Redux), which
would turn it into an unmanageable monster if every sub-component did that, the “watchers” state can
be thought of as its own independent state. It would have its own input/output API, it could be
extracted into its own “state controller” based on React Context API, and shared between Activities
and Watchers components directly, without involving their parent in state manipulations.

**IMPORTANT** React Context is not designed as means to avoid props drilling, use it sparingly and
prefer components composition whenever possible.

## Naming conventions

In order to maintain consistency with Services (since the difference between those two is
conceptual, not in implementation), controllers should follow the same naming convention:

-   they should have Controllers as a suffix
-   they should expose their API through render props in the form of an object with necessary
    meta-information about the controller, stateful data and API to manipulate this data (when
    applicable)
-   When a controller is implemented with React Context API then it should export Provider/Consumer
    pair with the names that end with `ControllerConsumer` and `ControllerProvider` respectively

The only difference compare to services (other than suffixes) is that there are no mandatory fields
for Controllers

---

## Related reading

[State management: core concepts](../../state-management) |
[Everything is a component](../../everything-is-a-component.md) |
[Using dependency injections](../../dependency-injection.md) |
[Avoiding providers hell](../../composition-and-providers-hell.md)