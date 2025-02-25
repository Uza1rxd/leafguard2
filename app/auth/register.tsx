import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    // TODO: Implement actual registration logic
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#4A6741', '#2D4D1E']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconSymbol name="leaf.fill" size={60} color="#FFFFFF" />
            <ThemedText style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Join LeafGuard today</ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={20} color="#4A6741" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="envelope.fill" size={20} color="#4A6741" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={20} color="#4A6741" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={20} color="#4A6741" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <ThemedText style={styles.buttonText}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>Already have an account? </ThemedText>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <ThemedText style={styles.footerLink}>Sign In</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF99',
    marginTop: 8,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4A6741',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#4A6741',
    fontWeight: '600',
  },
}); 