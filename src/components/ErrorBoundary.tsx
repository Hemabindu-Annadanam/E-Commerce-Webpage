import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error,errorInfo);
    
    // You can log error info here or send to a service
    // console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>
          <h4>Something went wrong.</h4>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
