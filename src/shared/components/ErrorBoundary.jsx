import React from 'react';
import { View, Text, Button } from 'react-native';
import { styled } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <ErrorText>Something went wrong!</ErrorText>
          <Button
            title="Try again"
            onPress={() => this.setState({ hasError: false, error: null })}
          />
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
