All components that are responsible for shared state and stateful logic of a package . They
are considered “leaf” components, to be consumed and composed by UI components only. There should
never be any imports from “UI” within “controllers”.

# Naming convention

-   **/utils** _(optional)_ - in rare cases when a component needs to do a lot of transformations or
    other operations, a single `util.js` is not enough. When this happens they can be put in a
    folder instead and separated into files. In this case, every util should be put into its own
    file with the name that reflects name of that util, and has unit tests in a separate file with
    the name name-of-the-util.test.js.
-   **context.js** _(optional)_ - in very rare cases, when the context is too big, it might make
    sense to extract it into its own file.
-   **constants.js** _(optional)_ - if a component requires to define a lot of constants they should
    be extracted into this file. There is no need to extract all constants right away though, use
    your best judgement here.
-   **index.js** - usually contains the main logic of the component. When there is a need and when
    it make sense, it can re-export this component's public API for others to consume. Main logic of
    the component then will go into main.js. This files also can contain react createContext if a
    controller is implemented with React Context API.
-   **mocks.js** _(optional)_ - mocks of a component with different variations of data to use in
    tests or examples of UI components that consume this controller. See more details in the
    [DI section](../../components/dependency-injection.md).
-   **test.js** _(optional)_ - unit tests for the component or its utils.
-   **types.js** _(optional)_ - all types for this component live here. The only exception are Props
    and State, that could live in the main.js if they are small enough.
-   **utils.js** _(optional)_ - utils that are specific for this particular component.

---

## Related reading

[Architecture and guide for controllers components](../../components/components-types/controllers) |
[State management](../../components/state-management)
