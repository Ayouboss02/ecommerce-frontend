import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput, Avatar, List } from 'react-native-paper';
import styled from 'styled-components/native';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useNotification } from '../../../shared/hooks/useNotification';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const Section = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Input = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ProfileScreen = () => {
  const { user, loading, logout } = useAuth();
  const { notify } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = async () => {
    try {
      // Implement profile update logic here
      setIsEditing(false);
      notify('Profile updated successfully', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleLogout = () => {
    logout();
    notify('Logged out successfully', 'success');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Header>
        <Avatar.Icon size={80} icon="account" />
        <UserName>{user?.name}</UserName>
      </Header>

      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        {isEditing ? (
          <>
            <Input
              label="Name"
              value={profile.name}
              onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
            />
            <Input
              label="Email"
              value={profile.email}
              onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              disabled
            />
            <Input
              label="Phone"
              value={profile.phone}
              onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
            />
            <Button mode="contained" onPress={handleSave}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <List.Item
              title="Name"
              description={profile.name}
              left={props => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              title="Email"
              description={profile.email}
              left={props => <List.Icon {...props} icon="email" />}
            />
            <List.Item
              title="Phone"
              description={profile.phone || 'Not set'}
              left={props => <List.Icon {...props} icon="phone" />}
            />
            <Button mode="outlined" onPress={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </Section>

      <Section>
        <SectionTitle>Settings</SectionTitle>
        <List.Item
          title="Notifications"
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Privacy"
          left={props => <List.Icon {...props} icon="shield-account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Help & Support"
          left={props => <List.Icon {...props} icon="help-circle" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </Section>

      <Section>
        <Button mode="contained" onPress={handleLogout} color="red">
          Logout
        </Button>
      </Section>
    </Container>
  );
};

export default ProfileScreen;
