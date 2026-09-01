import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useCountries } from '../hooks/useCountries';
import { useFavorites } from '../hooks/useFavorites';
import CountryCard from '../components/CountryCard';
import { colors, spacing, fontSize } from '../styles/theme';

const HomeScreen = () => {
  const { countries, loading, error } = useCountries();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return countries;
    const lower = query.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.continent.toLowerCase().includes(lower)
    );
  }, [countries, query]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando países...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error.message}</Text>
        <Text style={styles.errorDetail}>{error.detail}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar país o continente..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            isFavorite={isFavorite(item.cca3)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              No se encontraron países para "{query}"
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: 10,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    fontSize: fontSize.lg,
    color: colors.primary,
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.error,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

export default HomeScreen;
