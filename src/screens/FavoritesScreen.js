import { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCountries } from '../hooks/useCountries';
import { useFavorites } from '../hooks/useFavorites';
import CountryCard from '../components/CountryCard';
import { colors, spacing, fontSize } from '../styles/theme';

const FavoritesScreen = () => {
  const { countries } = useCountries();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteCountries = useMemo(
    () => countries.filter((c) => favorites.includes(c.cca3)),
    [countries, favorites]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteCountries}
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
            <Text style={styles.emptyIcon}>{'\u2605'}</Text>
            <Text style={styles.emptyText}>
              No tenés países favoritos todavía.
            </Text>
            <Text style={styles.emptyHint}>
              Andá a la pestaña Home y tocá la estrella para agregar uno.
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
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: 120,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.starEmpty,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export default FavoritesScreen;
