# Package documentation

Documentation is generated from your packages from a few different sources.

### Basic package info

Information included in the `package.json` such as the description, current version and list of maintainers will get included on the home page for each package. We encourage you to add as much detail to your `package.json` as possible as it will help others use your package.

The contents of your README will also be displayed alongside this info.

### Docs pages

Any `.md` or `.mdx` file placed inside the `/docs` folder within your package will be included as pages in your package documentation. This is a good place to put tutorials and API documentation for your package.

### Examples

For interactive demonstrations of React components, you can add `.js`, `.jsx`, or `.tsx` files into the `/examples` directory in your package. The default export from each file will be displayed alongside its source.

These examples should demonstrate what your components can do and give your consumers an idea of how they should be used.

```js
// /examples/basic-usage.js
import MyAwesomeComponent from '../';

export default () => <MyAwesomeComponent awesomeLevel={9999} />;
```
