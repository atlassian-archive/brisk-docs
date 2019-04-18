const outdent = require('outdent');

/**
 * exampleTemplate - template for an example page where the source code
 * for the wrapped component is also passed to the wrapper
 *
 * @param {string} componentPath absolute path to the example
 * @param {string} wrapperPath   absolute path to the page wrapper
 * @param {object} [data={}]     extra data needed for the page
 *
 * @returns {string} source code for the page
 */
const exampleTemplate = (componentPath, wrapperPath, data = {}) => outdent`
    import React from 'react';
    import dynamic from 'next/dynamic';
    import fileContents from '!!raw-loader!${componentPath}';
    import Wrapper from '${wrapperPath}';
    
    const DynamicComponent = dynamic(import('${componentPath}')
    .then(Components => {
    return () => ( 
    <Wrapper data={${JSON.stringify(data)}} fileContents={fileContents}>
          {
            [{ 
                name: 'default', 
                component: <Components.default /> 
              }, 
              ...Object.keys(Components).filter(componentName => componentName !== 'default')
              .map(componentName => {
                const Component = Components[componentName];
                return {
                  name: componentName,
                  component: <Component />
                }
              })
            ]
          }
      </Wrapper>
      )
    }));
    export default () => <DynamicComponent/>
`;

/**
 * exampleWithDecoratorTemplate - template for an example page where there is a
 * decorator also for a wrapped component
 *
 * @param {string} componentPath absolute path to the example
 * @param {string} wrapperPath   absolute path to the page wrapper
 * @param {object} [data={}]     extra data needed for the page
 * @param {string} decoratorPath   absolute path to the decorator
 *
 * @returns {string} source code for the page
 */
const exampleWithDecoratorTemplate = (
  componentPath,
  wrapperPath,
  data = {},
  decoratorPath,
) => outdent`
    import React from 'react';
    import dynamic from 'next/dynamic';
    import fileContents from '!!raw-loader!${componentPath}';
    import Wrapper, { ExampleComponentContainer, ExampleHeading } from '${wrapperPath}';
    import Decorator from '${decoratorPath}';
    
    const DynamicComponent = dynamic(import('${componentPath}')
    .then(Components => {
    return () => ( 
    <Wrapper data={${JSON.stringify(data)}} fileContents={fileContents}>
        {
          [<ExampleComponentContainer key="default"><Components.default/></ExampleComponentContainer>,
            ...Object.keys(Components).filter(componentName => componentName !== 'default')
              .map(componentName => {
                const Component = Components[componentName];
                return <>
                  <ExampleHeading>{componentName}</ExampleHeading>
                  <ExampleComponentContainer key={componentName}><Component/></ExampleComponentContainer>
                </>
              })
          ]
        }
      </Wrapper>
      )
    }));
    export default () => <Decorator><DynamicComponent/></Decorator>
`;

module.exports = {
  exampleTemplate,
  exampleWithDecoratorTemplate,
};
