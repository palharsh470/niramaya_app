import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function FieldAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to select images.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Mock analysis after image selection
      setTimeout(() => {
        setAnalysisResult({
          cropType: 'Wheat',
          healthScore: 78,
          diseases: ['Minor leaf rust detected'],
          recommendations: [
            'Apply fungicide spray',
            'Increase watering frequency',
            'Monitor for 7 days'
          ],
          soilQuality: 'Good',
          nutrientLevels: {
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'Low'
          }
        });
      }, 2000);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to take photos.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Mock analysis after image capture
      setTimeout(() => {
        setAnalysisResult({
          cropType: 'Rice',
          healthScore: 92,
          diseases: ['No diseases detected'],
          recommendations: [
            'Crop is healthy',
            'Continue current care routine',
            'Next checkup in 2 weeks'
          ],
          soilQuality: 'Excellent',
          nutrientLevels: {
            nitrogen: 'High',
            phosphorus: 'Medium',
            potassium: 'High'
          }
        });
      }, 2000);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Field & Crop Analysis</Text>
        <Text style={styles.subtitle}>
          Upload or capture an image of your field for AI-powered analysis
        </Text>

        {!selectedImage ? (
          <View style={styles.uploadSection}>
            <View style={styles.uploadBox}>
              <Ionicons name="camera-outline" size={60} color="#4CAF50" />
              <Text style={styles.uploadText}>No image selected</Text>
              <Text style={styles.uploadSubtext}>
                Take a photo or select from gallery
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                <Ionicons name="camera" size={24} color="#fff" />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
                <Ionicons name="images" size={24} color="#fff" />
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.imageSection}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
              <Ionicons name="trash" size={20} color="#fff" />
              <Text style={styles.resetButtonText}>Remove Image</Text>
            </TouchableOpacity>
          </View>
        )}

        {analysisResult && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisTitle}>Analysis Results</Text>
            
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="leaf" size={24} color="#4CAF50" />
                <Text style={styles.resultCardTitle}>Crop Health Overview</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Crop Type:</Text>
                <Text style={styles.resultValue}>{analysisResult.cropType}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Health Score:</Text>
                <Text style={[styles.resultValue, styles.healthScore]}>
                  {analysisResult.healthScore}%
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Soil Quality:</Text>
                <Text style={styles.resultValue}>{analysisResult.soilQuality}</Text>
              </View>
            </View>

            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="warning" size={24} color="#FF9800" />
                <Text style={styles.resultCardTitle}>Disease Detection</Text>
              </View>
              {analysisResult.diseases.map((disease: string, index: number) => (
                <Text key={index} style={styles.diseaseText}>
                  • {disease}
                </Text>
              ))}
            </View>

            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="nutrition" size={24} color="#2196F3" />
                <Text style={styles.resultCardTitle}>Nutrient Levels</Text>
              </View>
              <View style={styles.nutrientGrid}>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Nitrogen</Text>
                  <Text style={styles.nutrientValue}>{analysisResult.nutrientLevels.nitrogen}</Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Phosphorus</Text>
                  <Text style={styles.nutrientValue}>{analysisResult.nutrientLevels.phosphorus}</Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Potassium</Text>
                  <Text style={styles.nutrientValue}>{analysisResult.nutrientLevels.potassium}</Text>
                </View>
              </View>
            </View>

            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text style={styles.resultCardTitle}>Recommendations</Text>
              </View>
              {analysisResult.recommendations.map((recommendation: string, index: number) => (
                <Text key={index} style={styles.recommendationText}>
                  {index + 1}. {recommendation}
                </Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginBottom: 24,
    width: '100%',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  analysisSection: {
    marginTop: 24,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  healthScore: {
    color: '#4CAF50',
  },
  diseaseText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  nutrientGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutrientLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});