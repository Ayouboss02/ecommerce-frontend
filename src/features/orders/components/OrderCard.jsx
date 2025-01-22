import React from 'react';
import { Card, List } from 'react-native-paper';
import styled from 'styled-components/native';

const OrderContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const OrderHeader = styled(Card.Title)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const OrderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-weight: bold;
`;

const OrderSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
`;

const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.disabled};
`;

const TotalText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

const OrderCard = ({ order }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFA000';
      case 'processing':
        return '#1976D2';
      case 'completed':
        return '#43A047';
      case 'cancelled':
        return '#D32F2F';
      default:
        return '#757575';
    }
  };

  return (
    <OrderContainer>
      <OrderHeader
        title={<OrderTitle>Order #{order.id}</OrderTitle>}
        subtitle={<OrderSubtitle>{formatDate(order.date)}</OrderSubtitle>}
        right={(props) => (
          <Card.Title
            {...props}
            subtitle={<OrderSubtitle style={{ color: getStatusColor(order.status) }}>
              {order.status}
            </OrderSubtitle>}
          />
        )}
      />
      
      <Card.Content>
        {order.items.map((item) => (
          <List.Item
            key={item.id}
            title={item.name}
            description={`Quantity: ${item.quantity}`}
            right={() => <TotalText>€{(item.price * item.quantity).toFixed(2)}</TotalText>}
          />
        ))}
        
        <TotalContainer>
          <TotalText>Total</TotalText>
          <TotalText>€{order.total.toFixed(2)}</TotalText>
        </TotalContainer>
      </Card.Content>
    </OrderContainer>
  );
};

export default OrderCard;
