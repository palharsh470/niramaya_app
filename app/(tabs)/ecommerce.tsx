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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Marketplace() {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [slideAnim] = useState(new Animated.Value(50));

  // Language content
  const content: Record<'english' | 'hindi', { [key: string]: string }> = {
    english: {
      appTitle: "B2B Marketplace",
      appSubtitle: "Sell Your Harvest",
      searchPlaceholder: "Search crops...",
      categories: "Categories",
      allCrops: "All Crops",
      grains: "Grains",
      vegetables: "Vegetables",
      fruits: "Fruits",
      pulses: "Pulses",
      myListings: "My Listings",
      activeListings: "Active Listings",
      addListing: "Add New Listing",
      viewDetails: "View Details",
      editListing: "Edit",
      pricePerUnit: "Price per",
      available: "Available",
      inStock: "In Stock",
      buyers: "Interested Buyers",
      postedOn: "Posted on",
      quintal: "Quintal",
      kg: "kg",
      ton: "Ton",
      yourPerformance: "Your Performance",
      active: "Active",
      views: "Views",
      inquiries: "Inquiries",
      addListingTitle: "Add Listing",
      addListingMessage: "Create a new crop listing for buyers",
      ok: "OK"
    },
    hindi: {
      appTitle: "B2B बाज़ार",
      appSubtitle: "अपनी फसल बेचें",
      searchPlaceholder: "फसलें खोजें...",
      categories: "श्रेणियाँ",
      allCrops: "सभी फसलें",
      grains: "अनाज",
      vegetables: "सब्जियाँ",
      fruits: "फल",
      pulses: "दालें",
      myListings: "मेरी लिस्टिंग",
      activeListings: "सक्रिय लिस्टिंग",
      addListing: "नई लिस्टिंग जोड़ें",
      viewDetails: "विवरण देखें",
      editListing: "संपादित करें",
      pricePerUnit: "मूल्य प्रति",
      available: "उपलब्ध",
      inStock: "स्टॉक में",
      buyers: "इच्छुक खरीदार",
      postedOn: "पोस्ट किया गया",
      quintal: "क्विंटल",
      kg: "किलो",
      ton: "टन",
      yourPerformance: "आपका प्रदर्शन",
      active: "सक्रिय",
      views: "दृश्य",
      inquiries: "पूछताछ",
      addListingTitle: "लिस्टिंग जोड़ें",
      addListingMessage: "खरीदारों के लिए नई फसल लिस्टिंग बनाएं",
      ok: "ठीक है"
    }
  };

  const t = content[language];

  // Mock crop listings data - Dynamic based on language
  const getCropListings = () => [
    {
      id: 1,
      name: language === 'english' ? 'Wheat' : 'गेहूं',
      category: 'grains',
      price: 2500,
      unit: t.quintal,
      quantity: 50,
      image: '🌾',
      location: language === 'english' ? 'Punjab' : 'पंजाब',
      quality: language === 'english' ? 'Premium' : 'प्रीमियम',
      buyers: 12,
      postedDate: language === 'english' ? '2 days ago' : '2 दिन पहले',
      inStock: true,
    },
    {
      id: 2,
      name: language === 'english' ? 'Rice' : 'चावल',
      category: 'grains',
      price: 3200,
      unit: t.quintal,
      quantity: 80,
      image: '🌾',
      location: language === 'english' ? 'Haryana' : 'हरियाणा',
      quality: language === 'english' ? 'Grade A' : 'ग्रेड A',
      buyers: 18,
      postedDate: language === 'english' ? '1 day ago' : '1 दिन पहले',
      inStock: true,
    },
    {
      id: 3,
      name: language === 'english' ? 'Tomatoes' : 'टमाटर',
      category: 'vegetables',
      price: 45,
      unit: t.kg,
      quantity: 500,
      image: '🍅',
      location: language === 'english' ? 'Maharashtra' : 'महाराष्ट्र',
      quality: language === 'english' ? 'Fresh' : 'ताज़ा',
      buyers: 8,
      postedDate: language === 'english' ? '3 hours ago' : '3 घंटे पहले',
      inStock: true,
    },
    {
      id: 4,
      name: language === 'english' ? 'Potatoes' : 'आलू',
      category: 'vegetables',
      price: 25,
      unit: t.kg,
      quantity: 1000,
      image: '🥔',
      location: language === 'english' ? 'Uttar Pradesh' : 'उत्तर प्रदेश',
      quality: language === 'english' ? 'Grade B' : 'ग्रेड B',
      buyers: 15,
      postedDate: language === 'english' ? '5 hours ago' : '5 घंटे पहले',
      inStock: true,
    },
    {
      id: 5,
      name: language === 'english' ? 'Mangoes' : 'आम',
      category: 'fruits',
      price: 80,
      unit: t.kg,
      quantity: 300,
      image: '🥭',
      location: language === 'english' ? 'Karnataka' : 'कर्नाटक',
      quality: language === 'english' ? 'Premium' : 'प्रीमियम',
      buyers: 25,
      postedDate: language === 'english' ? '1 day ago' : '1 दिन पहले',
      inStock: true,
    },
    {
      id: 6,
      name: language === 'english' ? 'Chickpeas' : 'चना',
      category: 'pulses',
      price: 6500,
      unit: t.quintal,
      quantity: 40,
      image: '🫘',
      location: language === 'english' ? 'Rajasthan' : 'राजस्थान',
      quality: language === 'english' ? 'Grade A' : 'ग्रेड A',
      buyers: 10,
      postedDate: language === 'english' ? '2 days ago' : '2 दिन पहले',
      inStock: true,
    },
  ];

  const categories = [
    { id: 'all', name: t.allCrops, icon: 'apps' },
    { id: 'grains', name: t.grains, icon: 'nutrition' },
    { id: 'vegetables', name: t.vegetables, icon: 'leaf' },
    { id: 'fruits', name: t.fruits, icon: 'color-palette' },
    { id: 'pulses', name: t.pulses, icon: 'ellipse' },
  ];

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

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const handleAddListing = () => {
    Alert.alert(
      t.addListingTitle,
      t.addListingMessage,
      [{ text: t.ok }]
    );
  };

  const handleViewDetails = (crop: any) => {
    Alert.alert(
      crop.name,
      `${t.pricePerUnit} ${crop.unit}: ₹${crop.price}\n${t.available}: ${crop.quantity} ${crop.unit}\n${t.buyers}: ${crop.buyers}`,
      [{ text: t.viewDetails }]
    );
  };

  const cropListings = getCropListings();
  const filteredCrops = cropListings.filter(crop => {
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      {/* Header */}
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
                <Ionicons name="storefront" size={32} color="#fff" />
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
          {/* Search Bar */}
          <View style={styles.searchSection}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
              style={styles.searchCard}
            >
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder={t.searchPlaceholder}
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.categories}</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.categoryCardActive
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <LinearGradient
                    colors={
                      selectedCategory === category.id
                        ? ['#4CAF50', '#45a049']
                        : ['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)']
                    }
                    style={styles.categoryGradient}
                  >
                    <View style={[
                      styles.categoryIcon,
                      selectedCategory === category.id && styles.categoryIconActive
                    ]}>
                      <Ionicons 
                        name={category.icon as any} 
                        size={24} 
                        color={selectedCategory === category.id ? '#fff' : '#4CAF50'} 
                      />
                    </View>
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.categoryTextActive
                    ]}>
                      {category.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Add Listing Button */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddListing}
            >
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.addButtonGradient}
              >
                <Ionicons name="add-circle" size={24} color="#fff" />
                <Text style={styles.addButtonText}>{t.addListing}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* My Listings Header */}
          <View style={styles.section}>
            <View style={styles.listingsHeader}>
              <Text style={styles.sectionTitle}>{t.myListings}</Text>
              <View style={styles.listingsBadge}>
                <Text style={styles.listingsBadgeText}>
                  {filteredCrops.length} {t.activeListings}
                </Text>
              </View>
            </View>
          </View>

          {/* Crop Listings Grid */}
          <View style={styles.section}>
            <View style={styles.cropsGrid}>
              {filteredCrops.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.cropCard}
                  onPress={() => handleViewDetails(crop)}
                >
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                    style={styles.cropCardGradient}
                  >
                    {/* Crop Image/Icon */}
                    <View style={styles.cropImageContainer}>
                      <LinearGradient
                        colors={['rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)']}
                        style={styles.cropImageGradient}
                      >
                        <Text style={styles.cropEmoji}>{crop.image}</Text>
                      </LinearGradient>
                      {crop.inStock && (
                        <View style={styles.stockBadge}>
                          <Text style={styles.stockBadgeText}>{t.inStock}</Text>
                        </View>
                      )}
                    </View>

                    {/* Crop Info */}
                    <View style={styles.cropInfo}>
                      <Text style={styles.cropName}>{crop.name}</Text>
                      <Text style={styles.cropQuality}>{crop.quality}</Text>
                      
                      <View style={styles.cropPriceContainer}>
                        <Text style={styles.cropPrice}>₹{crop.price}</Text>
                        <Text style={styles.cropUnit}>/{crop.unit}</Text>
                      </View>

                      <View style={styles.cropMetrics}>
                        <View style={styles.cropMetric}>
                          <Ionicons name="cube-outline" size={14} color="#666" />
                          <Text style={styles.cropMetricText}>
                            {crop.quantity} {crop.unit}
                          </Text>
                        </View>
                        <View style={styles.cropMetric}>
                          <Ionicons name="people-outline" size={14} color="#666" />
                          <Text style={styles.cropMetricText}>{crop.buyers}</Text>
                        </View>
                      </View>

                      <View style={styles.cropLocation}>
                        <Ionicons name="location-outline" size={14} color="#2196F3" />
                        <Text style={styles.cropLocationText}>{crop.location}</Text>
                      </View>

                      <View style={styles.cropFooter}>
                        <Text style={styles.cropDate}>{crop.postedDate}</Text>
                        <TouchableOpacity style={styles.editButton}>
                          <Ionicons name="pencil" size={16} color="#4CAF50" />
                          <Text style={styles.editButtonText}>{t.editListing}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <View style={styles.statsCard}>
              <LinearGradient
                colors={['rgba(76, 175, 80, 0.1)', 'rgba(46, 125, 50, 0.05)']}
                style={styles.statsGradient}
              >
                <Text style={styles.statsTitle}>{t.yourPerformance}</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <View style={styles.statIcon}>
                      <Ionicons name="trending-up" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.statValue}>6</Text>
                    <Text style={styles.statLabel}>{t.active}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
                      <Ionicons name="eye" size={24} color="#2196F3" />
                    </View>
                    <Text style={styles.statValue}>234</Text>
                    <Text style={styles.statLabel}>{t.views}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, { backgroundColor: 'rgba(255, 152, 0, 0.1)' }]}>
                      <Ionicons name="people" size={24} color="#FF9800" />
                    </View>
                    <Text style={styles.statValue}>88</Text>
                    <Text style={styles.statLabel}>{t.inquiries}</Text>
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
  searchSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  searchCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryCardActive: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  categoryTextActive: {
    color: '#fff',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingsBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  listingsBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cropCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  cropCardGradient: {
    padding: 12,
  },
  cropImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  cropImageGradient: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropEmoji: {
    fontSize: 48,
  },
  stockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cropQuality: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  cropPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  cropPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cropUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  cropMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cropMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropMetricText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  cropLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropLocationText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4,
  },
  cropFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  cropDate: {
    fontSize: 11,
    color: '#999',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  statsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statsGradient: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});