import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryPie, VictoryLegend } from 'victory-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Typography } from '@/constants/Design';

// Mock data - replace with real API data
const diseaseData = [
  { x: "Leaf Blight", y: 35 },
  { x: "Powdery Mildew", y: 25 },
  { x: "Rust", y: 20 },
  { x: "Other", y: 20 }
];

const mapMarkers = [
  {
    id: 1,
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
    title: "Leaf Blight Detected",
    description: "Severity: High",
    disease: "Leaf Blight"
  },
];

// Web fallback component for map
function WebMapFallback() {
  return (
    <ThemedView style={[styles.map, styles.webMapFallback]}>
      <IconSymbol name="map.fill" size={48} color={Colors.primary} />
      <ThemedText style={styles.webMapTitle}>Geographic Distribution</ThemedText>
      <ThemedText style={styles.webMapText}>
        The interactive map is available in our mobile app.
      </ThemedText>
      <TouchableOpacity style={styles.webMapButton}>
        <ThemedText style={styles.webMapButtonText}>Download Mobile App</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

// Lazy load MapView component only for native platforms
const MapView = Platform.select({
  native: () => require('react-native-maps').default,
  default: () => WebMapFallback,
})();

export default function TrendsScreen() {
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('week');

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Disease Trends</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Track disease spread and patterns</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        {/* Time Range Selector */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, timeRange === 'week' && styles.filterButtonActive]}
            onPress={() => setTimeRange('week')}
          >
            <ThemedText style={styles.filterText}>Week</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeRange === 'month' && styles.filterButtonActive]}
            onPress={() => setTimeRange('month')}
          >
            <ThemedText style={styles.filterText}>Month</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeRange === 'year' && styles.filterButtonActive]}
            onPress={() => setTimeRange('year')}
          >
            <ThemedText style={styles.filterText}>Year</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Disease Distribution Chart */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText style={styles.sectionTitle}>Disease Distribution</ThemedText>
          <View style={styles.pieChartContainer}>
            <VictoryPie
              data={diseaseData}
              width={300}
              height={300}
              colorScale={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]}
              innerRadius={70}
              labelRadius={({ innerRadius }) => {
                const radius = typeof innerRadius === 'number' ? innerRadius : 0;
                return radius + 30;
              }}
              style={{ labels: { fill: Colors.black, fontSize: 12, fontFamily: Typography.secondary } }}
            />
          </View>
        </ThemedView>

        {/* Map View */}
        <ThemedView style={styles.mapContainer}>
          <ThemedText style={styles.sectionTitle}>Geographic Distribution</ThemedText>
          {Platform.OS === 'web' ? (
            <WebMapFallback />
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )}
        </ThemedView>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontFamily: Typography.secondary,
    color: Colors.primary,
  },
  chartContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  mapContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  sectionTitle: {
    fontFamily: Typography.primary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  markerTitle: {
    fontFamily: Typography.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  webMapFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  webMapTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  webMapText: {
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.black + '99',
  },
  webMapButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  webMapButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
}); 