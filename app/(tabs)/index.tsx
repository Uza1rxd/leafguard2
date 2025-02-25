import { StyleSheet, ScrollView, View, Pressable, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Typography } from '@/constants/Design';

type ValidRoutes = '/(tabs)/scan' | '/(tabs)/environment';

interface QuickActionProps {
  title: string;
  icon: string;
  route: ValidRoutes;
  description: string;
  color: string;
}

function QuickAction({ title, icon, route, description }: QuickActionProps) {
  const handlePress = () => {
    router.push(route);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        styles.actionCard,
        pressed && { opacity: 0.9 }
      ]}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primary + 'E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionGradient}>
        <View style={styles.actionIcon}>
          <IconSymbol name={icon as any} size={24} color={Colors.white} />
        </View>
        <View style={styles.actionContent}>
          <ThemedText style={styles.actionTitle}>{title}</ThemedText>
          <ThemedText style={styles.actionDescription}>{description}</ThemedText>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function EnvironmentCard({ title, value, icon, trend }: { 
  title: string; 
  value: string; 
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}) {
  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return 'arrow.up.right';
      case 'down': return 'arrow.down.right';
      default: return 'arrow.right';
    }
  };

  return (
    <Pressable style={styles.envCard}>
      <LinearGradient
        colors={[Colors.white, Colors.lightGray]}
        style={styles.envCardGradient}>
        <View style={styles.envCardHeader}>
          <IconSymbol name={icon as any} size={20} color={Colors.primary} />
          <IconSymbol name={getTrendIcon()} size={16} color={Colors.primary} style={styles.trendIcon} />
        </View>
        <ThemedText style={styles.envValue}>{value}</ThemedText>
        <ThemedText style={styles.envTitle}>{title}</ThemedText>
      </LinearGradient>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <IconSymbol 
            name="leaf.fill" 
            size={40} 
            color={Colors.primary}
          />
          <ThemedText style={styles.headerTitle}>LeafGuard</ThemedText>
          <ThemedText style={styles.headerSubtitle}>AI-Powered Plant Care</ThemedText>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.envSummary}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Current Conditions</ThemedText>
            <IconSymbol name="arrow.right.circle.fill" size={24} color={Colors.primary} />
          </View>
          <View style={styles.envGrid}>
            <EnvironmentCard 
              title="Temperature" 
              value="24°C" 
              icon="thermometer" 
              trend="up"
            />
            <EnvironmentCard 
              title="Humidity" 
              value="65%" 
              icon="humidity.fill" 
              trend="stable"
            />
            <EnvironmentCard 
              title="UV Index" 
              value="High" 
              icon="sun.max.fill" 
              trend="down"
            />
            <EnvironmentCard 
              title="Risk Level" 
              value="Low" 
              icon="shield.checkered.fill" 
              trend="stable"
            />
          </View>
        </View>

        <View style={styles.actionsSection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
            <IconSymbol name="arrow.right.circle.fill" size={24} color={Colors.primary} />
          </View>
          <QuickAction 
            title="Scan Plant"
            icon="camera.viewfinder"
            route="/(tabs)/scan"
            description="Detect diseases instantly"
            color={Colors.primary}
          />
          <QuickAction 
            title="Environment"
            icon="leaf.circle.fill"
            route="/(tabs)/environment"
            description="Monitor conditions"
            color={Colors.primary}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: Colors.background,
  },
  headerContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Typography.primary,
    fontSize: 32,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 16,
  },
  headerSubtitle: {
    fontFamily: Typography.secondary,
    fontSize: 16,
    color: Colors.black,
    opacity: 0.7,
    marginTop: 4,
  },
  content: {
    padding: 24,
  },
  envSummary: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Typography.primary,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  envGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 16,
  },
  envItem: {
    alignItems: 'center',
    flex: 1,
  },
  envValue: {
    fontFamily: Typography.primary,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 8,
  },
  envTitle: {
    fontFamily: Typography.secondary,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.7,
    marginTop: 4,
  },
  actionsSection: {
    gap: 12,
  },
  actionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitle: {
    fontFamily: Typography.primary,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  actionDescription: {
    fontFamily: Typography.secondary,
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  envCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  envCardGradient: {
    padding: 16,
    height: 120,
  },
  envCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendIcon: {
    opacity: 0.7,
  },
});
