import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, useWindowDimensions, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Typography } from '@/constants/Design';

function EnvironmentCard({ title, value, icon, unit }: { 
  title: string; 
  value: string; 
  icon: string;
  unit: string;
}) {
  return (
    <ThemedView style={styles.envItem}>
      <IconSymbol name={icon as any} size={24} color={Colors.primary} />
      <View style={styles.envValueContainer}>
        <ThemedText style={styles.envValue}>{value}</ThemedText>
        <ThemedText style={styles.envUnit}>{unit}</ThemedText>
      </View>
      <ThemedText style={styles.envTitle}>{title}</ThemedText>
    </ThemedView>
  );
}

const chartTheme = {
  axis: {
    style: {
      axis: { stroke: Colors.black },
      tickLabels: { 
        fill: Colors.black,
        fontSize: 12,
        fontFamily: Typography.secondary
      },
      grid: { stroke: "transparent" }
    }
  }
};

export default function EnvironmentScreen() {
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Environmental Data</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Real-time conditions for your crops</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Current Conditions</ThemedText>
          <View style={styles.envGrid}>
            <EnvironmentCard title="Temperature" value="24" icon="thermometer" unit="°C" />
            <EnvironmentCard title="Humidity" value="65" icon="humidity" unit="%" />
            <EnvironmentCard title="UV Index" value="6" icon="sun.max" unit="" />
            <EnvironmentCard title="Wind Speed" value="12" icon="wind" unit="km/h" />
          </View>
        </View>

        <View style={[styles.section, styles.chartSection]}>
          <ThemedText style={styles.sectionTitle}>Weekly Temperature</ThemedText>
          <VictoryChart
            theme={VictoryTheme.material}
            height={250}
            padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
          >
            <VictoryLine
              style={{
                data: { stroke: Colors.primary, strokeWidth: 2 },
              }}
              data={[
                { x: 'Mon', y: 22 },
                { x: 'Tue', y: 24 },
                { x: 'Wed', y: 23 },
                { x: 'Thu', y: 25 },
                { x: 'Fri', y: 24 },
                { x: 'Sat', y: 23 },
                { x: 'Sun', y: 24 },
              ]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t: number) => `${t}°C`}
            />
            <VictoryAxis
              style={{
                axis: { stroke: Colors.black },
                tickLabels: { fill: Colors.black }
              }}
            />
          </VictoryChart>
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
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontFamily: Typography.primary,
    fontSize: 28,
    fontWeight: '600',
    color: Colors.white,
  },
  headerSubtitle: {
    fontFamily: Typography.secondary,
    fontSize: 16,
    color: Colors.white + 'CC',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
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
  },
  envItem: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  envValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  envValue: {
    fontFamily: Typography.primary,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
  envUnit: {
    fontFamily: Typography.secondary,
    fontSize: 14,
    color: Colors.black,
    marginLeft: 4,
  },
  envTitle: {
    fontFamily: Typography.secondary,
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
  },
  chartSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 