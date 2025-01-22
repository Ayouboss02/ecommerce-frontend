import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const LoadingSpinner = () => {
  const theme = useTheme();
  
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
