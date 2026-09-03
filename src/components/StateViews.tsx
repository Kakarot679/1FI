import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { AppText } from './AppText';
import { PrimaryButton } from './PrimaryButton';

/** Centered loading spinner with an optional caption. */
export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.primary} size="large" />
      <AppText variant="subtle" color={colors.inkSubtle} style={styles.gap}>
        {label}
      </AppText>
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We couldn’t load this right now. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.center}>
      <AppText variant="eyebrow" color={colors.inkMuted}>
        {title.toUpperCase()}
      </AppText>
      <AppText variant="body" color={colors.inkSubtle} center style={styles.gap}>
        {message}
      </AppText>
      {onRetry ? (
        <PrimaryButton
          label="Try again"
          variant="outline"
          onPress={onRetry}
          style={styles.retry}
        />
      ) : null}
    </View>
  );
}

interface EmptyStateProps {
  title: string;
  message: string;
  illustration?: ReactNode;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({ title, message, illustration, action }: EmptyStateProps) {
  return (
    <View style={styles.center}>
      {illustration ? <View style={styles.illustration}>{illustration}</View> : null}
      <AppText variant="eyebrow" color={colors.inkMuted}>
        {title.toUpperCase()}
      </AppText>
      <AppText variant="body" color={colors.inkSubtle} center style={styles.gap}>
        {message}
      </AppText>
      {action ? (
        <PrimaryButton label={action.label} onPress={action.onPress} style={styles.retry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  gap: { marginTop: spacing.sm, maxWidth: 280 },
  illustration: { marginBottom: spacing.lg },
  retry: { marginTop: spacing.xl, alignSelf: 'stretch' },
});
