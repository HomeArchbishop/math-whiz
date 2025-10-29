import React, {
  ComponentType,
  PropsWithChildren,
} from 'react'
import { Button, Text, View } from 'react-native'

interface FallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  fallback?: ComponentType<FallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const DefaultFallback: React.FC<FallbackProps> = ({ error, resetError }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Something went wrong:</Text>
    <Text>{error.message}</Text>
    <Button onPress={resetError} title='Try again' />
  </View>
)

type ErrorBoundaryState = { error: Error | null }

/**
 * 错误边界组件
 */
class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor (props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props)
    this.state = { error: null }
    this.resetError = this.resetError.bind(this)
  }

  static getDerivedStateFromError (error: Error) {
    return { error }
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  resetError () {
    this.setState({ error: null })
  }

  render () {
    const { fallback: Fallback = DefaultFallback, children } = this.props
    const { error } = this.state

    if (error) {
      return <Fallback error={error} resetError={this.resetError} />
    }

    return <>{children}</>
  }
}

export const withErrorBoundary = <T extends object>(Component: ComponentType<T>) => {
  return (props: T) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
