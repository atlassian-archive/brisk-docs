# Everything is a component

Components are the basic building blocks and primary units of code re-use in React. The most
important part of tangerine is the shift in mindset to use components as the “universal declarative
interface” for all aspects of React code. Everything from data fetching, state management to local
storage access, data transformations is encapsulated into their own isolated pieces of
functionality, that are independent and communicate with the outside world through the declarative
components API.

The primary reasons for using “components for everything” approach are to:

-   switch to a “decomposition-first” mindset when we write our frontend
-   break down the pattern of building large and fragile monolithic structures
-   increase code reuse
-   align better with the current direction the industry is heading

## Composition, API bindings and render props

Encapsulation, decomposition and separation of concerns are the cornerstones of development at
scale, which in the React world is basically the ability to scope things to a particular component
in the hierarchy.

With the “components for everything” approach, it is vitally important to have a simple way to share
data or results of operations between components. This is especially important for components that
are responsible for something that in Jira was traditionally handled by Redux/Observables (like data
fetching or loading/error state). One of the most powerful concepts in React for achieving that is
Render props. You can read more about the benefit of using render props instead of traditional props
API in The Treatise On State Management as well.

What makes render props so powerful for this use case, is that they turn a component into a “black
box” with a clear Input/Output API, that can be composed with any other “black box” in any
combination.

Consider, for example, a situation when a `ProjectWithIssuesPage` needs to fetch some `Project` info
based on the `projectId`, and then fetch a list of issues for the `projectKey` that is extracted from
that `Project` info.

![Components situation](https://tangerine.staging.atl-paas.net/static/props-api.png)

In a pre-tangerine world we would isolate concerns based on their type: we would create
rest/services/ops/state layers for both of those requests within the `ProjectWithIssuesPage` app, and
we’d orchestrate when to show spinners and when to start another fetch via
State/Ops/Observables/Redux/Sagas etc.

This quickly becomes complicated, especially when you need to orchestrate a few requests that depend
on each other. Another downside: in the case when part of the logic needs to be re-used between
different apps, for example fetching of `Issues`, it is impossible to extract it from the
`ProjectWithIssuesPage` app without a big refactoring since all the logic that deals with this concern
is scattered across multiple layers of the application.

With “components for everything” approach and render props, we encapsulate the specific concern (for
example “manipulate Issues for a project” concern) into a Component that accepts initial props
(`baseUrl`, `projectKey`) and returns data, state of this data (loading, error) and api to manipulate
this data (fetch, update).

In code this approach would look something like this:

```javascript
<ProjectDataProvider projectId={123} baseUrl={baseUrl}>
    {({ data: project }) => (
        <IssuesDataProvider projectKey={project.key} baseUrl={baseUrl}>
            {({ data: issues, loading, error }) => {
                if (loading) {
                    return <Spinner />;
                }

                if (error) {
                    return <Error />;
                }
                return issues.map(issue => (
                    <IssueCard description={issue.description} name={issue.name} />
                ));
            }}
        </IssuesDataProvider>
    )}
</ProjectDataProvider>
```

Where `ProjectDataProvider` is a component, `IssuesDataProvider` is a component, the code above is the
main view of `ProjectWithIssuesPage` app and rest/services/ops/state/etc layers for it are non-existent.
While both `ProjectDataProvider` and `IssuesDataProvider` initially live within `ProjectWithIssuesPage`,
in case logic of any of them needs to be re-used somewhere else, all it would take is to just
drag-and-drop it to a different place somewhere. No big refactorings, the only change required in
the `ProjectWithIssuesPage` app would be the imports paths.
