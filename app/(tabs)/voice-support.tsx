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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function VoiceSupport() {
  const [isListening, setIsListening] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'मेरी फसल में बीमारी के लक्षण कैसे पहचानूं?',
      answer: 'पत्तियों पर धब्बे, मुरझाना, या रंग बदलना बीमारी के संकेत हैं। फील्ड एनालिसिस टैब का उपयोग करके फोटो अपलोड करें।',
      category: 'Crop Health'
    },
    {
      id: '2',
      question: 'मोटर कब चालू करना चाहिए?',
      answer: 'सुबह 6-8 बजे या शाम 4-6 बजे पानी देना सबसे अच्छा होता है। डैशबोर्ड में वाटर लेवल चेक करें।',
      category: 'Irrigation'
    },
    {
      id: '3',
      question: 'सरकारी योजना के लिए आवेदन कैसे करें?',
      answer: 'स्कीम्स टैब में जाकर योजना देखें। नजदीकी कृषि कार्यालय या ऑनलाइन पोर्टल से आवेदन करें।',
      category: 'Government Schemes'
    },
    {
      id: '4',
      question: 'खाद डालने का सही समय क्या है?',
      answer: 'बुआई के समय फास्फोरस, 20-30 दिन बाद नाइट्रोजन डालें। मिट्टी टेस्ट के आधार पर मात्रा तय करें।',
      category: 'Fertilizer'
    }
  ];

  const languages = ['Hindi', 'English', 'Punjabi', 'Gujarati', 'Marathi'];

  const startListening = () => {
    setIsListening(true);
    setRecordingTime(0);
    
    // Mock recording simulation
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // Auto stop after 30 seconds (mock)
    setTimeout(() => {
      setIsListening(false);
      clearInterval(interval);
      
      Alert.alert(
        'Voice Command Received',
        'आपका सवाल: "मेरी गेहूं की फसल में पानी कितना देना चाहिए?"\n\nजवाब: गेहूं की फसल को हफ्ते में 2-3 बार पानी दें। मिट्टी में 2-3 इंच तक नमी रहनी चाहिए।',
        [{ text: 'OK' }]
      );
    }, 5000);
  };

  const stopListening = () => {
    setIsListening(false);
    setRecordingTime(0);
    Alert.alert(
      'Recording Stopped',
      'Voice command processing cancelled.',
      [{ text: 'OK' }]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    Alert.alert(
      'Language Changed',
      `Voice support language changed to ${language}`,
      [{ text: 'OK' }]
    );
  };

  const handleFAQPress = (faq: FAQ) => {
    Alert.alert(
      faq.question,
      faq.answer,
      [
        {
          text: 'Speak Answer',
          onPress: () => Alert.alert('Text-to-Speech', 'Answer will be spoken in selected language.')
        },
        {
          text: 'Close',
          style: 'cancel'
        }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Voice Support</Text>
          <Text style={styles.subtitle}>
            हिंग्लिश में बात करें - Speak in Hindi or English
          </Text>
        </View>

        {/* Language Selection */}
        <View style={styles.languageSection}>
          <Text style={styles.sectionTitle}>Select Language / भाषा चुनें</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.languageButtons}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={[
                    styles.languageButton,
                    selectedLanguage === language && styles.languageButtonActive
                  ]}
                  onPress={() => handleLanguageChange(language)}
                >
                  <Text
                    style={[
                      styles.languageButtonText,
                      selectedLanguage === language && styles.languageButtonTextActive
                    ]}
                  >
                    {language}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Voice Recording Section */}
        <View style={styles.voiceSection}>
          <Text style={styles.sectionTitle}>Voice Commands / आवाज़ कमांड</Text>
          
          <View style={styles.microphoneContainer}>
            {isListening ? (
              <TouchableOpacity 
                style={[styles.micButton, styles.micButtonActive]}
                onPress={stopListening}
              >
                <Ionicons name="mic" size={40} color="#fff" />
                <View style={styles.pulseRing} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.micButton}
                onPress={startListening}
              >
                <Ionicons name="mic-outline" size={40} color="#4CAF50" />
              </TouchableOpacity>
            )}
            
            <Text style={styles.micStatus}>
              {isListening 
                ? `Listening... ${formatTime(recordingTime)}`
                : 'Tap to speak / बोलने के लिए दबाएं'
              }
            </Text>
            
            {isListening && (
              <Text style={styles.recordingHint}>
                Ask about crops, irrigation, schemes, or farming tips
              </Text>
            )}
          </View>
        </View>

        {/* Quick Voice Commands */}
        <View style={styles.quickCommandsSection}>
          <Text style={styles.sectionTitle}>Quick Commands / त्वरित कमांड</Text>
          <View style={styles.commandGrid}>
            <TouchableOpacity 
              style={styles.commandButton}
              onPress={() => Alert.alert('Voice Command', '"मेरी फसल कैसी है?" - Voice command simulated')}
            >
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.commandText}>Crop Status</Text>
              <Text style={styles.commandSubtext}>फसल की स्थिति</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.commandButton}
              onPress={() => Alert.alert('Voice Command', '"पानी कब देना है?" - Voice command simulated')}
            >
              <Ionicons name="water" size={24} color="#2196F3" />
              <Text style={styles.commandText}>Water Schedule</Text>
              <Text style={styles.commandSubtext}>पानी का समय</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.commandButton}
              onPress={() => Alert.alert('Voice Command', '"मोटर चालू करो" - Voice command simulated')}
            >
              <Ionicons name="power" size={24} color="#FF9800" />
              <Text style={styles.commandText}>Motor Control</Text>
              <Text style={styles.commandSubtext}>मोटर नियंत्रण</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.commandButton}
              onPress={() => Alert.alert('Voice Command', '"सरकारी योजना बताओ" - Voice command simulated')}
            >
              <Ionicons name="document-text" size={24} color="#9C27B0" />
              <Text style={styles.commandText}>Gov Schemes</Text>
              <Text style={styles.commandSubtext}>सरकारी योजना</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Common Questions / सामान्य प्रश्न</Text>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() => handleFAQPress(faq)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <View style={styles.faqCategory}>
                  <Text style={styles.faqCategoryText}>{faq.category}</Text>
                </View>
              </View>
              <Text style={styles.faqAnswer} numberOfLines={2}>
                {faq.answer}
              </Text>
              <View style={styles.faqFooter}>
                <TouchableOpacity style={styles.speakButton}>
                  <Ionicons name="volume-high" size={16} color="#4CAF50" />
                  <Text style={styles.speakButtonText}>Speak / सुनें</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voice Features Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={32} color="#2196F3" />
            <Text style={styles.infoTitle}>Voice Features / आवाज़ सुविधाएं</Text>
            <Text style={styles.infoText}>
              • Voice-to-text in Hindi & English
              • हिंदी और अंग्रेजी में बोलें
              • Text-to-speech responses
              • जवाब सुनने की सुविधा
              • Farming tips and guidance
              • खेती की सलाह और मार्गदर्शन
            </Text>
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
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  languageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  languageButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#666',
  },
  languageButtonTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  voiceSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  microphoneContainer: {
    alignItems: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  micButtonActive: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F44336',
    opacity: 0.3,
  },
  micStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recordingHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  quickCommandsSection: {
    marginBottom: 24,
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  commandButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  commandSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  faqSection: {
    marginBottom: 24,
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  faqCategory: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  faqCategoryText: {
    fontSize: 10,
    color: '#2196F3',
    fontWeight: '500',
  },
  faqAnswer: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  faqFooter: {
    alignItems: 'flex-end',
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  speakButtonText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});