## Avoiding providers hell

Services and Controllers are supposed to be lightweight components to encapsulate specific concerns.
In most cases for small to medium size packages there should not be a need to have a lot of
Controllers and Services. If you find yourself in a position when there is a need to do that for a
single packages, it's a good indicator that this package becomes too big and complicate and might
deserve some architectural thinking, restructuring and decomposing.

When the complexity and multiple services/controllers can not be avoided, raw React Context API will
not be enough:

-   it's [too easy to make a mistake](https://reactjs.org/docs/context.html#caveats) that will cause
    re-render of the whole component tree every time a parent is updated
-   root of the package will quickly become an example of "nested providers hell", which would
    either be completely unreadable, or would require a lot of creative thinking on how to group
    those providers into logical pieces
-   lack of good dev tools make it very hard to debug when a problem occurs

In order to solve that, we developed a state management library by the name
[react-sweet-state](https://github.com/atlassian/react-sweet-state) that mitigates all of the
concerns above.

## TBD: examples of how to use react-sweet-state within tangerine