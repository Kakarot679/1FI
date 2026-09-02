import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { AppText } from './AppText';

interface SectionHeadingProps {
  // The small ALL-CAPS purple label with the little bar on the left
  // ("OFFERS", "WHY PAY WITH 1FI", "FREQUENTLY ASKED QUESTIONS").
  eyebrow?: string;
  // The larger black heading ("Top Brands", "Nearby Stores").
  title?: string;
  right?: ReactNode;
}

export function SectionHeading({ eyebrow, title, right }: SectionHeadingProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        {eyebrow ? (
          <View style={styles.eyebrowRow}>
            <View style={styles.bar} />
            <AppText variant="eyebrow" color={colors.primary}>
              {eyebrow.toUpperCase()}
            </AppText>
          </View>
        ) : null}
        {title ? (
          <AppText variant="sectionTitle" style={eyebrow ? styles.titleSpacing : undefined}>
            {title}
          </AppText>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexShrink: 1 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center' },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  titleSpacing: { marginTop: spacing.sm },
});
