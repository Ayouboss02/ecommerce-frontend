import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { useBasket } from '../../../shared/hooks/useBasket';
import { useNotification } from '../../../shared/hooks/useNotification';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProductImage = styled(Card.Cover)`
  height: 300px;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const QuantityText = styled.Text`
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
`;

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useBasket();
  const { notify } = useNotification();

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    notify('Added to cart successfully', 'success');
  };

  return (
    <Container>
      <ProductImage source={{ uri: product.imageUrl }} />
      <ContentContainer>
        <Title>{product.name}</Title>
        <Price>€{product.price.toFixed(2)}</Price>
        <Paragraph>{product.description}</Paragraph>

        <QuantityContainer>
          <IconButton
            icon="minus"
            onPress={() => handleQuantityChange(-1)}
            disabled={quantity === 1}
          />
          <QuantityText>{quantity}</QuantityText>
          <IconButton
            icon="plus"
            onPress={() => handleQuantityChange(1)}
          />
        </QuantityContainer>

        <Button
          mode="contained"
          onPress={handleAddToCart}
          style={{ marginTop: 16 }}
        >
          Add to Cart
        </Button>
      </ContentContainer>
    </Container>
  );
};

export default ProductDetailScreen;
