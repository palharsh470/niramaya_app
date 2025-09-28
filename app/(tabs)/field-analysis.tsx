import React, { useState, useEffect } from 'react';

interface AnalysisResult {
  cropType: string;
  healthScore: number;
  diseases: string[];
  recommendations: string[];
  soilQuality: string;
  nutrientLevels: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    [key: string]: string;
  };
}
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function FieldAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState('english'); // Added language state
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [slideAnim] = useState(new Animated.Value(50));
  const [pulseAnim] = useState(new Animated.Value(1));

  // Language content object - Added complete translation content
  const content: Record<string, { [key: string]: string }> = {
    english: {
      appTitle: "Field Analysis",
      appSubtitle: "AI-Powered Crop Detection",
      cropAnalysis: "Crop Analysis",
      cropAnalysisSubtitle: "Upload or capture an image of your field for AI-powered analysis",
      noImageSelected: "No image selected",
      uploadInstruction: "Take a photo or select from gallery to begin analysis",
      takePhoto: "Take Photo",
      chooseFromGallery: "Choose from Gallery",
      removeImage: "Remove Image",
      analyzingImage: "Analyzing Image...",
      analyzingSubtext: "Please wait while AI processes your crop image",
      analysisResults: "Analysis Results",
      cropHealthOverview: "Crop Health Overview",
      cropType: "Crop Type:",
      soilQuality: "Soil Quality:",
      diseaseDetection: "Disease Detection",
      nutrientAnalysis: "Nutrient Analysis",
      recommendations: "Recommendations",
      nitrogen: "Nitrogen",
      phosphorus: "Phosphorus",
      potassium: "Potassium",
      high: "High",
      medium: "Medium",
      low: "Low",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
      permissionRequired: "Permission Required",
      cameraPermissionMessage: "Sorry, we need camera roll permissions to select images.",
      cameraPermissionMessageCamera: "Sorry, we need camera permissions to take photos.",
      okButton: "OK"
    },
    hindi: {
      appTitle: "फील्ड विश्लेषण",
      appSubtitle: "AI-संचालित फसल पहचान",
      cropAnalysis: "फसल विश्लेषण",
      cropAnalysisSubtitle: "AI-संचालित विश्लेषण के लिए अपने खेत की तस्वीर अपलोड करें या कैप्चर करें",
      noImageSelected: "कोई तस्वीर चयनित नहीं",
      uploadInstruction: "विश्लेषण शुरू करने के लिए फोटो लें या गैलरी से चुनें",
      takePhoto: "फोटो लें",
      chooseFromGallery: "गैलरी से चुनें",
      removeImage: "तस्वीर हटाएं",
      analyzingImage: "तस्वीर का विश्लेषण कर रहे हैं...",
      analyzingSubtext: "कृपया प्रतीक्षा करें जब तक AI आपकी फसल की तस्वीर को प्रोसेस करता है",
      analysisResults: "विश्लेषण परिणाम",
      cropHealthOverview: "फसल स्वास्थ्य अवलोकन",
      cropType: "फसल का प्रकार:",
      soilQuality: "मिट्टी की गुणवत्ता:",
      diseaseDetection: "रोग की पहचान",
      nutrientAnalysis: "पोषक तत्व विश्लेषण",
      recommendations: "सिफारिशें",
      nitrogen: "नाइट्रोजन",
      phosphorus: "फास्फोरस",
      potassium: "पोटेशियम",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम",
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      fair: "साधारण",
      poor: "खराब",
      permissionRequired: "अनुमति आवश्यक",
      cameraPermissionMessage: "क्षमा करें, हमें तस्वीरें चुनने के लिए कैमरा रोल की अनुमति चाहिए।",
      cameraPermissionMessageCamera: "क्षमा करें, हमें फोटो लेने के लिए कैमरा की अनुमति चाहिए।",
      okButton: "ठीक है"
    }
  };

  const t = content[language]; // Translation helper

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(() => {
    if (isAnalyzing) {
      // Pulse animation during analysis
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  });

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t.permissionRequired,
        t.cameraPermissionMessage,
        [{ text: t.okButton }]
      );
      return false;
    }
    return true;
  };

  // Mock analysis with consistent nutrient levels
  const analyzeImage = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Capture current language at the time of analysis
    const currentLanguage = language;
    
    setTimeout(() => {
      const mockResults = [
        {
          cropType: currentLanguage === 'english' ? 'Wheat' : 'गेहूं',
          healthScore: 78,
          diseases: [currentLanguage === 'english' ? 'Minor leaf rust detected' : 'मामूली पत्ती की जंग का पता चला'],
          recommendations: currentLanguage === 'english' ? [
            'Apply fungicide spray within 3 days',
            'Increase watering frequency to twice daily',
            'Monitor closely for 7-10 days'
          ] : [
            '3 दिनों के भीतर कवकनाशी स्प्रे लगाएं',
            'पानी देने की आवृत्ति दिन में दो बार करें',
            '7-10 दिनों तक बारीकी से निगरानी करें'
          ],
          soilQuality: currentLanguage === 'english' ? 'Good' : 'अच्छा',
          nutrientLevels: {
            nitrogen: 'medium',
            phosphorus: 'high',
            potassium: 'low'
          }
        },
        {
          cropType: currentLanguage === 'english' ? 'Rice' : 'धान',
          healthScore: 92,
          diseases: [currentLanguage === 'english' ? 'No diseases detected' : 'कोई रोग नहीं मिला'],
          recommendations: currentLanguage === 'english' ? [
            'Crop is in excellent condition',
            'Continue current care routine',
            'Next inspection recommended in 2 weeks'
          ] : [
            'फसल उत्कृष्ट स्थिति में है',
            'वर्तमान देखभाल दिनचर्या जारी रखें',
            '2 सप्ताह में अगली जांच की सिफारिश की जाती है'
          ],
          soilQuality: currentLanguage === 'english' ? 'Excellent' : 'उत्कृष्ट',
          nutrientLevels: {
            nitrogen: 'high',
            phosphorus: 'medium',
            potassium: 'high'
          }
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
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
      analyzeImage();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t.permissionRequired,
        t.cameraPermissionMessageCamera,
        [{ text: t.okButton }]
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
      analyzeImage();
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const getHealthColor = (score: number): string => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getNutrientColor = (level: string): string => {
    // Use lowercase for consistent comparison
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === 'high') return '#4CAF50';
    if (normalizedLevel === 'medium') return '#FF9800';
    if (normalizedLevel === 'low') return '#F44336';
    return '#666';
  };

  const getNutrientWidth = (level: string): string => {
  const levelStr = level.toLowerCase();
  if (levelStr.includes('high') || levelStr.includes('उच्च')) return '100%';
  if (levelStr.includes('medium') || levelStr.includes('मध्यम')) return '60%';
  if (levelStr.includes('low') || levelStr.includes('कम')) return '30%';
  return '50%';
};

  const getTranslatedNutrientLevel = (level: string): string => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === 'high') return t.high;
    if (normalizedLevel === 'medium') return t.medium;
    if (normalizedLevel === 'low') return t.low;
    return level;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      {/* Header with Gradient Background and Language Toggle */}
      <LinearGradient
        colors={['#4CAF50', '#2E7D32', '#1B5E20']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Ionicons name="camera" size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.appTitle}>{t.appTitle}</Text>
                <Text style={styles.appSubtitle}>{t.appSubtitle}</Text>
              </View>
            </View>
            {/* Language Toggle Button */}
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={toggleLanguage}
              >
                <View style={styles.languageToggle}>
                  <Text style={[
                    styles.languageText,
                    language === 'english' ? styles.languageTextActive : styles.languageTextInactive
                  ]}>
                    EN
                  </Text>
                  <View style={styles.languageDivider} />
                  <Text style={[
                    styles.languageText,
                    language === 'hindi' ? styles.languageTextActive : styles.languageTextInactive
                  ]}>
                    हिं
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          {/* Upload Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.cropAnalysis}</Text>
            <Text style={styles.sectionSubtitle}>{t.cropAnalysisSubtitle}</Text>

            {!selectedImage ? (
              <View style={styles.uploadSection}>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.05)', 'rgba(76, 175, 80, 0.02)']}
                  style={styles.uploadBox}
                >
                  <View style={styles.uploadIconContainer}>
                    <Ionicons name="camera-outline" size={60} color="#4CAF50" />
                  </View>
                  <Text style={styles.uploadText}>{t.noImageSelected}</Text>
                  <Text style={styles.uploadSubtext}>
                    {t.uploadInstruction}
                  </Text>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                    <LinearGradient
                      colors={['#4CAF50', '#45a049']}
                      style={styles.buttonGradient}
                    >
                      <Ionicons name="camera" size={24} color="#fff" />
                      <Text style={styles.buttonText}>{t.takePhoto}</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
                    <LinearGradient
                      colors={['#2196F3', '#1976D2']}
                      style={styles.buttonGradient}
                    >
                      <Ionicons name="images" size={24} color="#fff" />
                      <Text style={styles.buttonText}>{t.chooseFromGallery}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.imageSection}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                  {isAnalyzing && (
                    <View style={styles.analysisOverlay}>
                      <LinearGradient
                        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
                        style={styles.overlayGradient}
                      >
                        <Animated.View style={[styles.analysisIndicator, { transform: [{ scale: pulseAnim }] }]}>
                          <Ionicons name="analytics" size={40} color="#4CAF50" />
                        </Animated.View>
                        <Text style={styles.analysisText}>{t.analyzingImage}</Text>
                        <Text style={styles.analysisSubtext}>{t.analyzingSubtext}</Text>
                      </LinearGradient>
                    </View>
                  )}
                </View>
                
                <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
                  <LinearGradient
                    colors={['#F44336', '#D32F2F']}
                    style={styles.resetButtonGradient}
                  >
                    <Ionicons name="trash" size={20} color="#fff" />
                    <Text style={styles.resetButtonText}>{t.removeImage}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Analysis Results */}
          {analysisResult && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.analysisResults}</Text>
              
              {/* Health Overview Card */}
              <View style={styles.resultCard}>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)']}
                  style={styles.resultCardGradient}
                >
                  <View style={styles.resultHeader}>
                    <View style={styles.resultIcon}>
                      <Ionicons name="leaf" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.resultCardTitle}>{t.cropHealthOverview}</Text>
                  </View>
                  
                  <View style={styles.healthScoreContainer}>
                    <View style={styles.healthScoreCircle}>
                      <Text style={[styles.healthScoreText, { color: getHealthColor(analysisResult.healthScore) }]}>
                        {analysisResult.healthScore}%
                      </Text>
                    </View>
                    <View style={styles.healthDetails}>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>{t.cropType}</Text>
                        <Text style={styles.resultValue}>{analysisResult.cropType}</Text>
                      </View>
                      <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>{t.soilQuality}</Text>
                        <Text style={styles.resultValue}>{analysisResult.soilQuality}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Disease Detection Card */}
              <View style={styles.resultCard}>
                <LinearGradient
                  colors={['rgba(255, 152, 0, 0.1)', 'rgba(255, 152, 0, 0.05)']}
                  style={styles.resultCardGradient}
                >
                  <View style={styles.resultHeader}>
                    <View style={[styles.resultIcon, { backgroundColor: 'rgba(255, 152, 0, 0.1)' }]}>
                      <Ionicons name="warning" size={24} color="#FF9800" />
                    </View>
                    <Text style={styles.resultCardTitle}>{t.diseaseDetection}</Text>
                  </View>
                  
                  <View style={styles.diseaseContainer}>
                    {analysisResult.diseases.map((disease, index) => (
                      <View key={index} style={styles.diseaseItem}>
                        <View style={styles.diseaseIndicator} />
                        <Text style={styles.diseaseText}>{disease}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>

              {/* Nutrient Levels Card */}
              <View style={styles.resultCard}>
                <LinearGradient
                  colors={['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.05)']}
                  style={styles.resultCardGradient}
                >
                  <View style={styles.resultHeader}>
                    <View style={[styles.resultIcon, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
                      <Ionicons name="nutrition" size={24} color="#2196F3" />
                    </View>
                    <Text style={styles.resultCardTitle}>{t.nutrientAnalysis}</Text>
                  </View>
                  
                  <View style={styles.nutrientGrid}>
                    {Object.entries(analysisResult.nutrientLevels).map(([nutrient, level]) => (
                      <View key={nutrient} style={styles.nutrientItem}>
                        <View style={styles.nutrientHeader}>
                          <Text style={styles.nutrientLabel}>{t[nutrient] || nutrient}</Text>
                          <View style={[styles.nutrientIndicator, { backgroundColor: getNutrientColor(level) }]} />
                        </View>
                        <Text style={[styles.nutrientValue, { color: getNutrientColor(level) }]}>
                          {getTranslatedNutrientLevel(level)}
                        </Text>
                        <View style={styles.nutrientBar}>
                          <View 
                            style={[
                              styles.nutrientBarFill, 
                              { 
                                width: getNutrientWidth(level) as import('react-native').DimensionValue,
                                backgroundColor: getNutrientColor(level)
                              }
                            ]} 
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>

              {/* Recommendations Card */}
              <View style={styles.resultCard}>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.1)', 'rgba(46, 125, 50, 0.05)']}
                  style={styles.resultCardGradient}
                >
                  <View style={styles.resultHeader}>
                    <View style={styles.resultIcon}>
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.resultCardTitle}>{t.recommendations}</Text>
                  </View>
                  
                  <View style={styles.recommendationsContainer}>
                    {analysisResult.recommendations.map((recommendation, index) => (
                      <View key={index} style={styles.recommendationItem}>
                        <View style={styles.recommendationNumber}>
                          <Text style={styles.recommendationNumberText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.recommendationText}>{recommendation}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    padding: 4,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 4,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageTextActive: {
    color: '#2E7D32',
    backgroundColor: '#fff',
  },
  languageTextInactive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  languageDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    marginTop: -10,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadBox: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.2)',
    borderStyle: 'dashed',
    marginBottom: 24,
    width: '100%',
    backgroundColor: '#fff',
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  imageSection: {
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  selectedImage: {
    width: '100%',
    height: 250,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  analysisSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resetButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  resetButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  resultCardGradient: {
    padding: 24,
    backgroundColor: '#fff',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthScoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  healthScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  healthDetails: {
    flex: 1,
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
    color: '#1A1A1A',
  },
  diseaseContainer: {
    gap: 12,
  },
  diseaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9800',
    marginRight: 12,
  },
  diseaseText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  nutrientGrid: {
    gap: 16,
  },
  nutrientItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 16,
  },
  nutrientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  nutrientIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nutrientBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
  },
  nutrientBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  recommendationsContainer: {
    gap: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  recommendationNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
    flex: 1,
  },
});