import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, SafeAreaView } from 'react-native';



const GrammarClozeTest = ({
    question,
    options,
    correctAnswer,
    handleAnswer,
    words,
    translated,
    showWordDetails,
    selectedWordDetails,
    setSelectedWordDetails,
    tooltipPosition,
    setTooltipPosition,
    tooltipVisible,
    setTooltipVisible,
    fadeIn,
    fadeOut,
    wordRefs,
    tooltipRef,
    fadeAnim,
}) => {

    return (
    <SafeAreaView style = {{flex:1}}>
        <View style={styles.container} onStartShouldSetResponder={() => true} onResponderRelease={fadeOut}>
            <Text style={styles.questionText}>{translated}</Text>
            <View style={styles.sentenceContainer}>
                {words.map((word, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.wordButton}
                        onPress={(event) => showWordDetails(word, index)}
                        ref={ref => wordRefs[index] = ref}
                    >
                        <Text style={styles.wordText}>{word.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleAnswer(option === correctAnswer, correctAnswer)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
            {tooltipVisible && (
                <Animated.View ref={tooltipRef} style={[styles.tooltip, { top: tooltipPosition.y, left: tooltipPosition.x, opacity: fadeAnim }]}>
                    <Text style={styles.tooltipHeader}>{selectedWordDetails?.root}</Text>
                    <Text style={styles.tooltipText}>{selectedWordDetails?.translation}</Text>
                    {selectedWordDetails?.translation2 && <Text style={styles.tooltipText}>{selectedWordDetails.translation2}</Text>}
                </Animated.View>
            )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sentenceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    wordButton: {
        marginHorizontal: 3,
        marginBottom: 5,
    },
    wordText: {
        fontSize: 18,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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
    }
});

export default GrammarClozeTest;
