import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing, fontSize } from '../styles/theme';

const formatPopulation = (population) =>
  population == null ? 'Sin datos' : population.toLocaleString('es-AR');

const formatCurrencies = (currencies = []) => {
  if (!currencies.length) return 'Sin datos';

  return currencies
    .map(({ name, code, symbol }) => {
      const details = [code, symbol].filter(Boolean).join(' · ');
      return details ? `${name || code} (${details})` : name;
    })
    .join(', ');
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const CountryDetailsModal = ({ country, onClose }) => (
  <Modal
    visible={Boolean(country)}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={onClose}
  >
    <SafeAreaView style={styles.container}>
      {country && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Información del país</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cerrar detalle"
              hitSlop={8}
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {country.flag ? (
              <Image
                source={{ uri: country.flag }}
                style={styles.flag}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.flag, styles.flagPlaceholder]}>
                <Text style={styles.flagPlaceholderText}>{'🏳️'}</Text>
              </View>
            )}
            <Text style={styles.name}>{country.name}</Text>

            <View style={styles.detailsCard}>
              <DetailRow label="Capital" value={country.capital} />
              <DetailRow label="Región" value={country.continent} />
              <DetailRow
                label="Población"
                value={formatPopulation(country.population)}
              />
              <DetailRow
                label="Idiomas"
                value={country.languages?.join(', ') || 'Sin datos'}
              />
              <DetailRow
                label="Moneda"
                value={formatCurrencies(country.currencies)}
              />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  </Modal>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: { padding: spacing.sm },
  closeText: { color: colors.primary, fontSize: fontSize.md, fontWeight: '700' },
  buttonPressed: { opacity: 0.55 },
  content: { padding: spacing.lg, alignItems: 'center' },
  flag: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 1.6,
    borderRadius: 14,
    backgroundColor: colors.border,
  },
  flagPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  flagPlaceholderText: { fontSize: 64 },
  name: {
    marginVertical: spacing.lg,
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  detailsCard: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 14,
  },
  detailRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: { color: colors.text, fontSize: fontSize.lg, lineHeight: 23 },
});

export default CountryDetailsModal;
