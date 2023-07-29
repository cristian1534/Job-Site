import React, { Component } from 'react';
import GlobalError from '../GlobalError.js/GlobalError';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  render() {
    const { hasError, error } = this.state;
    const { reset } = this.props;

    if (hasError) {
      return <GlobalError error={error} reset={reset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
