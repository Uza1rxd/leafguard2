import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Typography } from '@/constants/Design';

// Mock data - replace with real API data
const treatmentData = [
  {
    id: '1',
    disease: 'Leaf Blight',
    treatments: [
      {
        id: 't1',
        name: 'Copper Fungicide Application',
        type: 'Chemical',
        instructions: 'Apply copper fungicide spray early morning or late evening',
        completed: false,
        dueDate: '2024-03-20',
      },
      {
        id: 't2',
        name: 'Prune Affected Areas',
        type: 'Cultural',
        instructions: 'Remove and destroy infected leaves and branches',
        completed: true,
        dueDate: '2024-03-18',
      },
    ],
  },
  {
    id: '2',
    disease: 'Powdery Mildew',
    treatments: [
      {
        id: 't3',
        name: 'Neem Oil Treatment',
        type: 'Organic',
        instructions: 'Spray diluted neem oil solution on affected areas',
        completed: false,
        dueDate: '2024-03-21',
      },
    ],
  },
];

function TreatmentCard({ treatment, onToggle }: {
  treatment: typeof treatmentData[0]['treatments'][0];
  onToggle: (id: string) => void;
}) {
  return (
    <ThemedView style={styles.treatmentCard}>
      <View style={styles.treatmentHeader}>
        <View style={styles.treatmentType}>
          <IconSymbol 
            name={treatment.type === 'Organic' ? 'leaf' : treatment.type === 'Chemical' ? 'flask' : 'scissors'} 
            size={16} 
            color={Colors.primary} 
          />
          <ThemedText style={styles.treatmentTypeText}>{treatment.type}</ThemedText>
        </View>
        <Switch
          value={treatment.completed}
          onValueChange={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onToggle(treatment.id);
          }}
          trackColor={{ false: '#767577', true: Colors.primary }}
        />
      </View>
      
      <ThemedText style={styles.treatmentName}>{treatment.name}</ThemedText>
      <ThemedText style={styles.treatmentInstructions}>{treatment.instructions}</ThemedText>
      
      <View style={styles.treatmentFooter}>
        <ThemedText style={styles.dueDate}>Due: {treatment.dueDate}</ThemedText>
      </View>
    </ThemedView>
  );
}

export default function TreatmentsScreen() {
  const [treatments, setTreatments] = useState(treatmentData);

  const toggleTreatment = (treatmentId: string) => {
    setTreatments(prevTreatments => 
      prevTreatments.map(disease => ({
        ...disease,
        treatments: disease.treatments.map(t => 
          t.id === treatmentId ? { ...t, completed: !t.completed } : t
        )
      }))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Treatment Management</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Track and manage disease treatments</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        {treatments.map(disease => (
          <View key={disease.id} style={styles.diseaseSection}>
            <ThemedText style={styles.diseaseTitle}>{disease.disease}</ThemedText>
            {disease.treatments.map(treatment => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onToggle={toggleTreatment}
              />
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <IconSymbol name="plus.circle.fill" size={24} color={Colors.white} />
          <ThemedText style={styles.addButtonText}>Add New Treatment</ThemedText>
        </TouchableOpacity>
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
  diseaseSection: {
    marginBottom: 25,
  },
  diseaseTitle: {
    fontFamily: Typography.primary,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  treatmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  treatmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  treatmentType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  treatmentTypeText: {
    fontFamily: Typography.secondary,
    fontSize: 12,
    marginLeft: 5,
    color: Colors.primary,
  },
  treatmentName: {
    fontFamily: Typography.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  treatmentInstructions: {
    fontFamily: Typography.secondary,
    fontSize: 14,
    color: Colors.black + '99',
    marginBottom: 10,
  },
  treatmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dueDate: {
    fontFamily: Typography.secondary,
    fontSize: 12,
    color: Colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  addButtonText: {
    fontFamily: Typography.primary,
    fontSize: 16,
    color: Colors.white,
    marginLeft: 10,
  },
}); 