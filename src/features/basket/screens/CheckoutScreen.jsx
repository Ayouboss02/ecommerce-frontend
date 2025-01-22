import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { useBasket } from '../../../shared/hooks/useBasket';
import { useOrders } from '../../../shared/hooks/useOrders';
import { useNotification } from '../../../shared/hooks/useNotification';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Section = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Input = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const TotalText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
`;

const CheckoutScreen = ({ navigation }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  
  const { items, total, emptyBasket } = useBasket();
  const { createOrder, loading } = useOrders();
  const { notify } = useNotification();

  const handleCheckout = async () => {
    try {
      const order = {
        items,
        total,
        shippingInfo,
      };
      
      await createOrder(order);
      emptyBasket();
      notify('Order placed successfully!', 'success');
      navigation.navigate('Orders');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Section>
        <Card.Content>
          <SectionTitle>Shipping Information</SectionTitle>
          <Input
            label="Full Name"
            value={shippingInfo.fullName}
            onChangeText={(text) => setShippingInfo(prev => ({ ...prev, fullName: text }))}
          />
          <Input
            label="Address"
            value={shippingInfo.address}
            onChangeText={(text) => setShippingInfo(prev => ({ ...prev, address: text }))}
          />
          <Input
            label="City"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo(prev => ({ ...prev, city: text }))}
          />
          <Input
            label="Postal Code"
            value={shippingInfo.postalCode}
            onChangeText={(text) => setShippingInfo(prev => ({ ...prev, postalCode: text }))}
            keyboardType="numeric"
          />
          <Input
            label="Phone Number"
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
          />
        </Card.Content>
      </Section>

      <Section>
        <Card.Content>
          <SectionTitle>Order Summary</SectionTitle>
          {items.map(item => (
            <TotalContainer key={item.id}>
              <TotalText>{item.name} x{item.quantity}</TotalText>
              <TotalText>€{(item.price * item.quantity).toFixed(2)}</TotalText>
            </TotalContainer>
          ))}
          <TotalContainer>
            <TotalText>Total</TotalText>
            <TotalText>€{total.toFixed(2)}</TotalText>
          </TotalContainer>
        </Card.Content>
      </Section>

      <Button
        mode="contained"
        onPress={handleCheckout}
        disabled={!Object.values(shippingInfo).every(Boolean)}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default CheckoutScreen;
