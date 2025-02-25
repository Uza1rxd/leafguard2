import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from 'expo-camera';
import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Pressable, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);

  if (!permission) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.text}>Loading camera permissions...</ThemedText>
      </ThemedView>
    );
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.text}>We need your permission to use the camera</ThemedText>
        <TouchableOpacity 
          style={styles.button} 
          onPress={requestPermission}>
          <ThemedText style={styles.buttonText}>Grant Permission</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const takePicture = async () => {
    if (!isProcessing && cameraRef.current) {
      try {
        setIsProcessing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });

        // TODO: Send to backend for processing
        Alert.alert(
          "Processing Image",
          "Analyzing leaf for diseases...",
          [{ text: "OK" }]
        );

        // Mock processing result
        setTimeout(() => {
          Alert.alert(
            "Analysis Complete",
            "Detected: Leaf Rust\nConfidence: 95%\nRecommended Treatment: Fungicide application",
            [
              { 
                text: "View Details",
                onPress: () => router.push({
                  pathname: '/(tabs)',
                  params: { screen: 'treatment' }
                })
              },
              { text: "Close" }
            ]
          );
        }, 2000);

      } catch (error) {
        Alert.alert("Error", "Failed to capture image");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      // TODO: Process the selected image
      Alert.alert("Processing", "Analyzing selected image...");
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  const toggleTorch = () => {
    setTorch(current => !current);
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        enableTorch={torch}
        onMountError={() => {
          Alert.alert("Camera Error", "Failed to initialize camera");
        }}
      >
        <View style={styles.overlay}>
          {/* Camera Guide Frame */}
          <View style={styles.guideFrame}>
            <ThemedText style={styles.guideText}>
              Position the leaf in the frame
            </ThemedText>
          </View>
          
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity onPress={toggleTorch} style={styles.controlButton}>
              <IconSymbol 
                name={torch ? "bolt.fill" : "bolt.slash.fill"} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.controlButton}>
              <IconSymbol name="camera.rotate.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={pickImage}>
              <IconSymbol name="photo.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Pressable 
              style={({pressed}) => [
                styles.captureButton, 
                isProcessing && styles.buttonDisabled,
                pressed && styles.buttonPressed
              ]}
              onPress={takePicture}
              disabled={isProcessing}>
              <View style={styles.captureButtonInner} />
            </Pressable>

            <TouchableOpacity 
              style={styles.helpButton}
              onPress={() => Alert.alert(
                "Tips for Better Detection",
                "1. Ensure good lighting\n2. Position the leaf to fill the frame\n3. Hold the camera steady\n4. Capture the entire leaf"
              )}>
              <IconSymbol name="questionmark.circle.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  guideFrame: {
    alignSelf: 'center',
    width: 280,
    height: 280,
    marginTop: 100,
    borderWidth: 2,
    borderColor: '#FFFFFF80',
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  guideText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#00000080',
    padding: 8,
    borderRadius: 8,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF40',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4A6741',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
}); 