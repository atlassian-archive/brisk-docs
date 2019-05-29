import * as React from 'react';

type Props = {
  children: React.ComponentType;
  onError?: (error: Error, info: any) => void;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: any) {
    const { onError } = this.props;
    this.setState({ hasError: true });
    if (onError) {
      onError(error, info);
    }
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <h4>Something went wrong loading this example.</h4>;
    }
    return children;
  }
}
