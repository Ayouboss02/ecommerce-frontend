import React from 'react';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useBasket } from '../../../shared/hooks/useBasket';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.disabled};
`;

const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TotalText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
`;

const CartScreen = ({ navigation }) => {
  const { items, total, removeItem, updateItemQuantity } = useBasket();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeItem(item.id)}
            onUpdateQuantity={(quantity) => updateItemQuantity(item.id, quantity)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <Footer>
        <TotalContainer>
          <TotalText>Total:</TotalText>
          <TotalText>€{total.toFixed(2)}</TotalText>
        </TotalContainer>
        
        <Button
          mode="contained"
          onPress={handleCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Footer>
    </Container>
  );
};

export default CartScreen;
