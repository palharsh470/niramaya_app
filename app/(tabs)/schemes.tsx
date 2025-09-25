import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string[];
  status: 'Active' | 'Upcoming' | 'Closed';
  icon: any;
}

export default function GovernmentSchemes() {
  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Yojana',
      description: 'Financial support of ₹6000 per year to small and marginal farmers',
      benefits: '₹2000 every 4 months directly to bank account',
      eligibility: [
        'Small and marginal farmers',
        'Land holding up to 2 hectares',
        'Valid Aadhaar card required'
      ],
      status: 'Active',
      icon: 'cash'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme to protect farmers from crop losses',
      benefits: 'Up to ₹2 lakh coverage for crop losses due to natural calamities',
      eligibility: [
        'All farmers growing notified crops',
        'Sharecroppers and tenant farmers',
        'Valid land documents'
      ],
      status: 'Active',
      icon: 'shield-checkmark'
    },
    {
      id: '3',
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and nutrient recommendations for farmers',
      benefits: 'Free soil analysis report and fertilizer recommendations',
      eligibility: [
        'All farmers with agricultural land',
        'One card per 2.5 acres',
        'Valid land ownership proof'
      ],
      status: 'Active',
      icon: 'flask'
    },
    {
      id: '4',
      name: 'Kisan Credit Card',
      description: 'Easy credit access for farmers at subsidized interest rates',
      benefits: 'Credit limit up to ₹3 lakh at 7% interest rate',
      eligibility: [
        'Farmers with valid KYC documents',
        'Land ownership or lease documents',
        'Good credit history'
      ],
      status: 'Active',
      icon: 'card'
    },
    {
      id: '5',
      name: 'PM Kusum Yojana',
      description: 'Solar pump subsidy for irrigation and clean energy',
      benefits: '90% subsidy on solar pumps and grid connection',
      eligibility: [
        'Individual farmers',
        'Farmer groups and cooperatives',
        'Minimum 0.5 acre land'
      ],
      status: 'Upcoming',
      icon: 'sunny'
    },
    {
      id: '6',
      name: 'National Mission on Oilseeds',
      description: 'Support for oilseed cultivation and processing',
      benefits: 'Seed subsidy, equipment support, and buyback guarantee',
      eligibility: [
        'Farmers growing oilseed crops',
        'Registered farmer producer organizations',
        'Valid agriculture registration'
      ],
      status: 'Active',
      icon: 'leaf'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Upcoming': return '#FF9800';
      case 'Closed': return '#757575';
      default: return '#757575';
    }
  };

  const handleSchemePress = (scheme: Scheme) => {
    Alert.alert(
      scheme.name,
      `${scheme.description}\n\nBenefits: ${scheme.benefits}\n\nFor more information, visit your nearest agriculture office or portal.`,
      [
        {
          text: 'Apply Online',
          onPress: () => Alert.alert('Redirect', 'This would redirect to the official application portal.')
        },
        {
          text: 'Close',
          style: 'cancel'
        }
      ]
    );
  };

  const handleFilterPress = (status: string) => {
    Alert.alert(
      'Filter Schemes',
      `Showing ${status} schemes. This feature will be available in the next update.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Government Schemes</Text>
        <Text style={styles.subtitle}>Agricultural support programs for farmers</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, styles.filterActive]}
          onPress={() => handleFilterPress('All')}
        >
          <Text style={styles.filterActiveText}>All Schemes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => handleFilterPress('Active')}
        >
          <Text style={styles.filterText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => handleFilterPress('Upcoming')}
        >
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {schemes.map((scheme) => (
          <TouchableOpacity
            key={scheme.id}
            style={styles.schemeCard}
            onPress={() => handleSchemePress(scheme)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons 
                  name={scheme.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{scheme.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(scheme.status) }]}>
                  <Text style={styles.statusText}>{scheme.status}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>

            <Text style={styles.cardDescription}>{scheme.description}</Text>
            
            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsLabel}>Key Benefits:</Text>
              <Text style={styles.benefitsText}>{scheme.benefits}</Text>
            </View>

            <View style={styles.eligibilitySection}>
              <Text style={styles.eligibilityLabel}>Eligibility:</Text>
              {scheme.eligibility.slice(0, 2).map((criteria, index) => (
                <Text key={index} style={styles.eligibilityText}>
                  • {criteria}
                </Text>
              ))}
              {scheme.eligibility.length > 2 && (
                <Text style={styles.moreText}>
                  +{scheme.eligibility.length - 2} more criteria
                </Text>
              )}
            </View>

            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => handleSchemePress(scheme)}
            >
              <Text style={styles.applyButtonText}>View Details</Text>
              <Ionicons name="information-circle" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <Ionicons name="help-circle" size={32} color="#2196F3" />
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Contact your local agriculture extension officer or call the farmer helpline
            </Text>
            <TouchableOpacity 
              style={styles.helpButton}
              onPress={() => Alert.alert('Helpline', 'Farmer Helpline: 1800-180-1551\n\nAvailable 24/7 for assistance')}
            >
              <Ionicons name="call" size={16} color="#fff" />
              <Text style={styles.helpButtonText}>Call Helpline</Text>
            </TouchableOpacity>
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
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  filterActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterActiveText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  schemeCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitsSection: {
    marginBottom: 12,
  },
  benefitsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  eligibilitySection: {
    marginBottom: 16,
  },
  eligibilityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eligibilityText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  moreText: {
    fontSize: 13,
    color: '#2196F3',
    fontStyle: 'italic',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  applyButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginRight: 6,
  },
  helpSection: {
    marginTop: 16,
    marginBottom: 32,
  },
  helpCard: {
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
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});