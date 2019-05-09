# Writing public/integration examples

At the root of a package, in parallel with `src` folder, there should be `examples` folder that
contains public API examples of this package. The purposes of those is to serve as documentation for
the package and to demonstrate how the API that is exposed from the package should be used by
consumers. If a website (similar to [Atlaskit](https://atlaskit.atlassian.com/packages)) is set up
on top of the repo, those examples will be the ones that are visible on the website, same as
[Atlaskit examples](https://atlaskit.atlassian.com/packages/core/checkbox/example/basic-usage).

Similar to internal UI examples that can be though of as unit tests for your design, public examples
can be thought of as integration tests for your package. Same as internal examples, where it is
encouraged to test design edge cases, in public examples it is recommended and encouraged to test
behavioral edge cases. If, for example, an app has different behavior (like pagination, showing 404
or error message) based on different props combination or results of REST/GraphQL requests, those
combinations deserve their own examples.

Because of the above public examples are in a perfect position to be used as a base for
[Cypress integration tests](./cypress-integration-tests.md).

## Mocking in public/integration examples

[Dependency injection pattern](../components/dependency-injection.md) **should not** be used here
(unless this particular dependency is explicit and intentional part of the public API). All requests
should be mocked explicitly with data that is as close as possible to the real life.
