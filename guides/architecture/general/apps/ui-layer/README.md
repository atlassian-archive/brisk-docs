# UI layer

The primary goal of UI components is to render an interface. This is where all the composition is
happening: a UI component consumes other UI components, services and state controllers.

All components should be considered “black box” by other components, they can only interact with
each other explicitly via their external API and explicit exports. By doing that, we are optimising
for future refactoring and scalability, and encouraging separation of concerns. In the ideal
scenario, any component on any level of the hierarchy can be moved to any level above by a simple
drag-and-drop, including being extracted into its own package.

While in the past we were adhering to the concept of
[presentational/container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
components, in the new tangerine world it has become obsolete.

Because:

-   when everything is a component and local state management is handled directly in components, the
    line between what is “presentational” and what is “container” is now very hard to define

-   it interferes with the code readability and the flow of data, which is against patterns we are
    going for, where everything is composable

# Naming convention

All UI components should be structured in exactly the same way

-   **/assets** _(optional)_ - images and other static resources required by this component.
-   **/utils** _(optional)_ - in rare cases when a component needs to do a lot of transformations or
    other operations, a single `util.js` is not enough. When this happens they can be put in a
    folder instead and separated into files. In this case, every util should be put into its own
    file with the name that reflects name of that util, and has unit tests in a separate file with
    the name name-of-the-util.test.js.
-   **examples.js** _(optional)_ - render examples of usage of this component. See more details in
    [Examples for UI components](../../components/components-types/ui/examples.md). Although this
    file is marked as optional, it is highly encouraged to write examples for all UI components
-   **constants.js** _(optional)_ - if a component requires to define a lot of constants they should
    be extracted into this file. There is no need to extract all constants right away though, use
    your best judgement here.
-   **index.js** - usually contains the main logic of the component. It will compose different
    components, including various services/controllers, react context consumers and all other UI
    elements. Concerns that are not relevant for the actual component logic (like styles or
    translations, see the list below) should be extracted into their relevant files. When there is a
    need and when it make sense, it can re-export this component's public API for others to consume.
    Main logic of the component then will go into `main.js`.
-   **messages.js** _(optional)_ - all translations for this component should be grouped here and
    exported as a default export.
-   **mocks.js** _(optional)_ - mocks of a component with different variations of data to use in
    tests or examples of UI components that consume this service. See more details in the
    [DI section](../../components/dependency-injection.md).
-   **test.js** _(optional)_ - unit tests for the component or its utils. It is recommended to write
    unit tests for all components that have logic worth testing. It is unnecessary to write unit
    tests for components that only render other component with no logic inside, since we also have
    types and examples to help with code coverage. Important: this file should contain actual unit
    tests, not shallow snapshots of the component with the description "component should render".
-   **types.js** _(optional)_ - all types for this component live here. The only exception are Props
    and State, that could live in `main.js/index.js` if they are small enough.
-   **styled.js** _(optional)_ - all styled components that are used in production code live there.
    It should not contain components that are used for test purposes.
-   **utils.js** _(optional)_ - utils that are specific for this particular component.

---

## Related reading

[State management: core concepts](../../components/state-management) |
[Architecture and guide for UI components](../../components/components-types/ui/README.md) |
[Examples for UI components](../../components/components-types/ui/examples.md)

## Rules

### [import/no-parent-imports](/packages/eslint-plugin-tangerine/rules/import/no-parent-imports)

The below configuration restricts importing parent ui components within the 'ui' directory as per
[ui structure]('./structure.md) guidelines.

#### Config

```js
'tangerine/import/no-parent-imports': [
  'error',
  {
    basePath: path.join(appRoot, 'src'),
    srcRoot: 'src',
    dirs: ['ui'],
    message:
      '\nSee https://github.com/atlassian/tangerine/tree/master/guides/code/app/apps/structure/ui-layer for more details',
  },
],
```
