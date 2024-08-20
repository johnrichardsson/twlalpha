import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { lessonstyles} from '../../../data';

const GrammarClozeTest = ({
    question,
    options,
    words,
    correctAnswer,
    handleAnswer,
    translated,
    showWordDetails,
    selectedWordDetails,
    setSelectedWordDetails,
    tooltipPosition,
    setTooltipPosition,
    tooltipVisible,
    setTooltipVisible,
    tooltipDimensions,
    setTooltipDimensions,
    fadeIn,
    fadeOut,
    wordRefs,
    tooltipRef,
    fadeAnim
}) => {
    // Calculate center position for tooltip on mount
    useEffect(() => {
        const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
        const newTooltipPosition = {
            x: (windowWidth / 2),
            y: (tooltipDimensions.height - 100),
        };
        setTooltipPosition(newTooltipPosition);
    }, [tooltipDimensions]);

    // Defensive check for `words` prop
    if (!words || !Array.isArray(words)) {
        console.error('Words array is undefined or not an array');
        return <Text style={styles.errorText}>Words data is not available.</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={lessonstyles.container}>
                <Text style={lessonstyles.question}>Fill in the blank:</Text>
                <View style={lessonstyles.sentenceContainer}>
                    {words.map((word, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.wordClickable}
                            onPress={() => showWordDetails(word, index)}
                            ref={ref => wordRefs[index] = ref}
                        >
                            <Text style={styles.wordText}>{word.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={lessonstyles.clozeOptionsContainer}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={lessonstyles.wordButton}
                            onPress={() => handleAnswer(option === correctAnswer, correctAnswer)}
                        >
                            <Text style={lessonstyles.buttonText}>{typeof option === 'object' ? option.correctAnswer : option}</Text>
                        </TouchableOpacity>
                    ))}
                    {tooltipVisible && (
                        <Animated.View
                            ref={tooltipRef}
                            style={[styles.tooltip, { top: tooltipPosition.y, left: tooltipPosition.x, opacity: fadeAnim }]}
                            onLayout={({ nativeEvent }) => {
                                const { width, height } = nativeEvent.layout;
                                setTooltipDimensions({ width, height });
                            }}
                        >
                            <Text style={styles.tooltipHeader}>{selectedWordDetails?.root}</Text>
                            <Text style={styles.tooltipText}>{selectedWordDetails?.translation}</Text>
                            {selectedWordDetails?.translation2 && <Text style={styles.tooltipText}>{selectedWordDetails.translation2}</Text>}
                        </Animated.View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    translatedText: {
        fontSize: 16,
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 20,
    },
    sentenceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    wordClickable: {
        margin: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    wordText: {
        fontSize: 24,
        fontFamily: 'League Gothic Regular'
    },
    clozeOptionsContainer: {
        backgroundColor:'#cccccc',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        width: '90%', // Fixed width container for options
        justifyContent: 'center', // Center the options in the container
    },
    optionButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        flex: 1, // Allow the button to expand to fill the container
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    tooltipContainer: {
        flex: 1,
        alignItems: 'center',
    },
    tooltip: {
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tooltipHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#4411dd',
        textAlign: 'center',
    },
    tooltipText: {
        marginBottom: 5,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default GrammarClozeTest;