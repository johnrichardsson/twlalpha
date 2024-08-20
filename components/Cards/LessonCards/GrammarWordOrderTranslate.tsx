import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { lessonstyles } from '../../../data';

const GrammarWordOrderTranslate = ({ prompt, translated, correctAnswerFill, wordsFill, handleAnswer, primary, secondary, handleSubmit }) => {
    // Debug logging
    console.log('Rendering GrammarWordOrderTranslate with props:', { prompt, translated, correctAnswerFill, wordsFill, handleAnswer, primary, secondary });

    const [selectedWords, setSelectedWords] = useState([]);

    // Defensive check for `words` prop
    if (!wordsFill || !Array.isArray(wordsFill)) {
        console.error('Words array is undefined or not an array');
        return <Text style={lessonstyles.errorText}>Words data is not available.</Text>;
    }

    const handleWordPress = (word) => {
        setSelectedWords((prevWords) => [...prevWords, word]);
    };

    const checkAnswer = () => {
        const answer = selectedWords.map(w => w.text).join(' ');
        const isCorrect = answer === correctAnswerFill;
        handleAnswer(isCorrect, correctAnswerFill);
    };

    return (
        <View style={lessonstyles.container}>
            <Text style={lessonstyles.question}>{prompt}</Text>
            <Text style={lessonstyles.buttonText}>{translated}</Text>
            <View style={lessonstyles.sentenceContainer}>
                {wordsFill.map((word, index) => (
                    <TouchableOpacity
                        key={index}
                        style={lessonstyles.wordButton}
                        onPress={() => handleWordPress(word)}
                    >
                        <Text style={lessonstyles.buttonText}>{word.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={lessonstyles.answerContainer}>
                {selectedWords.map((word, index) => (
                    <Text key={index} style={lessonstyles.bonusText}>{word.text}</Text>
                ))}
            </View>
            <TouchableOpacity style={{ borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: primary, height: '10%', width: '40%'}} onPress={checkAnswer}>
                <Text style={lessonstyles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GrammarWordOrderTranslate;