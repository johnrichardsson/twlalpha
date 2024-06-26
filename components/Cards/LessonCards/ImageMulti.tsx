import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { COLORS } from '../../../constants';

const ImageMulti = ({ currentQuestion, questions, options, handleAnswer, playSound, primary, secondary, timeLeft, timerFrozen }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        const isCorrect = option === questions.correctAnswer;
        handleAnswer(isCorrect, questions.correctAnswer, isCorrect ? 50 : 0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions.question}</Text>
            <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center', width: '90%', borderRadius: 25, marginBottom: 30, backgroundColor: 'lightgrey' }}
                onPress={() => playSound(questions.media)}>
                <Image
                    source={{ uri: questions.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Circle
                progress={timeLeft / 10}
                size={30}
                thickness={15}
                color={timerFrozen ? COLORS.gray : primary}
                unfilledColor={timerFrozen ? COLORS.gray : secondary}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 20 }}
            />
            <Text style={{ marginBottom: 10 }}> BONUS </Text>
            <View style={styles.optionsContainer}>
                {questions.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.option,
                            {
                                borderColor: selectedOption === option ? primary : 'transparent',
                                borderWidth: selectedOption === option ? 2 : 0,
                                backgroundColor: 'lightgrey',
                            }
                        ]}
                        onPress={() => handleOptionPress(option)}
                    >
                        <Text style={styles.label}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: 200,
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Adjust to space between options
        width: '90%',
    },
    option: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%', // Ensure the options take half the width of the container
        height: 60, // Adjust height to ensure options fit well
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});

export default ImageMulti;