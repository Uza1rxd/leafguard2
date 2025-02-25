import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    // TODO: Implement actual password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
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
        <View style={styles.header}>
          <IconSymbol name="leaf.fill" size={60} color="#FFFFFF" />
          <ThemedText style={styles.title}>Reset Password</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter your email to receive reset instructions
          </ThemedText>
        </View>

        <View style={styles.form}>
          {!isSent ? (
            <>
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

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                <ThemedText style={styles.buttonText}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successContainer}>
              <IconSymbol name="checkmark.circle.fill" size={60} color="#4A6741" />
              <ThemedText style={styles.successText}>
                Reset instructions have been sent to your email
              </ThemedText>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.push('/auth/login')}
              >
                <ThemedText style={styles.backButtonText}>Back to Login</ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {!isSent && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push('/auth/login')}
            >
              <ThemedText style={styles.backButtonText}>Back to Login</ThemedText>
            </TouchableOpacity>
          )}
        </View>
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
    textAlign: 'center',
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
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4A6741',
    fontSize: 16,
    fontWeight: '600',
  },
}); 