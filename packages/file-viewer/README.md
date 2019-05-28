import FileViewer from './src/components/file-viewer'
import ButtonExample from './examples/view-button'

## File Viewer Component
This library is designed to help you display inline examples and their corresponding source code.

### Usage
```js
import FileViewer from '@brisk-docs/file-viewer'
```

```jsx
<FileViewer Component={ButtonExample} title="Button" source={require('!!raw-loader!./examples/view-button')} />
```

<FileViewer Component={ButtonExample} title="Button" source={require('!!raw-loader!./examples/view-button')} />

<div>
    <Props
        heading="Props"
        props={require('!!extract-react-types-loader!./src/components/file-viewer')}
    />
</div>