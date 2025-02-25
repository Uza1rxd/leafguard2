import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, useWindowDimensions, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

function EnvironmentCard({ title, value, icon, unit }: { 
  title: string; 
  value: string; 
  icon: string;
  unit: string;
}) {
  return (
    <ThemedView style={styles.envItem}>
      <IconSymbol name={icon as any} size={24} color="#4A6741" />
      <View style={styles.envValueContainer}>
        <ThemedText style={styles.envValue}>{value}</ThemedText>
        <ThemedText style={styles.envUnit}>{unit}</ThemedText>
      </View>
      <ThemedText style={styles.envTitle}>{title}</ThemedText>
    </ThemedView>
  );
}

export default function EnvironmentScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: '24',
    humidity: '65',
    rainfall: '0.5',
    uvIndex: '6',
    windSpeed: '12',
    soilMoisture: '45'
  });

  // Mock data for the chart
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [22, 24, 23, 25, 24, 23, 24],
        color: (opacity = 1) => `rgba(74, 103, 65, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch real weather data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header Section */}
      <LinearGradient
        colors={['#4A6741', '#2D4D1E']}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Environmental Data</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Real-time conditions for your crops</ThemedText>
      </LinearGradient>

      {/* Current Conditions */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Current Conditions</ThemedText>
        <View style={styles.envGrid}>
          <EnvironmentCard 
            title="Temperature" 
            value={weatherData.temperature} 
            icon="thermometer" 
            unit="°C"
          />
          <EnvironmentCard 
            title="Humidity" 
            value={weatherData.humidity} 
            icon="humidity" 
            unit="%"
          />
          <EnvironmentCard 
            title="Rainfall" 
            value={weatherData.rainfall} 
            icon="cloud.rain.fill" 
            unit="mm"
          />
          <EnvironmentCard 
            title="UV Index" 
            value={weatherData.uvIndex} 
            icon="sun.max.fill" 
            unit="UV"
          />
          <EnvironmentCard 
            title="Wind Speed" 
            value={weatherData.windSpeed} 
            icon="wind" 
            unit="km/h"
          />
          <EnvironmentCard 
            title="Soil Moisture" 
            value={weatherData.soilMoisture} 
            icon="drop.fill" 
            unit="%"
          />
        </View>
      </View>

      {/* Weekly Temperature Trend */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Weekly Temperature Trend</ThemedText>
        <LineChart
          data={weeklyData}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(74, 103, 65, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4A6741'
            }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Disease Risk Alert */}
      <View style={styles.section}>
        <View style={styles.alertContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#FFA500" />
          <ThemedText style={styles.alertText}>
            Current conditions indicate moderate risk for fungal diseases. Consider preventive measures.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF99',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  envGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  envItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  envValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  envValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A6741',
  },
  envUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  envTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  alertContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  alertText: {
    flex: 1,
    marginLeft: 12,
    color: '#FF8C00',
    fontSize: 14,
  },
}); 