import { Image, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ValidRoutes = '/(tabs)' | '/(tabs)/explore' | '/(tabs)/scan';

interface QuickActionProps {
  title: string;
  icon: string;
  route: ValidRoutes;
  description: string;
  color: string;
}

function QuickAction({ title, icon, route, description, color }: QuickActionProps) {
  return (
    <Pressable onPress={() => router.push(route)} style={styles.actionWrapper}>
      <LinearGradient
        colors={[color, color + '99']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionCard}>
        <IconSymbol name={icon as any} size={32} color="#FFFFFF" />
        <ThemedView style={styles.actionContent}>
          <ThemedText style={styles.actionTitle}>{title}</ThemedText>
          <ThemedText style={styles.actionDescription}>{description}</ThemedText>
        </ThemedView>
      </LinearGradient>
    </Pressable>
  );
}

function EnvironmentCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <ThemedView style={styles.envItem}>
      <IconSymbol name={icon as any} size={24} color="#4A6741" />
      <ThemedText style={styles.envValue}>{value}</ThemedText>
      <ThemedText style={styles.envTitle}>{title}</ThemedText>
    </ThemedView>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {/* Header Section */}
      <LinearGradient
        colors={['#4A6741', '#2D4D1E']}
        style={styles.headerGradient}>
        <ThemedView style={styles.header}>
          <IconSymbol 
            name="leaf.fill" 
            size={60} 
            color="#FFFFFF" 
            style={styles.logo}
          />
          <ThemedText style={styles.headerTitle}>LeafGuard</ThemedText>
          <ThemedText style={styles.headerSubtitle}>AI-Powered Plant Disease Detection</ThemedText>
        </ThemedView>
      </LinearGradient>

      {/* Environmental Summary */}
      <ThemedView style={styles.envCard}>
        <ThemedText style={styles.sectionTitle}>Current Conditions</ThemedText>
        <ThemedView style={styles.envGrid}>
          <EnvironmentCard title="Temperature" value="24°C" icon="house.fill" />
          <EnvironmentCard title="Humidity" value="65%" icon="house.fill" />
          <EnvironmentCard title="Risk Level" value="Low" icon="house.fill" />
        </ThemedView>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <QuickAction 
          title="Scan Plant"
          icon="camera.fill"
          route="/(tabs)/scan"
          description="Detect diseases using AI"
          color="#4A6741"
        />
        <QuickAction 
          title="View Map"
          icon="map.fill"
          route="/(tabs)/explore"
          description="Check disease spread in your area"
          color="#6B8E23"
        />
        <QuickAction 
          title="Treatment Guide"
          icon="cross.case.fill"
          route="/(tabs)"
          description="View recommended treatments"
          color="#556B2F"
        />
      </ThemedView>

      {/* Recent Scans */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recent Scans</ThemedText>
        <ThemedView style={styles.emptyState}>
          <IconSymbol name="house.fill" size={48} color="#4A6741" />
          <ThemedText style={styles.emptyStateText}>No recent scans available</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF99',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#4A6741',
  },
  envCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  envGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  envItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  envValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A6741',
    marginTop: 8,
  },
  envTitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  actionWrapper: {
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionContent: {
    marginLeft: 16,
    flex: 1,
    backgroundColor: 'transparent',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionDescription: {
    fontSize: 14,
    color: '#FFFFFF99',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
  },
  emptyStateText: {
    marginTop: 12,
    color: '#666666',
  },
});
