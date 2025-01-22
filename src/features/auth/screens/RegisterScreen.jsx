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

const LoginLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register, loading } = useAuth();
  const { notify } = useNotification();

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      notify('Passwords do not match', 'error');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Title>Create Account</Title>
      
      <Input
        label="Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      
      <Input
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Input
        label="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      
      <Input
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />
      
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
      
      <LoginLink onPress={() => navigation.navigate('Login')}>
        Already have an account? Login here
      </LoginLink>
    </Container>
  );
};

export default RegisterScreen;
