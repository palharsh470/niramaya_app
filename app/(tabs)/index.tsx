import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Dashboard() {
  const [motorOn, setMotorOn] = useState(false);
  const [motorMode, setMotorMode] = useState('automatic');
  const [language, setLanguage] = useState('english'); // 'english' or 'hindi'
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [slideAnim] = useState(new Animated.Value(50));

  // Enhanced mock data
  const cropHealth = 85;
  const waterLevel = 72;
  const overallScore = 92;
  const temperature = 28;
  const humidity = 65;
  const windSpeed = 12;
  const sunlight = 7.2;
  const flowRate = 45;
  const power = 2.3;
  const runtime = "2h 45m";




  // Add these helper functions before your component
  const getTimeBasedGreeting = (language: string, userName: string) => {
    const hour = new Date().getHours();
    const name = userName || "Farmer"; // Fallback if no name

    if (hour < 12) {
      return language === 'hindi'
        ? content.hindi.goodMorning.replace('{name}', name)
        : content.english.goodMorning.replace('{name}', name);
    } else if (hour < 17) {
      return language === 'hindi'
        ? content.hindi.goodAfternoon.replace('{name}', name)
        : content.english.goodAfternoon.replace('{name}', name);
    } else {
      return language === 'hindi'
        ? content.hindi.goodEvening.replace('{name}', name)
        : content.english.goodEvening.replace('{name}', name);
    }
  };

  const getWelcomeTitle = (language: string, userName: string) => {
    const name = userName || "";
    if (name) {
      return language === 'hindi'
        ? content.hindi.welcomeBackName.replace('{name}', name)
        : content.english.welcomeBackName.replace('{name}', name);
    } else {
      return language === 'hindi' ? content.hindi.welcomeBack : content.english.welcomeBack;
    }
  };

  // Add these state variables to your component (after existing useState declarations)
  const [userProfile, setUserProfile] = useState({
    name: "Rajesh Kumar", // This will be dynamic from API/database in future
    location: "Pune, Maharashtra",
    farmSize: "5 acres",
    lastLogin: new Date().toISOString(),
  });

  // In the future, you can fetch user data like this:
  // useEffect(() => {
  //   fetchUserProfile().then(profile => {
  //     setUserProfile(profile);
  //   });
  // }, []);

  const getCurrentTimeGreeting = () => {
    return getTimeBasedGreeting(language, userProfile.name);
  };

  const getWelcomeHeaderText = () => {
    return getWelcomeTitle(language, userProfile.name);
  };
  // Language content object
  const content: Record<string, { [key: string]: string }> = {
    english: {
      appTitle: "Niramaya",
      appSubtitle: "Smart Agriculture",
      farmHealthMetrics: "Farm Health Metrics",
      farmHealthSubtitle: "Real-time monitoring of your farm conditions",
      cropHealth: "Crop Health",
      waterLevel: "Water Level",
      soilConditions: "Soil Conditions",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      sunlight: "Sunlight",
      current: "Current",
      relative: "Relative",
      index: "Index",
      ideal: "Ideal",
      good: "Good",
      normal: "Normal",
      optimal: "Optimal",
      overallScore: "Overall Farm Health Score",
      overallScoreDesc: "Excellent conditions for optimal crop growth",
      motorControl: "Motor Control Panel",
      motorControlSubtitle: "Smart irrigation system control",
      mainMotor: "Main Motor",
      motorSubtitle: "Irrigation pump control",
      running: "RUNNING",
      stopped: "STOPPED",
      turnOn: "TURN ON",
      turnOff: "TURN OFF",
      operationMode: "Operation Mode",
      manual: "Manual",
      automatic: "Automatic",
      directControl: "Direct control",
      smartScheduling: "Smart scheduling",
      runtime: "Runtime",
      flowRate: "Flow Rate",
      power: "Power",
      nextScheduledRun: "Next Scheduled Run",
      scheduledTime: "Tomorrow 6:00 AM",
      duration: "Duration: 3 hours",
      scheduled: "Scheduled",
      excellentCondition: "Excellent condition",
      goodCondition: "Good condition",
      fairCondition: "Fair condition",
      poorCondition: "Poor condition",
      optimalRange: "Optimal range",
      adequate: "Adequate",
      low: "Low",
      critical: "Critical",
      profileName: "Rajesh Kumar",
      profileLocation: "Pune, Maharashtra",
      farmSize: "Farm Size: 5 acres",
      motorControlAlert: "Motor Control",
      motorModeAlert: "Motor Mode",
      welcomeBack: "Welcome Back",
      welcomeBackName: "Welcome Back, {name}",
      goodMorning: "Good morning, {name}! Your farm is looking great today.",
      goodAfternoon: "Good afternoon, {name}! Hope you're having a productive day.",
      goodEvening: "Good evening, {name}! Time to check your farm's progress.",
      welcomeSubtitle: "Here's your daily farm overview",
      lastUpdated: "Last updated: Just now",
      farmStatus: "Active",
    },
    hindi: {
      appTitle: "निरामय",
      appSubtitle: "स्मार्ट कृषि",
      farmHealthMetrics: "फार्म स्वास्थ्य मेट्रिक्स",
      farmHealthSubtitle: "आपकी फसल की स्थितियों की रियल-टाइम निगरानी",
      cropHealth: "फसल स्वास्थ्य",
      waterLevel: "जल स्तर",
      soilConditions: "मिट्टी की स्थिति",
      temperature: "तापमान",
      humidity: "नमी",
      windSpeed: "हवा की गति",
      sunlight: "सूर्यप्रकाश",
      current: "वर्तमान",
      relative: "सापेक्ष",
      index: "सूचकांक",
      ideal: "आदर्श",
      good: "अच्छा",
      normal: "सामान्य",
      optimal: "इष्टतम",
      overallScore: "समग्र फार्म स्वास्थ्य स्कोर",
      overallScoreDesc: "बेहतरीन फसल वृद्धि के लिए उत्कृष्ट परिस्थितियां",
      motorControl: "मोटर नियंत्रण पैनल",
      motorControlSubtitle: "स्मार्ट सिंचाई प्रणाली नियंत्रण",
      mainMotor: "मुख्य मोटर",
      motorSubtitle: "सिंचाई पंप नियंत्रण",
      running: "चालू",
      stopped: "बंद",
      turnOn: "चालू करें",
      turnOff: "बंद करें",
      operationMode: "संचालन मोड",
      manual: "मैनुअल",
      automatic: "स्वचालित",
      directControl: "प्रत्यक्ष नियंत्रण",
      smartScheduling: "स्मार्ट शेड्यूलिंग",
      runtime: "रनटाइम",
      flowRate: "प्रवाह दर",
      power: "पावर",
      nextScheduledRun: "अगला निर्धारित रन",
      scheduledTime: "कल सुबह 6:00 बजे",
      duration: "अवधि: 3 घंटे",
      scheduled: "निर्धारित",
      excellentCondition: "उत्कृष्ट स्थिति",
      goodCondition: "अच्छी स्थिति",
      fairCondition: "साधारण स्थिति",
      poorCondition: "खराब स्थिति",
      optimalRange: "इष्टतम सीमा",
      adequate: "पर्याप्त",
      low: "कम",
      critical: "गंभीर",
      profileName: "राजेश कुमार",
      profileLocation: "पुणे, महाराष्ट्र",
      farmSize: "फार्म का आकार: 5 एकड़",
      motorControlAlert: "मोटर नियंत्रण",
      motorModeAlert: "मोटर मोड",
      welcomeBack: "वापस स्वागत है",
      welcomeBackName: "वापस स्वागत है, {name}",
      goodMorning: "सुप्रभात, {name}! आज आपका फार्म बहुत अच्छा दिख रहा है।",
      goodAfternoon: "शुभ अपराह्न, {name}! उम्मीद है आपका दिन उत्पादक रहा है।",
      goodEvening: "शुभ संध्या, {name}! अपने फार्म की प्रगति देखने का समय है।",
      welcomeSubtitle: "यहाँ आपके फार्म का दैनिक अवलोकन है",
      lastUpdated: "अंतिम बार अपडेट: अभी-अभी",
      farmStatus: "सक्रिय",
    }
  };

  const t = content[language]; // Translation helper

  useFocusEffect(() => {
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
  });

  const handleMotorToggle = () => {
    setMotorOn(!motorOn);
    // Pulse animation for motor button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Alert.alert(
      'Motor Control',
      `Motor turned ${!motorOn ? 'ON' : 'OFF'}`,
      [{ text: 'OK' }]
    );
  };

  const handleModeChange: (mode: string) => void = (mode) => {
    setMotorMode(mode);
    Alert.alert(
      'Motor Mode',
      `Mode changed to ${mode.toUpperCase()}`,
      [{ text: 'OK' }]
    );
  };

  const handleProfilePress = () => {
    Alert.alert(
      'Farmer Profile',
      'Name: Rajesh Kumar\nLocation: Pune, Maharashtra\nFarm Size: 5 acres',
      [{ text: 'OK' }]
    );
  };

  const getHealthStatus: (value: number) => string = (value) => {
    if (value >= 80) return 'Excellent condition';
    if (value >= 60) return 'Good condition';
    if (value >= 40) return 'Fair condition';
    return 'Poor condition';
  };

  const getWaterStatus: (value: number) => string = (value) => {
    if (value >= 70) return 'Optimal range';
    if (value >= 50) return 'Adequate';
    if (value >= 30) return 'Low';
    return 'Critical';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

      {/* Header with Gradient Background */}
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
                <Ionicons name="leaf" size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.appTitle}>{t.appTitle}</Text>
                <Text style={styles.appSubtitle}>{t.appSubtitle}</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleProfilePress}
              >
                <View style={styles.profileImage}>
                  <Ionicons name="person" size={20} color="#2E7D32" />
                </View>
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

          <View style={styles.welcomeSection}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
              style={styles.welcomeCard}
            >
              <View style={styles.welcomeHeader}>
                <View style={styles.welcomeIconContainer}>
                  <Ionicons
                    name={new Date().getHours() < 18 ? "sunny" : "moon"}
                    size={28}
                    color={new Date().getHours() < 18 ? "#FF9800" : "#9C27B0"}
                  />
                </View>
                <View style={styles.welcomeContent}>
                  <Text style={styles.welcomeTitle}>{getWelcomeHeaderText()}</Text>
                  <Text style={styles.welcomeMessage}>{getCurrentTimeGreeting()}</Text>
                  <Text style={styles.welcomeSubtitle}>{t.welcomeSubtitle}</Text>
                </View>
                
              </View>
              
            </LinearGradient>
          </View>
          {/* Farm Health Metrics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.farmHealthMetrics}</Text>
            <Text style={styles.sectionSubtitle}>{t.farmHealthSubtitle}</Text>

            <View style={styles.metricsContainer}>
              {/* Crop Health Card */}
              <View style={styles.metricCard}>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricHeader}>
                    <View style={styles.metricIcon}>
                      <Ionicons name="leaf-outline" size={20} color="#4CAF50" />
                    </View>
                    <View>
                      <Text style={styles.metricTitle}>{t.cropHealth}</Text>
                      <Text style={styles.metricSubtitle}>{getHealthStatus(cropHealth)}</Text>
                    </View>
                  </View>
                  <View style={styles.progressContainer}>
                    <AnimatedCircularProgress
                      size={100}
                      width={8}
                      fill={cropHealth}
                      tintColor="#4CAF50"
                      backgroundColor="#E8F5E8"
                      rotation={0}
                      lineCap="round"
                    >
                      {() => (
                        <Text style={styles.progressText}>{cropHealth}%</Text>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                </LinearGradient>
              </View>

              {/* Water Level Card */}
              <View style={styles.metricCard}>
                <LinearGradient
                  colors={['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.05)']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricHeader}>
                    <View style={[styles.metricIcon, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
                      <Ionicons name="water-outline" size={20} color="#2196F3" />
                    </View>
                    <View>
                      <Text style={styles.metricTitle}>{t.waterLevel}</Text>
                      <Text style={styles.metricSubtitle}>{getWaterStatus(waterLevel)}</Text>
                    </View>
                  </View>
                  <View style={styles.progressContainer}>
                    <AnimatedCircularProgress
                      size={100}
                      width={8}
                      fill={waterLevel}
                      tintColor="#2196F3"
                      backgroundColor="#E3F2FD"
                      rotation={0}
                      lineCap="round"
                    >
                      {() => (
                        <Text style={styles.progressText}>{waterLevel}%</Text>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Environmental Conditions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.soilConditions}</Text>

            <View style={styles.environmentGrid}>
              <View style={styles.environmentCard}>
                <LinearGradient
                  colors={['rgba(255, 152, 0, 0.1)', 'rgba(255, 152, 0, 0.05)']}
                  style={styles.environmentCardGradient}
                >
                  <View style={styles.environmentIcon}>
                    <Ionicons name="thermometer-outline" size={24} color="#FF9800" />
                  </View>
                  <Text style={styles.environmentTitle}>{t.temperature}</Text>
                  <Text style={styles.environmentSubtitle}>{t.current}</Text>
                  <Text style={styles.environmentValue}>{temperature}°C</Text>
                  <Text style={styles.environmentStatus}>{t.ideal}</Text>
                </LinearGradient>
              </View>

              <View style={styles.environmentCard}>
                <LinearGradient
                  colors={['rgba(0, 188, 212, 0.1)', 'rgba(0, 188, 212, 0.05)']}
                  style={styles.environmentCardGradient}
                >
                  <View style={[styles.environmentIcon, { backgroundColor: 'rgba(0, 188, 212, 0.1)' }]}>
                    <Ionicons name="water" size={24} color="#00BCD4" />
                  </View>
                  <Text style={styles.environmentTitle}>{t.humidity}</Text>
                  <Text style={styles.environmentSubtitle}>{t.relative}</Text>
                  <Text style={styles.environmentValue}>{humidity}%</Text>
                  <Text style={styles.environmentStatus}>{t.good}</Text>
                </LinearGradient>
              </View>

              <View style={styles.environmentCard}>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)']}
                  style={styles.environmentCardGradient}
                >
                  <View style={[styles.environmentIcon, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
                    <Ionicons name="leaf" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.environmentTitle}>{t.windSpeed}</Text>
                  <Text style={styles.environmentSubtitle}>{t.current}</Text>
                  <Text style={styles.environmentValue}>{windSpeed} km/h</Text>
                  <Text style={styles.environmentStatus}>{t.normal}</Text>
                </LinearGradient>
              </View>

              <View style={styles.environmentCard}>
                <LinearGradient
                  colors={['rgba(255, 193, 7, 0.1)', 'rgba(255, 193, 7, 0.05)']}
                  style={styles.environmentCardGradient}
                >
                  <View style={[styles.environmentIcon, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
                    <Ionicons name="sunny" size={24} color="#FFC107" />
                  </View>
                  <Text style={styles.environmentTitle}>{t.sunlight}</Text>
                  <Text style={styles.environmentSubtitle}>{t.index}</Text>
                  <Text style={styles.environmentValue}>{sunlight}</Text>
                  <Text style={styles.environmentStatus}>{t.optimal}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Overall Farm Health Score */}
          <View style={styles.section}>
            <View style={styles.overallScoreCard}>
              <LinearGradient
                colors={['rgba(76, 175, 80, 0.1)', 'rgba(46, 125, 50, 0.05)']}
                style={styles.overallScoreGradient}
              >
                <Text style={styles.overallScoreTitle}>{t.overallScore}</Text>
                <Text style={styles.overallScoreValue}>{overallScore}/100</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${overallScore}%` }]} />
                </View>
                <Text style={styles.overallScoreDescription}>
                  {t.overallScoreDesc}
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Motor Control Panel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.motorControl}</Text>
            <Text style={styles.sectionSubtitle}>{t.motorControlSubtitle}</Text>

            <View style={styles.motorControlCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                style={styles.motorControlGradient}
              >
                {/* Motor Status */}
                <View style={styles.motorStatus}>
                  <View style={styles.motorHeader}>
                    <View style={styles.motorIconContainer}>
                      <Ionicons name="power" size={24} color="#666" />
                    </View>
                    <View>
                      <Text style={styles.motorTitle}>{t.mainMotor}</Text>
                      <Text style={styles.motorSubtitle}>{t.motorSubtitle}</Text>
                    </View>
                    <View style={[
                      styles.motorStatusBadge,
                      motorOn ? styles.motorStatusOn : styles.motorStatusOff
                    ]}>
                      <Text style={[
                        styles.motorStatusText,
                        motorOn ? styles.motorStatusTextOn : styles.motorStatusTextOff
                      ]}>
                        {motorOn ? t.running : t.stopped}
                      </Text>
                    </View>
                  </View>

                  <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                      style={[
                        styles.motorButton,
                        motorOn ? styles.motorButtonOn : styles.motorButtonOff
                      ]}
                      onPress={handleMotorToggle}
                    >
                      <Ionicons
                        name="power"
                        size={20}
                        color="#fff"
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.motorButtonText}>{motorOn ? t.turnOff : t.turnOn}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>

                {/* Operation Mode */}
                <View style={styles.operationMode}>
                  <Text style={styles.operationModeTitle}>{t.operationMode}</Text>
                  <View style={styles.modeButtons}>
                    <TouchableOpacity
                      style={[
                        styles.modeButton,
                        motorMode === 'manual' ? styles.modeButtonActive : styles.modeButtonInactive
                      ]}
                      onPress={() => handleModeChange('manual')}
                    >
                      <View style={styles.modeButtonContent}>
                        <Ionicons name="settings-outline" size={20} color={motorMode === 'manual' ? '#666' : '#999'} />
                        <Text style={[
                          styles.modeButtonText,
                          motorMode === 'manual' ? styles.modeButtonTextActive : styles.modeButtonTextInactive
                        ]}>
                          {t.manual}
                        </Text>
                        <Text style={[
                          styles.modeButtonSubtext,
                          motorMode === 'manual' ? styles.modeButtonSubtextActive : styles.modeButtonSubtextInactive
                        ]}>
                          {t.directControl}
                        </Text>
                        <View style={[
                          styles.modeToggle,
                          motorMode === 'manual' ? styles.modeToggleActive : styles.modeToggleInactive
                        ]} />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.modeButton,
                        motorMode === 'automatic' ? styles.modeButtonActive : styles.modeButtonInactive
                      ]}
                      onPress={() => handleModeChange('automatic')}
                    >
                      <View style={styles.modeButtonContent}>
                        <Ionicons name="flash-outline" size={20} color={motorMode === 'automatic' ? '#2196F3' : '#999'} />
                        <Text style={[
                          styles.modeButtonText,
                          motorMode === 'automatic' ? styles.modeButtonTextActive : styles.modeButtonTextInactive
                        ]}>
                          {t.automatic}
                        </Text>
                        <Text style={[
                          styles.modeButtonSubtext,
                          motorMode === 'automatic' ? styles.modeButtonSubtextActive : styles.modeButtonSubtextInactive
                        ]}>
                          {t.smartScheduling}
                        </Text>
                        <View style={[
                          styles.modeToggle,
                          motorMode === 'automatic' ? styles.modeToggleActive : styles.modeToggleInactive
                        ]} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Motor Statistics */}
                <View style={styles.motorStats}>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, { backgroundColor: 'rgba(156, 39, 176, 0.1)' }]}>
                      <Ionicons name="time-outline" size={16} color="#9C27B0" />
                    </View>
                    <Text style={styles.statLabel}>{t.runtime}</Text>
                    <Text style={styles.statValue}>{runtime}</Text>
                  </View>

                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, { backgroundColor: 'rgba(0, 188, 212, 0.1)' }]}>
                      <Ionicons name="water-outline" size={16} color="#00BCD4" />
                    </View>
                    <Text style={styles.statLabel}>{t.flowRate}</Text>
                    <Text style={styles.statValue}>{flowRate} L/min</Text>
                  </View>

                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
                      <Ionicons name="flash-outline" size={16} color="#4CAF50" />
                    </View>
                    <Text style={styles.statLabel}>{t.power}</Text>
                    <Text style={styles.statValue}>{power} kW</Text>
                  </View>
                </View>

                {/* Next Scheduled Run */}
                <View style={styles.scheduledRun}>
                  <View style={styles.scheduleHeader}>
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <Text style={styles.scheduleTitle}>{t.nextScheduledRun}</Text>
                  </View>
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.scheduleTime}>{t.scheduledTime}</Text>
                    <Text style={styles.scheduleDuration}>{t.duration}</Text>
                    <View style={styles.scheduleBadge}>
                      <Text style={styles.scheduleBadgeText}>{t.scheduled}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
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
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  notificationButton: {
    position: 'relative',
    marginRight: 16,
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileInfo: {
    alignItems: 'flex-end',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  profileLocation: {
    fontSize: 12,
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
    marginTop: 20,
    marginBottom: 32,
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  metricCardGradient: {
    padding: 20,
    backgroundColor: '#fff',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  environmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  environmentCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  environmentCardGradient: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  environmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  environmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  environmentSubtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
  },
  environmentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  environmentStatus: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  overallScoreCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  overallScoreGradient: {
    padding: 24,
    backgroundColor: '#fff',
  },
  overallScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  overallScoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  overallScoreDescription: {
    fontSize: 14,
    color: '#666',
  },
  motorControlCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  motorControlGradient: {
    padding: 24,
    backgroundColor: '#fff',
  },
  motorStatus: {
    marginBottom: 24,
  },
  motorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  motorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  motorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  motorSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  motorStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  motorStatusOn: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  motorStatusOff: {
    backgroundColor: 'rgba(117, 117, 117, 0.1)',
  },
  motorStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  motorStatusTextOn: {
    color: '#4CAF50',
  },
  motorStatusTextOff: {
    color: '#757575',
  },
  motorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  motorButtonOn: {
    backgroundColor: '#4CAF50',
  },
  motorButtonOff: {
    backgroundColor: '#2196F3',
  },
  motorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  operationMode: {
    marginBottom: 24,
  },
  operationModeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modeButtonActive: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(33, 150, 243, 0.2)',
  },
  modeButtonInactive: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modeButtonContent: {
    padding: 16,
    alignItems: 'flex-start',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 2,
  },
  modeButtonTextActive: {
    color: '#1A1A1A',
  },
  modeButtonTextInactive: {
    color: '#666',
  },
  modeButtonSubtext: {
    fontSize: 11,
    marginBottom: 12,
  },
  modeButtonSubtextActive: {
    color: '#666',
  },
  modeButtonSubtextInactive: {
    color: '#999',
  },

  modeToggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  modeToggleActive: {
    backgroundColor: '#2196F3',
  },
  modeToggleInactive: {
    backgroundColor: '#E0E0E0',
  },
  motorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  scheduledRun: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  scheduleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scheduleDuration: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    marginLeft: 12,
  },
  scheduleBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduleBadgeText: {
    fontSize: 11,
    color: '#2196F3',
    fontWeight: '600',
  },
  welcomeSection: {
    marginTop: 30,
    marginBottom: 24,
  },
  welcomeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding:10
  },
  welcomeCardGradient: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  welcomeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 6,
    fontWeight: '500',
    lineHeight: 22,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileQuickAccess: {
    padding: 8,
  },
  profileImageSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  welcomeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  updateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  farmStatusBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  farmStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // ... rest of your existing styles
});
