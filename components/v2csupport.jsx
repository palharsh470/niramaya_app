import React, { useState, useEffect, useRef } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');



export default function VoiceSupport() {
    const [language, setLanguage] = useState('english');
    const [isListening, setIsListening] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState('Hindi');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.95));
    const [slideAnim] = useState(new Animated.Value(50));
    const [pulseAnim] = useState(new Animated.Value(1));
    const [waveAnim] = useState(new Animated.Value(0));

    const intervalRef = useRef < null > (null);
    const timeoutRef = useRef < null > (null);

    // Language content object
    const content = {
        english: {
            appTitle: "Voice Support",
            appSubtitle: "Smart Voice Assistant for Farming",
            selectLanguage: "Select Voice Language",
            voiceCommands: "Voice Commands",
            tapToSpeak: "Tap to speak",
            listening: "Listening...",
            quickCommands: "Quick Commands",
            commonQuestions: "Common Questions",
            voiceFeatures: "Voice Features",
            speakAnswer: "Speak Answer",
            close: "Close",
            recordingStopped: "Recording Stopped",
            recordingCancelled: "Voice command processing cancelled.",
            languageChanged: "Language Changed",
            languageChangedMessage: "Voice support language changed to",
            voiceCommandReceived: "Voice Command Received",
            textToSpeech: "Text-to-Speech",
            answerSpoken: "Answer will be spoken in selected language.",
            voiceFeaturesDesc: "• Voice-to-text in multiple languages\n• Text-to-speech responses\n• Smart farming guidance\n• Real-time crop monitoring\n• Weather and irrigation alerts",
            askAbout: "Ask about crops, irrigation, schemes, or farming tips",
            ok: "OK"
        },
        hindi: {
            appTitle: "आवाज़ सहायक",
            appSubtitle: "खेती के लिए स्मार्ट वॉइस असिस्टेंट",
            selectLanguage: "आवाज़ की भाषा चुनें",
            voiceCommands: "आवाज़ कमांड",
            tapToSpeak: "बोलने के लिए दबाएं",
            listening: "सुन रहे हैं...",
            quickCommands: "त्वरित कमांड",
            commonQuestions: "सामान्य प्रश्न",
            voiceFeatures: "आवाज़ सुविधाएं",
            speakAnswer: "उत्तर सुनें",
            close: "बंद करें",
            recordingStopped: "रिकॉर्डिंग बंद",
            recordingCancelled: "वॉइस कमांड प्रोसेसिंग रद्द की गई।",
            languageChanged: "भाषा बदली गई",
            languageChangedMessage: "वॉइस सपोर्ट भाषा बदली गई",
            voiceCommandReceived: "वॉइस कमांड प्राप्त",
            textToSpeech: "टेक्स्ट-टू-स्पीच",
            answerSpoken: "उत्तर चयनित भाषा में बोला जाएगा।",
            voiceFeaturesDesc: "• कई भाषाओं में वॉइस-टू-टेक्स्ट\n• टेक्स्ट-टू-स्पीच जवाब\n• स्मार्ट खेती मार्गदर्शन\n• रियल-टाइम फसल निगरानी\n• मौसम और सिंचाई अलर्ट",
            askAbout: "फसल, सिंचाई, योजनाओं या खेती की सलाह के बारे में पूछें",
            ok: "ठीक है"
        }
    };

    const t = content[language];

    const voiceLanguages = [
        { name: 'Hindi', nameNative: 'हिंदी', code: 'hi' },
        { name: 'English', nameNative: 'English', code: 'en' },
        { name: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', code: 'pa' },
        { name: 'Gujarati', nameNative: 'ગુજરાતી', code: 'gu' },
        { name: 'Marathi', nameNative: 'मराठी', code: 'mr' },
        { name: 'Tamil', nameNative: 'தமிழ்', code: 'ta' },
    ];

    const quickCommands = [
        {
            id: '1',
            title: 'Crop Status',
            titleHindi: 'फसल की स्थिति',
            subtitle: 'Check crop health',
            subtitleHindi: 'फसल का स्वास्थ्य जांचें',
            icon: 'leaf',
            color: '#4CAF50',
            gradientColors: ['#4CAF50', '#45a049'],
            command: 'How is my crop doing?',
            commandHindi: 'मेरी फसल कैसी है?'
        },
        {
            id: '2',
            title: 'Water Schedule',
            titleHindi: 'पानी का समय',
            subtitle: 'Irrigation timing',
            subtitleHindi: 'सिंचाई का समय',
            icon: 'water',
            color: '#2196F3',
            gradientColors: ['#2196F3', '#1976D2'],
            command: 'When should I water my crops?',
            commandHindi: 'पानी कब देना है?'
        },
        {
            id: '3',
            title: 'Motor Control',
            titleHindi: 'मोटर नियंत्रण',
            subtitle: 'Turn on/off motor',
            subtitleHindi: 'मोटर चालू/बंद करें',
            icon: 'power',
            color: '#FF9800',
            gradientColors: ['#FF9800', '#F57C00'],
            command: 'Turn on the motor',
            commandHindi: 'मोटर चालू करो'
        },
        {
            id: '4',
            title: 'Gov Schemes',
            titleHindi: 'सरकारी योजना',
            subtitle: 'Available schemes',
            subtitleHindi: 'उपलब्ध योजनाएं',
            icon: 'document-text',
            color: '#9C27B0',
            gradientColors: ['#9C27B0', '#7B1FA2'],
            command: 'Tell me about government schemes',
            commandHindi: 'सरकारी योजना बताओ'
        },
        {
            id: '5',
            title: 'Weather Info',
            titleHindi: 'मौसम जानकारी',
            subtitle: 'Weather forecast',
            subtitleHindi: 'मौसम पूर्वानुमान',
            icon: 'partly-sunny',
            color: '#FFC107',
            gradientColors: ['#FFC107', '#FFA000'],
            command: 'What\'s the weather like?',
            commandHindi: 'मौसम कैसा है?'
        },
        {
            id: '6',
            title: 'Market Prices',
            titleHindi: 'बाजार भाव',
            subtitle: 'Current prices',
            subtitleHindi: 'वर्तमान दाम',
            icon: 'trending-up',
            color: '#00BCD4',
            gradientColors: ['#00BCD4', '#0097A7'],
            command: 'Show me market prices',
            commandHindi: 'बाजार के भाव दिखाओ'
        }
    ];

    const faqs = [
        {
            id: '1',
            question: 'How do I identify disease symptoms in my crop?',
            questionHindi: 'मेरी फसल में बीमारी के लक्षण कैसे पहचानूं?',
            answer: 'Look for spots on leaves, wilting, or color changes. Use the Field Analysis tab to upload photos for diagnosis.',
            answerHindi: 'पत्तियों पर धब्बे, मुरझाना, या रंग बदलना बीमारी के संकेत हैं। फील्ड एनालिसिस टैब का उपयोग करके फोटो अपलोड करें।',
            category: 'Crop Health',
            categoryHindi: 'फसल स्वास्थ्य',
            icon: 'medical',
            color: '#4CAF50',
            gradientColors: ['#4CAF50', '#45a049']
        },
        {
            id: '2',
            question: 'When should I turn on the motor?',
            questionHindi: 'मोटर कब चालू करना चाहिए?',
            answer: 'Best times are 6-8 AM or 4-6 PM. Check water level in dashboard before irrigation.',
            answerHindi: 'सुबह 6-8 बजे या शाम 4-6 बजे पानी देना सबसे अच्छा होता है। डैशबोर्ड में वाटर लेवल चेक करें।',
            category: 'Irrigation',
            categoryHindi: 'सिंचाई',
            icon: 'time',
            color: '#2196F3',
            gradientColors: ['#2196F3', '#1976D2']
        },
        {
            id: '3',
            question: 'How to apply for government schemes?',
            questionHindi: 'सरकारी योजना के लिए आवेदन कैसे करें?',
            answer: 'Visit Schemes tab to view available programs. Apply through nearest agriculture office or online portal.',
            answerHindi: 'स्कीम्स टैब में जाकर योजना देखें। नजदीकी कृषि कार्यालय या ऑनलाइन पोर्टल से आवेदन करें।',
            category: 'Government Schemes',
            categoryHindi: 'सरकारी योजनाएं',
            icon: 'document-text',
            color: '#9C27B0',
            gradientColors: ['#9C27B0', '#7B1FA2']
        },
        {
            id: '4',
            question: 'What is the right time for fertilizer application?',
            questionHindi: 'खाद डालने का सही समय क्या है?',
            answer: 'Apply phosphorus during sowing, nitrogen after 20-30 days. Determine quantity based on soil test.',
            answerHindi: 'बुआई के समय फास्फोरस, 20-30 दिन बाद नाइट्रोजन डालें। मिट्टी टेस्ट के आधार पर मात्रा तय करें।',
            category: 'Fertilizer',
            categoryHindi: 'उर्वरक',
            icon: 'nutrition',
            color: '#FF9800',
            gradientColors: ['#FF9800', '#F57C00']
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

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const stopPulseAnimation = () => {
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
    };

    const startWaveAnimation = () => {
        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopWaveAnimation = () => {
        waveAnim.stopAnimation();
        waveAnim.setValue(0);
    };

    const startListening = () => {
        setIsListening(true);
        setRecordingTime(0);
        startPulseAnimation();
        startWaveAnimation();

        intervalRef.current = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            stopListening(true);
        }, 30000);
    };

    const stopListening = (autoStop = false) => {
        setIsListening(false);
        setRecordingTime(0);
        stopPulseAnimation();
        stopWaveAnimation();

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (autoStop) {
            const mockQuestion = language === 'english'
                ? 'How much water should I give to my wheat crop?'
                : 'मेरी गेहूं की फसल में पानी कितना देना चाहिए?';
            const mockAnswer = language === 'english'
                ? 'Water wheat crop 2-3 times per week. Soil should maintain 2-3 inches of moisture depth.'
                : 'गेहूं की फसल को हफ्ते में 2-3 बार पानी दें। मिट्टी में 2-3 इंच तक नमी रहनी चाहिए।';

            Alert.alert(
                t.voiceCommandReceived,
                `${language === 'english' ? 'Your question: ' : 'आपका सवाल: '}"${mockQuestion}"\n\n${language === 'english' ? 'Answer: ' : 'जवाब: '}${mockAnswer}`,
                [
                    {
                        text: t.speakAnswer,
                        onPress: () => Alert.alert(t.textToSpeech, t.answerSpoken)
                    },
                    { text: t.ok }
                ]
            );
        } else {
            Alert.alert(
                t.recordingStopped,
                t.recordingCancelled,
                [{ text: t.ok }]
            );
        }
    };

    const handleLanguageChange = (languageName) => {
        setSelectedVoiceLanguage(languageName);
        Alert.alert(
            t.languageChanged,
            `${t.languageChangedMessage} ${languageName}`,
            [{ text: t.ok }]
        );
    };

    const handleQuickCommand = (command) => {
        const commandText = language === 'english' ? command.command : command.commandHindi;
        const mockResponses = {
            '1': language === 'english'
                ? 'Your crops are healthy! Wheat growth is 85% optimal. No diseases detected.'
                : 'आपकी फसलें स्वस्थ हैं! गेहूं की वृद्धि 85% अनुकूल है। कोई बीमारी नहीं मिली।',
            '2': language === 'english'
                ? 'Next watering scheduled for tomorrow 6:00 AM. Soil moisture is currently 45%.'
                : 'अगला पानी कल सुबह 6:00 बजे निर्धारित है। मिट्टी में नमी वर्तमान में 45% है।',
            '3': language === 'english'
                ? 'Motor turned ON successfully. Water flow rate: 15 L/min. Auto-stop in 2 hours.'
                : 'मोटर सफलतापूर्वक चालू हुई। पानी का प्रवाह दर: 15 L/मिनट। 2 घंटे में ऑटो-स्टॉप।',
            '4': language === 'english'
                ? 'PM-KISAN: ₹2000 next installment due. Soil Health Card scheme available.'
                : 'पीएम-किसान: ₹2000 अगली किस्त देय। मृदा स्वास्थ्य कार्ड योजना उपलब्ध।',
            '5': language === 'english'
                ? 'Today: 28°C, Partly cloudy. 60% chance of rain tomorrow. Good for irrigation.'
                : 'आज: 28°C, आंशिक बादल। कल 60% बारिश की संभावना। सिंचाई के लिए अच्छा।',
            '6': language === 'english'
                ? 'Wheat: ₹2,150/quintal (+2.3%). Rice: ₹1,890/quintal. Market trend: Rising.'
                : 'गेहूं: ₹2,150/क्विंटल (+2.3%)। चावल: ₹1,890/क्विंटल। बाजार ट्रेंड: बढ़ता हुआ।'
        };

        Alert.alert(
            t.voiceCommandReceived,
            `${language === 'english' ? 'Command: ' : 'कमांड: '}"${commandText}"\n\n${language === 'english' ? 'Response: ' : 'जवाब: '}${mockResponses[command.id]}`,
            [
                {
                    text: t.speakAnswer,
                    onPress: () => Alert.alert(t.textToSpeech, t.answerSpoken)
                },
                { text: t.ok }
            ]
        );
    };

    const handleFAQPress = (faq) => {
        const question = language === 'english' ? faq.question : faq.questionHindi;
        const answer = language === 'english' ? faq.answer : faq.answerHindi;

        Alert.alert(
            question,
            answer,
            [
                {
                    text: t.speakAnswer,
                    onPress: () => Alert.alert(t.textToSpeech, t.answerSpoken)
                },
                {
                    text: t.close,
                    style: 'cancel'
                }
            ]
        );
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderWaveLines = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <Animated.View
                key={index}
                style={[
                    styles.waveLine,
                    {
                        height: waveAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [4, 20 + index * 8],
                        }),
                        marginHorizontal: 2,
                    }
                ]}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

            {/* Header with Gradient Background */}


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
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Voice Language Selection */}
                    <View style={styles.languageSection}>
                        <View style={{flexDirection:"row",justifyContent:"space-around",
                            alignItems:"center",
                            backgroundColor:"green",
                            marginBottom:10,
                            borderRadius:10,
                            paddingTop:10,
                            paddingBottom:5
                        }}>
                            

                            <Text style={styles.sectionTitle}>{t.selectLanguage}</Text>
                            
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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.languageScrollView}>
                            {voiceLanguages.map((voiceLang) => (
                                <TouchableOpacity
                                    key={voiceLang.code}
                                    style={[
                                        styles.voiceLanguageButton,
                                        selectedVoiceLanguage === voiceLang.name && styles.voiceLanguageActive
                                    ]}
                                    onPress={() => handleLanguageChange(voiceLang.name)}
                                >
                                    <LinearGradient
                                        colors={selectedVoiceLanguage === voiceLang.name ? ['#4CAF50', '#45a049'] : ['#fff', '#fff']}
                                        style={styles.voiceLanguageGradient}
                                    >
                                        <Text style={[
                                            styles.voiceLanguageText,
                                            selectedVoiceLanguage === voiceLang.name && styles.voiceLanguageActiveText
                                        ]}>
                                            {voiceLang.nameNative}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Voice Recording Section */}
                    <View style={styles.voiceSection}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                            style={styles.voiceSectionGradient}
                        >
                            <Text style={styles.sectionTitle}>{t.voiceCommands}</Text>

                            <View style={styles.microphoneContainer}>
                                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                                    <TouchableOpacity
                                        style={[
                                            styles.micButton,
                                            isListening && styles.micButtonActive
                                        ]}
                                        onPress={isListening ? () => stopListening() : startListening}
                                    >
                                        <LinearGradient
                                            colors={isListening ? ['#F44336', '#D32F2F'] : ['#4CAF50', '#45a049']}
                                            style={styles.micButtonGradient}
                                        >
                                            <Ionicons
                                                name={isListening ? "stop" : "mic"}
                                                size={40}
                                                color="#fff"
                                            />
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>

                                {isListening && (
                                    <View style={styles.waveContainer}>
                                        {renderWaveLines()}
                                    </View>
                                )}

                                <Text style={styles.micStatus}>
                                    {isListening
                                        ? `${t.listening} ${formatTime(recordingTime)}`
                                        : t.tapToSpeak
                                    }
                                </Text>

                                {isListening && (
                                    <Text style={styles.recordingHint}>
                                        {t.askAbout}
                                    </Text>
                                )}
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Quick Commands */}
                    <View style={styles.quickCommandsSection}>
                        <Text style={styles.sectionTitle}>{t.quickCommands}</Text>
                        <View style={styles.commandGrid}>
                            {quickCommands.map((command, index) => (
                                <Animated.View
                                    key={command.id}
                                    style={[
                                        styles.commandCard,
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
                                        style={styles.commandTouchable}
                                        onPress={() => handleQuickCommand(command)}
                                    >
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                                            style={styles.commandGradient}
                                        >
                                            <LinearGradient
                                                colors={command.gradientColors}
                                                style={styles.commandIcon}
                                            >
                                                <Ionicons
                                                    name={command.icon}
                                                    size={24}
                                                    color="#fff"
                                                />
                                            </LinearGradient>
                                            <Text style={styles.commandTitle}>
                                                {language === 'english' ? command.title : command.titleHindi}
                                            </Text>
                                            <Text style={styles.commandSubtitle}>
                                                {language === 'english' ? command.subtitle : command.subtitleHindi}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* FAQs Section */}
                    <View style={styles.faqSection}>
                        <Text style={styles.sectionTitle}>{t.commonQuestions}</Text>
                        {faqs.map((faq, index) => (
                            <Animated.View
                                key={faq.id}
                                style={[
                                    styles.faqCard,
                                    {
                                        transform: [{
                                            translateY: slideAnim.interpolate({
                                                inputRange: [0, 50],
                                                outputRange: [0, index * 5],
                                            })
                                        }]
                                    }
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.faqTouchable}
                                    onPress={() => handleFAQPress(faq)}
                                >
                                    <LinearGradient
                                        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                                        style={styles.faqGradient}
                                    >
                                        <View style={styles.faqHeader}>
                                            <LinearGradient
                                                colors={faq.gradientColors}
                                                style={styles.faqIcon}
                                            >
                                                <Ionicons
                                                    name={faq.icon}
                                                    size={20}
                                                    color="#fff"
                                                />
                                            </LinearGradient>
                                            <View style={styles.faqContent}>
                                                <Text style={styles.faqQuestion}>
                                                    {language === 'english' ? faq.question : faq.questionHindi}
                                                </Text>
                                                <View style={styles.faqCategory}>
                                                    <Text style={styles.faqCategoryText}>
                                                        {language === 'english' ? faq.category : faq.categoryHindi}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.chevronContainer}>
                                                <Ionicons name="chevron-forward" size={20} color="#ccc" />
                                            </View>
                                        </View>
                                        <Text style={styles.faqAnswer} numberOfLines={2}>
                                            {language === 'english' ? faq.answer : faq.answerHindi}
                                        </Text>
                                        <View style={styles.faqFooter}>
                                            <TouchableOpacity
                                                style={styles.speakButton}
                                                onPress={() => handleFAQPress(faq)}
                                            >
                                                <LinearGradient
                                                    colors={['#4CAF50', '#45a049']}
                                                    style={styles.speakButtonGradient}
                                                >
                                                    <Ionicons name="volume-high" size={16} color="#fff" />
                                                    <Text style={styles.speakButtonText}>{t.speakAnswer}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Voice Features Info */}
                    <View style={styles.infoSection}>
                        <LinearGradient
                            colors={['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.05)']}
                            style={styles.infoCard}
                        >
                            <View style={styles.infoIconContainer}>
                                <LinearGradient
                                    colors={['#2196F3', '#1976D2']}
                                    style={styles.infoIcon}
                                >
                                    <Ionicons name="information-circle" size={32} color="#fff" />
                                </LinearGradient>
                            </View>
                            <Text style={styles.infoTitle}>{t.voiceFeatures}</Text>
                            <Text style={styles.infoText}>{t.voiceFeaturesDesc}</Text>

                            <View style={styles.featureGrid}>
                                <View style={styles.featureItem}>
                                    <LinearGradient
                                        colors={['#4CAF50', '#45a049']}
                                        style={styles.featureIconSmall}
                                    >
                                        <Ionicons name="mic" size={16} color="#fff" />
                                    </LinearGradient>
                                    <Text style={styles.featureText}>
                                        {language === 'english' ? 'Voice Recognition' : 'आवाज़ पहचान'}
                                    </Text>
                                </View>

                                <View style={styles.featureItem}>
                                    <LinearGradient
                                        colors={['#2196F3', '#1976D2']}
                                        style={styles.featureIconSmall}
                                    >
                                        <Ionicons name="volume-high" size={16} color="#fff" />
                                    </LinearGradient>
                                    <Text style={styles.featureText}>
                                        {language === 'english' ? 'Text-to-Speech' : 'टेक्स्ट-टू-स्पीच'}
                                    </Text>
                                </View>

                                <View style={styles.featureItem}>
                                    <LinearGradient
                                        colors={['#FF9800', '#F57C00']}
                                        style={styles.featureIconSmall}
                                    >
                                        <Ionicons name="language" size={16} color="#fff" />
                                    </LinearGradient>
                                    <Text style={styles.featureText}>
                                        {language === 'english' ? 'Multi-language' : 'बहु-भाषा'}
                                    </Text>
                                </View>

                                <View style={styles.featureItem}>
                                    <LinearGradient
                                        colors={['#9C27B0', '#7B1FA2']}
                                        style={styles.featureIconSmall}
                                    >
                                        <Ionicons name="analytics" size={16} color="#fff" />
                                    </LinearGradient>
                                    <Text style={styles.featureText}>
                                        {language === 'english' ? 'Smart Analysis' : 'स्मार्ट विश्लेषण'}
                                    </Text>
                                </View>
                            </View>
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
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:5
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

    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    languageSection: {
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
       marginTop:5
    },
    languageScrollView: {
        paddingHorizontal: 0,
        gap: 12,
    },
    voiceLanguageButton: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    voiceLanguageGradient: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
        borderRadius: 20,
    },
    voiceLanguageActive: {
        transform: [{ scale: 1.05 }],
    },
    voiceLanguageText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
    },
    voiceLanguageActiveText: {
        color: '#fff',
        fontWeight: '600',
    },
    voiceSection: {
        marginBottom: 24,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    voiceSectionGradient: {
        padding: 32,
        alignItems: 'center',
    },
    microphoneContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    micButton: {
        borderRadius: 50,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        marginBottom: 24,
    },
    micButtonGradient: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    micButtonActive: {
        // Additional styles for active state if needed
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginBottom: 16,
    },
    waveLine: {
        backgroundColor: '#4CAF50',
        borderRadius: 2,
        width: 4,
    },
    micStatus: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    recordingHint: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    quickCommandsSection: {
        marginBottom: 24,
    },
    commandGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
    commandCard: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },
    commandTouchable: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    commandGradient: {
        padding: 20,
        alignItems: 'center',
        minHeight: 120,
        justifyContent: 'center',
    },
    commandIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    commandTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 4,
    },
    commandSubtitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
    },
    faqSection: {
        marginBottom: 24,
    },
    faqCard: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },
    faqTouchable: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    faqGradient: {
        padding: 20,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    faqIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    faqContent: {
        flex: 1,
    },
    faqQuestion: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 6,
        lineHeight: 20,
    },
    faqCategory: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    faqCategoryText: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: '600',
    },
    chevronContainer: {
        padding: 4,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 16,
    },
    faqFooter: {
        alignItems: 'flex-end',
    },
    speakButton: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    speakButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 6,
    },
    speakButtonText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    infoSection: {
        marginBottom: 32,
    },
    infoCard: {
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(33, 150, 243, 0.2)',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    infoIconContainer: {
        marginBottom: 16,
    },
    infoIcon: {
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
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 12,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        gap: 16,
    },
    featureItem: {
        alignItems: 'center',
        width: '45%',
    },
    featureIconSmall: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    featureText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 16,
    },
});