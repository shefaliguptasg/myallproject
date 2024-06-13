import React from "react";
import ErrorPage from "./ErrorPage";
interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo, "error caught");
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
