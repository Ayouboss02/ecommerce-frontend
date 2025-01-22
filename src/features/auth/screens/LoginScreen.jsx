import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useNotification } from '../../../shared/hooks/useNotification';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
`;

const Input = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const RegisterLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const { notify } = useNotification();

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Title>Welcome Back</Title>
      
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      
      <RegisterLink onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register here
      </RegisterLink>
    </Container>
  );
};

export default LoginScreen;
