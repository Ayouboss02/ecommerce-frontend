import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useOrders } from '../../../shared/hooks/useOrders';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import EmptyState from '../../../shared/components/EmptyState';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const OrdersScreen = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="clipboard-list"
        title="No Orders Yet"
        message="Your order history will appear here"
      />
    );
  }

  return (
    <Container>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </Container>
  );
};

export default OrdersScreen;
