import { Component, ReactElement } from "react";

interface IErrorState {
    hasError: boolean;
}

interface IErrorProps {
    children: string | JSX.Element | JSX.Element[]
}

class ErrorBoundary extends Component<IErrorProps, IErrorState> {
    state = {
        hasError: false
    }
    // constructor(props: any) {
    //   super(props)
    //   this.state = { hasError: false }
    // }
    static getDerivedStateFromError(error: unknown) {
      // Update state so the next render will show the fallback UI
   
      return { hasError: true }
    }
    componentDidCatch(error: unknown, errorInfo: unknown) {
        console.warn(error, errorInfo);
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h2>Oops, there is an error!</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        )
      }
   
      // Return children components in case of no error
   
      return this.props.children
    }
  }
   
  export default ErrorBoundary