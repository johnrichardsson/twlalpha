import React, { useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { lessonstyles } from '../../../data';

const GrammarWordOrderAudio = ({
    audioUri,
    playSound,
    question,
    correctAnswerFill,
    wordsFill,
    handleAnswer,
    primary,
    secondary
}) => {
    console.log('Rendering GrammarWordOrderAudio with props:', { audioUri, question, correctAnswerFill, wordsFill, primary, secondary });

    if (!wordsFill) {
        console.error('Words array is undefined');
        return null;
    }

    const wordRefs = useRef([]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={lessonstyles.container}>
                <Text style={lessonstyles.question}>{question}</Text>
                <View style={lessonstyles.sentenceContainer}>
                    {wordsFill.map((word, index) => (
                        <TouchableOpacity
                            key={index}
                            style={lessonstyles.wordButton}
                            onPress={() => console.log(word.text)}
                            ref={ref => wordRefs.current[index] = ref}
                        >
                            <Text style={lessonstyles.buttonText}>{word.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    style={lessonstyles.audioButton}
                    onPress={() => playSound(question.media)}
                >
                    <Image
                        style={{ width: 64, height: 50 }}
                        source={require('../../../../twlalpha/assets/images/audio.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: primary, height: '10%', width: '40%'}}
                    onPress={() => handleAnswer(true, correctAnswerFill)}
                >
                    <Text style={lessonstyles.submitText}>Submit Answer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default GrammarWordOrderAudio;