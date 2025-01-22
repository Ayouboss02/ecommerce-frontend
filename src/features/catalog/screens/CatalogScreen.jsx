import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import styled from 'styled-components/native';
import { useCatalog } from '../../../shared/hooks/useCatalog';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const FiltersContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: ${props => props.theme.spacing.md}px;
`;

const SearchContainer = styled.View`
  padding: ${props => props.theme.spacing.md}px;
`;

const CatalogScreen = ({ navigation }) => {
  const { products, loading, error, fetchProducts, filters, updateFilters } = useCatalog();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    updateFilters({ ...filters, search: query });
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <SearchContainer>
        <Searchbar
          placeholder="Search products..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </SearchContainer>

      <FiltersContainer>
        <Chip
          selected={!filters.category}
          onPress={() => updateFilters({ ...filters, category: null })}
          style={{ marginRight: 8 }}
        >
          All
        </Chip>
        {/* Add category chips here */}
      </FiltersContainer>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />
    </Container>
  );
};

export default CatalogScreen;
