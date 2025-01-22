import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useBasket } from '../../../shared/hooks/useBasket';
import { useNotification } from '../../../shared/hooks/useNotification';

const StyledCard = styled(Card)`
  margin: ${props => props.theme.spacing.xs}px;
  flex: 1;
  max-width: 48%;
`;

const ProductImage = styled(Card.Cover)`
  height: 150px;
`;

const ProductCard = ({ product, onPress }) => {
  const { addItem } = useBasket();
  const { notify } = useNotification();

  const handleAddToCart = () => {
    addItem(product);
    notify('Product added to cart', 'success');
  };

  return (
    <StyledCard onPress={onPress}>
      <ProductImage source={{ uri: product.imageUrl }} />
      <Card.Content>
        <Title numberOfLines={1}>{product.name}</Title>
        <Paragraph numberOfLines={2}>{product.description}</Paragraph>
        <Paragraph>€{product.price.toFixed(2)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleAddToCart}>Add to Cart</Button>
      </Card.Actions>
    </StyledCard>
  );
};

export default ProductCard;
