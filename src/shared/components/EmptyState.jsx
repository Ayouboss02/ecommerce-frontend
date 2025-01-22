import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

const Message = styled.Text`
  font-size: ${({ theme }) => theme.typography.body1.fontSize}px;
  color: ${({ theme }) => theme.colors.placeholder};
  text-align: center;
`;

const EmptyState = ({ icon, title, message }) => {
  return (
    <Container>
      <IconButton
        icon={icon}
        size={64}
        color="#BDBDBD"
      />
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  );
};

export default EmptyState;
