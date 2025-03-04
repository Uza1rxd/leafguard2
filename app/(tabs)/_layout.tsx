import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors, Typography } from '@/constants/Design';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: Colors.background,
              borderTopWidth: 0,
              elevation: 0,
              height: 60,
              paddingBottom: 10,
            },
            default: {
              backgroundColor: Colors.background,
              borderTopWidth: 0,
              elevation: 0,
              height: 60,
              paddingBottom: 10,
            },
          }),
          tabBarLabelStyle: {
            fontFamily: Typography.secondary,
            fontSize: 12,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: 'Scan',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="camera.viewfinder" color={color} />,
          }}
        />
        <Tabs.Screen
          name="environment"
          options={{
            title: 'Environment',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="leaf.circle.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="trends"
          options={{
            title: 'Trends',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="chart.bar.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="treatments"
          options={{
            title: 'Treatments',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="cross.case.fill" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
