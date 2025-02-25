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
import { Colors } from '@/constants/Design';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);

  const toggleCameraType = () => {
    setFacing(current => (
      current === 'back' ? 'front' : 'back'
    ));
  };

  const toggleFlash = () => {
    setTorch(current => !current);
  };

  const handleClose = () => {
    router.push('/(tabs)');
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ThemedText>Requesting camera permission...</ThemedText>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.text}>No access to camera</ThemedText>
        <Pressable 
          style={styles.button} 
          onPress={requestPermission}
        >
          <ThemedText style={styles.buttonText}>Grant Permission</ThemedText>
        </Pressable>
      </View>
    );
  }

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
        <View style={styles.controls}>
          <View style={styles.topControls}>
            <Pressable onPress={handleClose} style={styles.controlButton}>
              <IconSymbol name="xmark" size={24} color={Colors.white} />
            </Pressable>
            <Pressable onPress={toggleFlash} style={styles.controlButton}>
              <IconSymbol 
                name={torch ? "bolt.slash.fill" : "bolt.fill"} 
                size={24} 
                color={Colors.white} 
              />
            </Pressable>
          </View>
          
          <View style={styles.bottomControls}>
            <Pressable style={styles.controlButton}>
              <IconSymbol name="photo.on.rectangle" size={24} color={Colors.white} />
            </Pressable>
            <Pressable style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </Pressable>
            <Pressable onPress={toggleCameraType} style={styles.controlButton}>
              <IconSymbol name="camera.rotate.fill" size={24} color={Colors.white} />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.white,
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