import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  benefits: string;
  benefitsHindi: string;
  eligibility: string[];
  eligibilityHindi: string[];
  status: 'Active' | 'Upcoming' | 'Closed';
  icon: any;
  color: string;
  gradientColors: string[];
}

export default function GovernmentSchemes() {
  const [language, setLanguage] = useState('english');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [slideAnim] = useState(new Animated.Value(50));

  // Language content object
  const content: Record<string, { [key: string]: string }> = {
    english: {
      appTitle: "Government Schemes",
      appSubtitle: "Agricultural Support Programs",
      allSchemes: "All Schemes",
      active: "Active",
      upcoming: "Upcoming",
      closed: "Closed",
      keyBenefits: "Key Benefits:",
      eligibility: "Eligibility:",
      viewDetails: "View Details",
      needHelp: "Need Help?",
      helpDescription: "Contact your local agriculture extension officer or call the farmer helpline",
      callHelpline: "Call Helpline",
      applyOnline: "Apply Online",
      close: "Close",
      redirect: "Redirect",
      redirectMessage: "This would redirect to the official application portal.",
      filterSchemes: "Filter Schemes",
      filterMessage: "This feature will be available in the next update.",
      helplineTitle: "Helpline",
      helplineMessage: "Farmer Helpline: 1800-180-1551\n\nAvailable 24/7 for assistance",
      moreCriteria: "more criteria",
      ok: "OK"
    },
    hindi: {
      appTitle: "सरकारी योजनाएं",
      appSubtitle: "कृषि सहायता कार्यक्रम",
      allSchemes: "सभी योजनाएं",
      active: "सक्रिय",
      upcoming: "आगामी",
      closed: "बंद",
      keyBenefits: "मुख्य लाभ:",
      eligibility: "पात्रता:",
      viewDetails: "विवरण देखें",
      needHelp: "सहायता चाहिए?",
      helpDescription: "अपने स्थानीय कृषि विस्तार अधिकारी से संपर्क करें या किसान हेल्पलाइन पर कॉल करें",
      callHelpline: "हेल्पलाइन पर कॉल करें",
      applyOnline: "ऑनलाइन आवेदन करें",
      close: "बंद करें",
      redirect: "रीडायरेक्ट",
      redirectMessage: "यह आपको आधिकारिक आवेदन पोर्टल पर भेज देगा।",
      filterSchemes: "योजनाएं फ़िल्टर करें",
      filterMessage: "यह सुविधा अगले अपडेट में उपलब्ध होगी।",
      helplineTitle: "हेल्पलाइन",
      helplineMessage: "किसान हेल्पलाइन: 1800-180-1551\n\n24/7 सहायता के लिए उपलब्ध",
      moreCriteria: "और मानदंड",
      ok: "ठीक है"
    }
  };

  const t = content[language];

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Yojana',
      nameHindi: 'पीएम-किसान योजना',
      description: 'Financial support of ₹6000 per year to small and marginal farmers',
      descriptionHindi: 'छोटे और सीमांत किसानों को प्रति वर्ष ₹6000 की वित्तीय सहायता',
      benefits: '₹2000 every 4 months directly to bank account',
      benefitsHindi: 'हर 4 महीने में ₹2000 सीधे बैंक खाते में',
      eligibility: [
        'Small and marginal farmers',
        'Land holding up to 2 hectares',
        'Valid Aadhaar card required'
      ],
      eligibilityHindi: [
        'छोटे और सीमांत किसान',
        '2 हेक्टेयर तक भूमि जोत',
        'वैध आधार कार्ड आवश्यक'
      ],
      status: 'Active',
      icon: 'cash',
      color: '#4CAF50',
      gradientColors: ['#4CAF50', '#45a049']
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
      description: 'Crop insurance scheme to protect farmers from crop losses',
      descriptionHindi: 'फसल नुकसान से किसानों की सुरक्षा के लिए फसल बीमा योजना',
      benefits: 'Up to ₹2 lakh coverage for crop losses due to natural calamities',
      benefitsHindi: 'प्राकृतिक आपदाओं के कारण फसल नुकसान के लिए ₹2 लाख तक का कवरेज',
      eligibility: [
        'All farmers growing notified crops',
        'Sharecroppers and tenant farmers',
        'Valid land documents'
      ],
      eligibilityHindi: [
        'अधिसूचित फसल उगाने वाले सभी किसान',
        'बटाईदार और किरायेदार किसान',
        'वैध भूमि दस्तावेज'
      ],
      status: 'Active',
      icon: 'shield-checkmark',
      color: '#2196F3',
      gradientColors: ['#2196F3', '#1976D2']
    },
    {
      id: '3',
      name: 'Soil Health Card Scheme',
      nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
      description: 'Free soil testing and nutrient recommendations for farmers',
      descriptionHindi: 'किसानों के लिए निःशुल्क मिट्टी परीक्षण और पोषक तत्व सिफारिशें',
      benefits: 'Free soil analysis report and fertilizer recommendations',
      benefitsHindi: 'निःशुल्क मिट्टी विश्लेषण रिपोर्ट और उर्वरक सिफारिशें',
      eligibility: [
        'All farmers with agricultural land',
        'One card per 2.5 acres',
        'Valid land ownership proof'
      ],
      eligibilityHindi: [
        'कृषि भूमि वाले सभी किसान',
        'प्रति 2.5 एकड़ एक कार्ड',
        'वैध भूमि स्वामित्व प्रमाण'
      ],
      status: 'Active',
      icon: 'flask',
      color: '#FF9800',
      gradientColors: ['#FF9800', '#F57C00']
    },
    {
      id: '4',
      name: 'Kisan Credit Card',
      nameHindi: 'किसान क्रेडिट कार्ड',
      description: 'Easy credit access for farmers at subsidized interest rates',
      descriptionHindi: 'सब्सिडी वाली ब्याज दरों पर किसानों के लिए आसान ऋण पहुंच',
      benefits: 'Credit limit up to ₹3 lakh at 7% interest rate',
      benefitsHindi: '7% ब्याज दर पर ₹3 लाख तक क्रेडिट सीमा',
      eligibility: [
        'Farmers with valid KYC documents',
        'Land ownership or lease documents',
        'Good credit history'
      ],
      eligibilityHindi: [
        'वैध KYC दस्तावेजों वाले किसान',
        'भूमि स्वामित्व या पट्टा दस्तावेज',
        'अच्छा क्रेडिट इतिहास'
      ],
      status: 'Active',
      icon: 'card',
      color: '#9C27B0',
      gradientColors: ['#9C27B0', '#7B1FA2']
    },
    {
      id: '5',
      name: 'PM Kusum Yojana',
      nameHindi: 'पीएम कुसुम योजना',
      description: 'Solar pump subsidy for irrigation and clean energy',
      descriptionHindi: 'सिंचाई और स्वच्छ ऊर्जा के लिए सोलर पंप सब्सिडी',
      benefits: '90% subsidy on solar pumps and grid connection',
      benefitsHindi: 'सोलर पंप और ग्रिड कनेक्शन पर 90% सब्सिडी',
      eligibility: [
        'Individual farmers',
        'Farmer groups and cooperatives',
        'Minimum 0.5 acre land'
      ],
      eligibilityHindi: [
        'व्यक्तिगत किसान',
        'किसान समूह और सहकारी समितियां',
        'न्यूनतम 0.5 एकड़ भूमि'
      ],
      status: 'Upcoming',
      icon: 'sunny',
      color: '#FFC107',
      gradientColors: ['#FFC107', '#FFA000']
    },
    {
      id: '6',
      name: 'National Mission on Oilseeds',
      nameHindi: 'तिलहन पर राष्ट्रीय मिशन',
      description: 'Support for oilseed cultivation and processing',
      descriptionHindi: 'तिलहन की खेती और प्रसंस्करण के लिए सहायता',
      benefits: 'Seed subsidy, equipment support, and buyback guarantee',
      benefitsHindi: 'बीज सब्सिडी, उपकरण सहायता, और वापसी की गारंटी',
      eligibility: [
        'Farmers growing oilseed crops',
        'Registered farmer producer organizations',
        'Valid agriculture registration'
      ],
      eligibilityHindi: [
        'तिलहन फसल उगाने वाले किसान',
        'पंजीकृत किसान उत्पादक संगठन',
        'वैध कृषि पंजीकरण'
      ],
      status: 'Active',
      icon: 'leaf',
      color: '#00BCD4',
      gradientColors: ['#00BCD4', '#0097A7']
    }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  useEffect(() => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Upcoming': return '#FF9800';
      case 'Closed': return '#757575';
      default: return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    if (language === 'hindi') {
      switch (status) {
        case 'Active': return 'सक्रिय';
        case 'Upcoming': return 'आगामी';
        case 'Closed': return 'बंद';
        default: return status;
      }
    }
    return status;
  };

  const handleSchemePress = (scheme: Scheme) => {
    const schemeName = language === 'english' ? scheme.name : scheme.nameHindi;
    const schemeDesc = language === 'english' ? scheme.description : scheme.descriptionHindi;
    const schemeBenefits = language === 'english' ? scheme.benefits : scheme.benefitsHindi;

    Alert.alert(
      schemeName,
      `${schemeDesc}\n\n${t.keyBenefits} ${schemeBenefits}\n\n${language === 'english' ? 'For more information, visit your nearest agriculture office or portal.' : 'अधिक जानकारी के लिए, अपने निकटतम कृषि कार्यालय या पोर्टल पर जाएं।'}`,
      [
        {
          text: t.applyOnline,
          onPress: () => Alert.alert(t.redirect, t.redirectMessage)
        },
        {
          text: t.close,
          style: 'cancel'
        }
      ]
    );
  };

  const handleFilterPress = (status: string) => {
    setSelectedFilter(status);
    const filterText = language === 'english' 
      ? `Showing ${status} schemes. ${content.english.filterMessage}`
      : `${status === 'All' ? 'सभी' : status === 'Active' ? 'सक्रिय' : status === 'Upcoming' ? 'आगामी' : 'बंद'} योजनाएं दिखा रहे हैं। ${content.hindi.filterMessage}`;
    
  };

  const filteredSchemes = selectedFilter === 'All' 
    ? schemes 
    : schemes.filter(scheme => scheme.status === selectedFilter);

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
                <Ionicons name="document-text" size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.appTitle}>{t.appTitle}</Text>
                <Text style={styles.appSubtitle}>{t.appSubtitle}</Text>
              </View>
            </View>
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

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollView}>
            {['All', 'Active', 'Upcoming', 'Closed'].map((filter) => (
              <TouchableOpacity 
                key={filter}
                style={[
                  styles.filterButton, 
                  selectedFilter === filter && styles.filterActive
                ]}
                onPress={() => handleFilterPress(filter)}
              >
                <LinearGradient
                  colors={selectedFilter === filter ? ['#4CAF50', '#45a049'] : ['#fff', '#fff']}
                  style={styles.filterButtonGradient}
                >
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterActiveText
                  ]}>
                    {filter === 'All' ? t.allSchemes : 
                     filter === 'Active' ? t.active :
                     filter === 'Upcoming' ? t.upcoming : t.closed}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredSchemes.map((scheme, index) => (
            <Animated.View
              key={scheme.id}
              style={[
                styles.schemeCard,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, index * 10],
                    })
                  }]
                }
              ]}
            >
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => handleSchemePress(scheme)}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardHeader}>
                    <LinearGradient
                      colors={scheme.gradientColors as [string, string, ...string[]]}
                      style={styles.cardIcon}
                    >
                      <Ionicons 
                        name={scheme.icon} 
                        size={28} 
                        color="#fff" 
                      />
                    </LinearGradient>
                    <View style={styles.cardTitleContainer}>
                      <Text style={styles.cardTitle}>
                        {language === 'english' ? scheme.name : scheme.nameHindi}
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(scheme.status) }]}>
                        <Text style={styles.statusText}>{getStatusText(scheme.status)}</Text>
                      </View>
                    </View>
                    <View style={styles.chevronContainer}>
                      <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </View>
                  </View>

                  <Text style={styles.cardDescription}>
                    {language === 'english' ? scheme.description : scheme.descriptionHindi}
                  </Text>
                  
                  <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsLabel}>{t.keyBenefits}</Text>
                    <Text style={styles.benefitsText}>
                      {language === 'english' ? scheme.benefits : scheme.benefitsHindi}
                    </Text>
                  </View>

                  <View style={styles.eligibilitySection}>
                    <Text style={styles.eligibilityLabel}>{t.eligibility}</Text>
                    {(language === 'english' ? scheme.eligibility : scheme.eligibilityHindi)
                      .slice(0, 2).map((criteria, index) => (
                      <View key={index} style={styles.eligibilityItem}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.eligibilityText}>{criteria}</Text>
                      </View>
                    ))}
                    {scheme.eligibility.length > 2 && (
                      <Text style={styles.moreText}>
                        +{scheme.eligibility.length - 2} {t.moreCriteria}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={() => handleSchemePress(scheme)}
                  >
                    <LinearGradient
                      colors={scheme.gradientColors as [string, string, ...string[]]}
                      style={styles.applyButtonGradient}
                    >
                      <Text style={styles.applyButtonText}>{t.viewDetails}</Text>
                      <Ionicons name="information-circle" size={18} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Help Section */}
          <View style={styles.helpSection}>
            <LinearGradient
              colors={['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.05)']}
              style={styles.helpCard}
            >
              <View style={styles.helpIconContainer}>
                <LinearGradient
                  colors={['#2196F3', '#1976D2']}
                  style={styles.helpIcon}
                >
                  <Ionicons name="help-circle" size={32} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.helpTitle}>{t.needHelp}</Text>
              <Text style={styles.helpText}>{t.helpDescription}</Text>
              <TouchableOpacity 
                style={styles.helpButton}
                onPress={() => Alert.alert(t.helplineTitle, t.helplineMessage)}
              >
                <LinearGradient
                  colors={['#2196F3', '#1976D2']}
                  style={styles.helpButtonGradient}
                >
                  <Ionicons name="call" size={20} color="#fff" />
                  <Text style={styles.helpButtonText}>{t.callHelpline}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </Animated.View>
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
  contentWrapper: {
    flex: 1,
    marginTop: -10,
  },
  filterContainer: {
    paddingVertical: 20,
  },
  filterScrollView: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 25,
  },
  filterActive: {
    transform: [{ scale: 1.05 }],
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterActiveText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  schemeCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  cardTouchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
    lineHeight: 24,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  chevronContainer: {
    padding: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  benefitsSection: {
    marginBottom: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    padding: 16,
    borderRadius: 12,
  },
  benefitsLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 6,
  },
  benefitsText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    lineHeight: 20,
  },
  eligibilitySection: {
    marginBottom: 20,
  },
  eligibilityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 12,
    marginTop: 6,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  moreText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
    marginLeft: 18,
  },
  applyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  applyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  helpSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  helpCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.2)',
  },
  helpIconContainer: {
    marginBottom: 16,
  },
  helpIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  helpButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  helpButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    gap: 10,
  },
  helpButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});