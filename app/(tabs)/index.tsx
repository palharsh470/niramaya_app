import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Dashboard() {
  const [motorOn, setMotorOn] = useState(false);
  const [motorMode, setMotorMode] = useState('manual'); // 'manual' or 'automatic'
  
  // Mock data
  const cropHealth = 85;
  const waterLevel = 42;

  const handleMotorToggle = () => {
    setMotorOn(!motorOn);
    Alert.alert(
      'Motor Control',
      `Motor turned ${!motorOn ? 'ON' : 'OFF'}`,
      [{ text: 'OK' }]
    );
  };

  const handleModeChange = (mode: string) => {
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
      'Name: Ramesh Kumar\nLocation: Punjab, India\nFarm Size: 5 acres',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Profile */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to Niramaya</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <Ionicons name="person-circle" size={40} color="#2E7D32" />
          </TouchableOpacity>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.dashboardCards}>
          {/* Crop Health Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Crop Health</Text>
            <View style={styles.progressContainer}>
              <AnimatedCircularProgress
                size={120}
                width={8}
                fill={cropHealth}
                tintColor="#4CAF50"
                backgroundColor="#E0E0E0"
                rotation={0}
              >
                {() => (
                  <View style={styles.progressCenter}>
                    <Text style={styles.progressText}>{cropHealth}%</Text>
                    <Text style={styles.progressLabel}>Healthy</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>

          {/* Water Level Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Water Level</Text>
            <View style={styles.progressContainer}>
              <AnimatedCircularProgress
                size={120}
                width={8}
                fill={waterLevel}
                tintColor="#2196F3"
                backgroundColor="#E0E0E0"
                rotation={0}
              >
                {() => (
                  <View style={styles.progressCenter}>
                    <Text style={styles.progressText}>{waterLevel}%</Text>
                    <Text style={styles.progressLabel}>Low</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
        </View>

        {/* Motor Control Section */}
        <View style={styles.motorSection}>
          <Text style={styles.sectionTitle}>Motor Control</Text>
          
          {/* Motor On/Off Button */}
          <TouchableOpacity
            style={[
              styles.motorButton,
              motorOn ? styles.motorButtonOn : styles.motorButtonOff
            ]}
            onPress={handleMotorToggle}
          >
            <Ionicons 
              name={motorOn ? "power" : "power-outline"} 
              size={30} 
              color="#fff" 
            />
            <Text style={styles.motorButtonText}>
              {motorOn ? 'MOTOR ON' : 'MOTOR OFF'}
            </Text>
          </TouchableOpacity>

          {/* Mode Selection */}
          <Text style={styles.modeTitle}>Mode Selection</Text>
          <View style={styles.modeButtons}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                motorMode === 'manual' ? styles.modeButtonActive : styles.modeButtonInactive
              ]}
              onPress={() => handleModeChange('manual')}
            >
              <Text style={[
                styles.modeButtonText,
                motorMode === 'manual' ? styles.modeButtonTextActive : styles.modeButtonTextInactive
              ]}>
                Manual
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                motorMode === 'automatic' ? styles.modeButtonActive : styles.modeButtonInactive
              ]}
              onPress={() => handleModeChange('automatic')}
            >
              <Text style={[
                styles.modeButtonText,
                motorMode === 'automatic' ? styles.modeButtonTextActive : styles.modeButtonTextInactive
              ]}>
                Automatic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="sunny" size={24} color="#FF9800" />
              <Text style={styles.statValue}>28°C</Text>
              <Text style={styles.statLabel}>Temperature</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="water" size={24} color="#2196F3" />
              <Text style={styles.statValue}>65%</Text>
              <Text style={styles.statLabel}>Humidity</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>Good</Text>
              <Text style={styles.statLabel}>Soil Quality</Text>
            </View>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  profileButton: {
    padding: 8,
  },
  dashboardCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressCenter: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  motorSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  motorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  motorButtonOn: {
    backgroundColor: '#4CAF50',
  },
  motorButtonOff: {
    backgroundColor: '#757575',
  },
  motorButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 0.48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  modeButtonInactive: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modeButtonTextActive: {
    color: '#2E7D32',
  },
  modeButtonTextInactive: {
    color: '#666',
  },
  statsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});