import Button from '@atlaskit/button'
import FileViewer from './src/components/file-viewer'

# File Viewer Component
This library is designed to help you display inline examples and their corresponding source code.

### Usage
```js
import FileViewer from '@brisk-docs/file-viewer'
```

```jsx
<FileViewer Component={Button} title="Button" source={require('!!raw-loader!./src/components/file-viewer')} />
```

<FileViewer Component={Button} title="Button" source={require('!!raw-loader!./src/components/file-viewer')} />

<div>
    <Props
        heading="Props"
        props={require('!!extract-react-types-loader!./src/components/file-viewer')}
    />
</div>