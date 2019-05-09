## Simple examples

Writing examples for UI components is a primary way to develop any new component and to make sure
the UI follows high standards, works with all combinations of props that affect visual
representation of a component, looks according to design and does not break from different edge
cases like very large strings or a missing image.

In addition to that, visual regression tests are run on top of examples, which comes in handy when
bumping dependencies of components, or doing big code refactoring of an app.

It is recommended and encouraged for all UI components to have examples that:

-   show the component in all possible props combinations that affect how the component looks like
-   show how the component looks when texts are very long
-   show how the component looks when texts are very short
-   show how the component looks with RTL layout
-   show how the component looks with missing images/too small/too large images
-   other edge cases that are important for the design

Consider, for example, a Button component that has this behavior:

-   it shows Spinner when loading
-   it shows Disabled button in dark/light colors if it’s disabled
-   it shows normal button in dark/light colors by default

```javascript
const Button = ({ isDisabled, isDark, isLoading, name }) => {
    if (isLoadig) {
        return <Spinner />;
    }
    if (isDisabled) {
        return <DisabledButton isDark>{name}</DisabledButton>;
    }
    return <Button isDark>{name}</Button>;
};
```

The set of examples for this Button would then be:

```javascript
const LoadingButton = () => <Button isLoading />;
const DisabledLightButton = () => <Button isDisabled name="text" />;
const DisabledDarkButton = () => <Button isDisabled isDark name="text" />;
const DefaultLightButton = () => <Button name="text" />;
const DefaultDarkButton = () => <Button name="text" isDark />;
const ButtonWithLongText = () => <Button name="very very long text goes here" />;
const ButtonRTL = () => (
    <div dir="rtl">
        <Button name="very very long text goes here" />
    </div>
);
```

## Examples with dependencies

Consider a situation when a component renders some other component that has data management or
stateful behaviour inside. For examples, IssuesList component renders Issue view inside it. Since
the purpose of the example is to test visual representation of the IssueList component, it does not
really matter how IssueView looks and behave within this example, it might as well be replaced with
a black box for the purpose of this test.

```javascript
import FakeIssueView from './fake-issue-view';

export default class FakeIssueList extends Component {
    render() {
        return (
            <IssueListContainer>
                <p>
                    <!--  The actual list of issues is rendered here, not important for the example  -->
                 </p>

                 <!--  This is our Issue View component that has interesting stuff going on inside, like state management and fetching of data  -->
                <FakeIssueView />
            </IssueListContainer>
        );
    }
}
```

If we leave the code as in the example and import IssueView component directly, we'd need to do a
lot of manual labor to make it work: we'd need to mock requests, pass some sinsible default props,
etc. Considering, that we already did all this work within FakeIssueView component, repeating it
here is redundant, we could just re-use it instead. This is where
[Dependencies injection](../../dependency-injection.md) pattern comes in handy, since it allows to
"inject" examples from FakeIssueView component into the FakeIssueList and turn examples of a
component into unit tests of sort, where you deal only with concerns of this particular component
and nothing more.

The way to achieve that is to inject IssueView component into the IssueList component via props
instead of using it directly, and set the actual component as a default value in defaultProps
method. That way any consumer of this component will get its "production" version and would not even
know about any dependencies injections happening on the lower level. But in tests or examples we can
override those dependencies however we need.

Component with DI then would look like this:

```javascript
import FakeIssueViewDI from './fake-issue-view';

export default class FakeIssueList extends Component {
    static defaultProps = {
        FakeIssueView: FakeIssueViewDI,
    }

    render() {
        return (
            <IssueListContainer>
                <p>
                    <!--  The actual list of issues is rendered here, not important for the example  -->
                 </p>

                 <!--  This is our Issue View component that has interesting stuff going on inside, like state management and fetching of data  -->
                <FakeIssueView />
            </IssueListContainer>
        );
    }
}
```

And examples for it would look like this:

```javascript
import IssuesList from './main';
import { FakeIssueViewDefaultExample } from './fake-issue-view/examples';

const defaultIssuesList = () => <IssuesList FakeIssueView={FakeIssueViewDefaultExample} />;
```

As mentioned above, examples like this are used for visual presentation testing, they are
basically the "unit tests" for your design. Testing of functionality and behaviour should happen
only on the level of "integration" examples, where we mock all the necessary requests, provide
initial data with sensible defaults and variations, and use Cypress automation tool to actually
click though the components.
