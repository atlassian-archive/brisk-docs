# Dependency injection pattern

Dependency injection is a very handy pattern that significantly simplifies and improves testability
of code, especially for components that compose multiple other components, services and controllers.
Consider this IssuesList component, where IssuesQuery makes a GET request, and IssuesController
controls the stateful logic of list sorting.

```javascript
import IssuesService from 'something/issues-data-query';
import IssuesController from 'something/issues-sorting';
import GenericList from 'something/issues-list';

export const IssuesList = () => (
    <IssuesService>
        {({ data, loading }) =>
            !loading ? (
                <IssuesController>
                    {({ sortOrder, sort }) => (
                        <GenericList sortOrder={sortOrder} onSort={sort}>
                            {data.issues.map(issue => (
                                <IssueCard name={issue.name} />
                            ))}
                        </GenericList>
                    )}
                </IssuesController>
            ) : (
                <Spinner />
            )
        }
    </IssuesService>
);
```

This component has a certain amount of logic and visual representation, so it has to have
[examples]() and unit tests. This is where it becomes complicated exponentially with growing number
of composed components:

-   `IssuesService` and `IssuesController` import in tests need to be mocked with jest.mock,
    different mocks for different variations of data that needs to be tests
-   `IssuesService` or all of its requests need to be mocked in
    [examples](./components-types/ui/examples.md) (but in a different way, since there is no jest
    there)

Neither is a good option. In unit tests, there will be a huge amount of logic just to mock those
components (since in reality, it is not going to be as simple as this snippet, more likely it is
going to be a composition of multiple components, services and controllers). In
[examples](./components-types/ui/examples.md) there will be a big number of mocks of requests that
do not really belong in this component and just Service component's concern. Not to mention, that if
there is a need to show different visual representations of something that depends on the state
controller, the only option would be to pass some initial data to it, just for test purposes, which
is also far from ideal.

This is where the “dependency injection” pattern proved to be a very effective and nice solution
that solves all of those concerns. The idea is very simple: instead of importing and consuming
Services or Controllers (or any other component really) directly, it is injected to the UI component
via props, with "production" version of components saved in `defaultProps`.

That way:

-   all the external consumers do not know about any of this and receive proper components without
    any trouble, doing anything differently or even knowing about existence of dependencies
-   while doing tests and examples, Service and Controller components can be replaced with any
    component that imitates the desired outcome

Those “test” components could be imported from components they are mocking as part of their tests
public API, and re-used both in tests and examples

## Examples of usage

With dependency injection the example above turns into this:

```javascript
import IssuesServiceDI from 'something/issues-data-query';
import IssuesControllerDI from 'something/issues-sorting';
import GenericList from 'something/issues-list';

export const IssuesList = ({ IssuesService, IssuesController }) => (
    <IssuesService>
        {({ data, loading }) =>
            !loading ? (
                <IssuesController>
                    {({ sortOrder, sort }) => (
                        <GenericList sortOrder={sortOrder} onSort={sort}>
                            {data.issues.map(issue => (
                                <IssueCard name={issue.name} />
                            ))}
                        </GenericList>
                    )}
                </IssuesController>
            ) : (
                <Spinner />
            )
        }
    </IssuesService>
);

IssuesList.defaultProps = {
    IssuesService: IssuesServiceDI,
    IssuesController: IssuesControllerDI,
};
```

and then other components can consume IssuesList as normal since "production" version of the service
and controller is there in default props

```javascript
import IssuesList from 'our-component-with-di-pattern-inside';

export default () => <IssuesList />;
```

but in unit-tests we can override those with mocks that mimic specific behavior required for this
particular test

```javascript
import { IssuesStateSortedOneWay, IssuesStateSortedAnotherWay } from 'something/issues-sorting';
import { IssuesQueryDefaultData } from 'something/issues-data-query';
import { IssuesList } from './main.js';

describe('Issues list component', () => {
    it('test stuff one way', () => {
        const List = mount(
            <IssuesList
                IssuesQuery={IssuesQueryDefaultData}
                IssuesStateController={IssuesStateSortedOneWay}
            />,
        );
        expect(something).toBe(something);
    });

    it('test stuff another way', () => {
        const List = mount(
            <IssuesList
                IssuesQuery={IssuesQueryDefaultData}
                IssuesStateController={IssuesStateSortedAnotherWay}
            />,
        );
        expect(something).toBe(something);
    });
});
```

and then in examples **exactly the same mocks** could be used for visual testing as well

```javascript
import { IssuesStateSortedOneWay, IssuesStateSortedAnotherWay } from 'something/issues-sorting';
import { IssuesQueryDefaultData } from 'something/issues-data-query';
import { IssuesList } from './main.js';

export const IssueListWithDataSortedOneWay = () => (
    <IssuesList
        IssuesQuery={IssuesQueryDefaultData}
        IssuesStateController={IssuesStateSortedOneWay}
    />
);
export const IssueListWithDataSortedAnotherWay = () => (
    <IssuesList
        IssuesQuery={IssuesQueryDefaultData}
        IssuesStateController={IssuesStateSortedOneWay}
    />
);
```

The actual mocks would be just simple components that accept the same props that their “production”
version and returns data combination that is needed for this particular behaviour. For the examples
and tests above we would have:

```javascript
export const IssuesStateSortedOneWay = ({ children }) => children({ sortOrder: 'ASC', sort: ()=>{}) });
export const IssuesStateSortedAnotherWay = ({ children }) =>
    children({ sortOrder: 'DESC', sort: ()=>{} });
export const IssuesQueryDefaultData = ({ children }) => children({ data: 'something', loading: false });
```

With this approach writing and maintaining unit and visual tests becomes deadly simple, which is the
key to have good test coverage and have confidence in tests that are written.

## Naming convention

In order to maintain logic of a component intact regardless of whether its dependendants are
injected or imported directly, name of the component that is used in render function should reflect
its actual name. In order to avoid naming collisions, names of imports of dependencies should have
`DI` suffix in them.

👍 Correct:

```javascript
import IssuesServiceDI, { SomethingElse as SomethingElseDI } from 'something/issues-data-query';

export default class FakeIssueList extends Component {
    static defaultProps = {
        IssuesService: IssuesServiceDI,
        SomethingElse: SomethingElseDI,
    };

    render() {
        return <IssuesService>{() => <SomethingElse />}</IssuesService>;
    }
}
```

👎 Incorrect:

```javascript
import IssuesService, { SomethingElse } from 'something/issues-data-query';

export default class FakeIssueList extends Component {
    static defaultProps = {
        IssuesServiceDI: IssuesService,
        SomethingElseDI: SomethingElse,
    };

    render() {
        return <IssuesServiceDI>{() => <SomethingElseDI />}</IssuesServiceDI>;
    }
}
```
