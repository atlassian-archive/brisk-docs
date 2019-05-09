# Services and data providers

Useful pre-read: [State Management](../../state-management)

Every time there is a need to fetch some data with a rest request, perform a POST request, read from
local storage/cookies, etc, what is actually happening is an attempt to “sync” components that are
rendered on the screen with some “remote” data that exists somewhere outside of the UI. This concept
is called “remote state”.

In addition, the “state” or “meta information” of that sync operation can be extracted into its own
“async state” concept, which can and should be handled by the same component.

In the “traditional” world before [components for everything](../../everything-is-a-component.md)
approach, in order to fetch data from REST endpoints, show a spinner while the data is fetched and
show an error when the data failed to fetch we had to create rest/services/ops/state/view layers in
our app since there was no concept of “remote” state concept and there is no “fetch data with the
info about that data” concern that can be extracted easily. We usually had “rest” layer, which
contains all the rest requests for the app, “services” layer with all the data transformations,
“state” layer with all the meta-data about those requests (isLoading, isError) plus some local state
concerns, etc.

In tangerine world we are doing the opposite: instead of different layers for different types of
work, we group the work by domain or `entities` that contain all the concerns that were previously
handled by the different layers.

We call these entities “services”.

All services should be lightweight abstractions, they are not supposed to render anything on a page,
this is UI components concern

## Basic service: simple fetch data provider

A simple “data provider” service does not need any React context underneath, all it usually does is
data fetch and transfer of loading, error and data to children as render props. Sometimes it can
expose some basic API like “refetch” as well.

```
export default class MyDataProvider extends Component<Props, State> {
    state = {
        loading: false,
        error: undefined,
        data: undefined,
    };
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { baseUrl, issueId } = this.props;

        this.setState({ loading: true });

        try {
            const data = await asJson(
                `${baseUrl}/rest/dev-status/1.0/issue/detail?issueId=${issueId}&applicationType=stash&dataType=pullrequest`,
            );

            this.setState({ loading: false, data: transformData(data), error: undefined });
        } catch (e) {
            this.setState({ loading: false, error: e, data: undefined });
        }
    }

    render() {
        const { children } = this.props;
        const { loading, error, data } = this.state;
        const fetch = this.fetchData;

        return children({
            loading,
            error,
            data,
            fetch,
        });
    }
}
```

## Basic service: data manipulation

Same situation as basic fetch services, is for when there is a need to perform some data
manipulations (like perform a POST/PUT request): all this logic could be encapsulated within a
DataProvider, which again, accepts props and returns result of the manipulations and API to perform
those manipulations via render props.

```
export default class MyDataProvider extends Component<Props, State> {
    state = {
        loading: false,
        error: undefined,
        data: undefined,
    };

    updateSomeData = async () => {
        const { baseUrl, issueId } = this.props;

        this.setState({ loading: true });

        try {
            const response = await asJson(
                `${baseUrl}/some-url`,
            );

            this.setState({ loading: false, data: transformData(response), error: undefined });
        } catch (e) {
            this.setState({ loading: false, error: e, data: undefined });
        }
    };

    render() {
        const { children } = this.props;
        const { loading, error, data } = this.state;
        const update = this.updateSomeData;

        return children({
            loading,
            error,
            data,
            update,
        });
    }
}
```

## Data provider with shared data

Although in simple cases React Context is not necessary, in reality a situation when there is a need
to share data from the same provider across multiple components and components composition is not
enough, are often. In this case, a service component can be implemented with React Context and
expose React Context Provider and Consumer as its public API.

React Consumer should implement the same API as a simple provider above ( loading, error, data as
render props) to keep the API consistent (and to make it easier for consumers of said service to
switch to context-based version if needed)

`// TBD: code example`

## Consuming providers

Since everything, including providers, is a component, then consuming providers is just a matter of
[composing](https://reactjs.org/docs/composition-vs-inheritance.html) them together with UI
components that need data from those providers

```
<MyService>
    {({ error, loading, data }) => {
        if (error) {
            return <ErrorComponent />;
        }
        if (loading) {
            return <Spinner />;
        }

        if (data) {
            return data.issues.map(issue => (
                <IssueCard
                    name={issue.name}
                    key={issue.key}
                    description={issue.description}
                />
            ));
        }
    }}
</MyService>
```

or, if the service was implemented with React Context, then

```
// at the root of your app
<MyServiceProvider>
    <UI />
</MyServiceProvider>
```

```
// somewhere at the top where there is a need to show the spinner
<MyServiceConsumer>
    {({ error, loading, data }) => {
        if (error) {
                    return <ErrorComponent />;
                }
                if (loading) {
                    return <Spinner />;
                }
    }}
</MyService>
```

```
// somewhere deep in UI layer
<MyServiceConsumer>
    {({ data }) => {
        if (data) {
            return data.issues.map(issue => (
                <IssueCard
                    name={issue.name}
                    key={issue.key}
                    description={issue.description}
                />
            ));
        }
    }}
</MyService>
```

Exactly the same situation is with the services that can manipulate data

```
<MyServiceProvider>
    {({ error, loading, update }) => {
        if (error) {
            return <ErrorComponent />;
        }

        if (loading) {
            return <Spinner />;
        }

        return <Button onClick={update}>Click me!</Button>;
    }}
</MyServiceProvider>;
```

# Naming convention

All services should have Services as a suffix. They should expose API in the form of an object with
necessary meta-information about this service (whether it’s loading, there is an error, etc), data
and API to manipulate this data (when needed). When a service is implemented with React Context API
then it should export Provider/Consumer pair with the names that end with `ServiceConsumer` and
`ServiceProvider` respectively

Mandatory fields for simple services or Consumers:

-   **loading: boolean** whether the query/mutation is in progress
-   **error: Error** error object if something went wrong
-   **data: any** result data


-----

## Related reading

[State management: core concepts](../../state-management) |
[Everything is a component](../../everything-is-a-component.md) |
[Using dependency injections](../../dependency-injection.md) |
[Fetching data with GraphQL and Apollo](../../../../graphql)