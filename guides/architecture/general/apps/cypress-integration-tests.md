# Integration tests

Writing reliable and maintainable integration tests is a hard problem to solve. Until recently, we
have been using enzyme for those tests, but this approach has following problems:

-   Tests are very difficult to write, especially for compositions of different components and
    especially if those components are big and complicated and also a composition of different
    components, services and controllers
-   Tests are very difficult to maintain, they require knowledge of internal implementation of all
    components involved in the test. It becomes almost impossible when a person needs to write a
    test for a component that they didn't write themselves
-   Tests run in simulated environment of jsdom that does not support all browser api. That means
    that some functionality that relies on the missing implementation is unreachable and not
    possible to test. Because of that the test and the actual behavior of a component that is
    visible in the browser are out of sync: the component can work properly, but the test for it
    fails.

Fortunately, we have other options. Since we already have the idea of
[public/integration examples](./public-examples.md) and most packages (and especially the
complicated ones, those that would benefit from integration tests the most) should write their
[public/integration examples](./public-examples.md) anyway, we can leverage that. We can use any
tool that can visit a page in a real browser and can interact with elements on said page, and just
write tests on top of that.

## Integration vs end-to-end tests

Integration and end-to-end tests are often mixed up and confused with each other. In order to
eliminate this confusion and simplify the workflow and infrastructure, the line between integration
and end-to-end tests in tangerine is defined as follows:

**Integration tests**:

-   test behavior of components within a package only
-   run on top of already existing [public/integration examples](./public-examples.md) of a package
-   do not visit any external links, stay within localhost and the examples only

**End-to-end tests**:

-   test end-to-end behavior of a product as a whole
-   run on top of a real instance of a product
-   navigates through different routes and pages of a product

## General recommendation

Integration tests are not unit tests and should not be used as such. They are much more expensive to
run and should be used sparingly. It is better to group a series of interactions into one test
rather than separating them into small mini-tests.

👍 Example of a good test:

**Check that we are able to select a fake issue in a fake form**

where this test performs actions like:

-   open a form by clicking a button
-   select a tab with "issues" dropdown inside
-   open the dropdown
-   select an option from it
-   check that dropdown is closed
-   check that "success" flag appeared after the issue was saved
-   check that the issue number changed in a corresponding field
-   close the modal
-   check that the selected issue is saved in a field on a page

## Selecting elements on a page

This is one of the most challenging parts of in-browser integration tests, regardless of the
tooling. There is no universal answer for every possible situation. General recommendations are,
sorted by the most reliable:

-   Where possible and reasonable, use `data-test-id` to access nodes that could be accessed for the
    testing purposes. Reason: separation of concerns; nothing else relies on it (compare to id or
    className which are used for styling and js logic). For production build those attributes could
    be stripped away by a babel plugin.
-   Use existing `id` attribute when there is a certain degree of confidence that `id` is not
    subject to change, not generated randomly and not used for styling purposes.
-   Select by text if there is a certain degree of confidence that the text is not subject to change
    and the parent container of that node can be identified by the previous two methods, to avoid
    collisions.

**Methods below** should be considered a serious **anti-pattern** and should not be used anywhere,
unless there is absolutely no other alternatives:

-   Selecting via unrelated `data-` attributes, `aria-` attributes, `classnames` or any other
    attributes that might exist on a node. Reason: none of them give any indication that they are
    used for the testing purposes. Changing them for any reason that doesn't break the functionality
    of an app should not break tests, otherwise that just invalidates the whole integration tests
    experience. Plus people should not live in fear of accidentally breaking tests that attach
    themselves to some random attributes.
-   Selecting by tag names. Reason: they are usually not unique on a page, subject to change
    (especially something as generic as a div or span) and require deep knowledge of implementation
    details of the app/component that is being tested.

A very special case is any kind of **children/siblings generic selectors**, especially in a format that
relies on a specific order of elements (Example: `div > div:first-child > div > span > a`). Those
selectors **should not be used for testing purposes under any circumstances**. If you find yourself in a
position that you need to write a test and the only option to access an element is through something
like this then consider not writing this test at all. Those selectors are extremely unreliable and
will quickly become flaky and degrade the whole integration tests experience for everyone.

## PageObject

It is recommended to use PageObject pattern when writing integration tests. Good description of the
pattern can be found here: https://martinfowler.com/bliki/PageObject.html  
 Every package should have its own PageObject (or a few, depending on the structure and size of the package).
If a package has only one PageObject, it should live on the same level as integration tests in page-object.js
file. If a package has a need for more than one PageObject they should be placed in a folder `page-objects`
with the names reflecting their purpose.

All PageObjects should be assertions free, all assertions should happen in tests only.

## Tools

We use [Cypress](https://www.cypress.io/) to write integration tests defined above. Use
[best practices](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)
from the official Cypress documentation.

## Naming convention

-   We use `data-test-id` attribute to allow tests to target elements. It should be derived from the
    package name, folder hierarchy of the component + reasonable name of the component, to eliminate
    name collisions across multiple packages and components. Example:
    `<button data-test-id="jira-feedback-dialog.ui.dialog.footer.submit-button">Submit</button>`
-   all tests should live in `integration-tests` folder in parallel with `src` and `examples`
    folders of a package
-   all PageObjects should live either in `page-object.js` file or in `page-objects` folder inside
    `integration-tests` folder
-   all files with tests should have a name that ends with `cy-intergation.js`
