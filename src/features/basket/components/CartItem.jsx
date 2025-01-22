import React from 'react';
import { Card, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';

const ItemContainer = styled(Card)`
  margin: ${({ theme }) => theme.spacing.sm}px;
`;

const Content = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.roundness}px;
`;

const Details = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

const Price = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <ItemContainer>
      <Content>
        <ImageContainer>
          <ProductImage source={{ uri: item.imageUrl }} />
        </ImageContainer>
        
        <Details>
          <Title numberOfLines={1}>{item.name}</Title>
          <Price>€{(item.price * item.quantity).toFixed(2)}</Price>
          
          <QuantityContainer>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity === 1}
            />
            <Title>{item.quantity}</Title>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => onUpdateQuantity(item.quantity + 1)}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={onRemove}
              color="red"
            />
          </QuantityContainer>
        </Details>
      </Content>
    </ItemContainer>
  );
};

export default CartItem;
