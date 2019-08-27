import React from 'react';

import dynamic from 'next/dynamic';

export default <Props extends {}>({
                                    componentPromise, // TODO rename
                                    getProps = () => ({} as Props),
                                  }: {
  componentPromise: () => Promise<React.ComponentClass<Props>>;
  getProps: () => Props;
}) => {
  const DynamicComponentWithNoSSR = dynamic(componentPromise, { ssr: false });
  const props: Props = getProps();

  return <DynamicComponentWithNoSSR {...props} />;
};
