import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../styles/theme';

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  const { name, flag, capital, continent } = country;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {flag ? (
        <Image source={{ uri: flag }} style={styles.flag} resizeMode="cover" />
      ) : (
        <View style={[styles.flag, styles.flagPlaceholder]}>
          <Text style={styles.flagPlaceholderText}>{'\uD83C\uDFF3\uFE0F'}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.detail}>Capital: {capital}</Text>
        <Text style={styles.detail}>Continente: {continent}</Text>
      </View>
      <Pressable onPress={() => onToggleFavorite(country.cca3)} style={styles.starButton}>
        <Text style={[styles.star, isFavorite && styles.starActive]}>
          {isFavorite ? '\u2605' : '\u2606'}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  flag: {
    width: 60,
    height: 40,
    borderRadius: 6,
  },
  flagPlaceholder: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagPlaceholderText: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  starButton: {
    padding: spacing.sm,
  },
  star: {
    fontSize: 26,
    color: colors.starEmpty,
  },
  starActive: {
    color: colors.star,
  },
});

export default CountryCard;
