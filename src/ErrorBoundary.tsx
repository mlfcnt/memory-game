// copie collé ..

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: "",
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ ...this.state, error: error.message });
  }

  public render() {
    if (this.state.hasError) {
      return <h1>{this.state.error}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
