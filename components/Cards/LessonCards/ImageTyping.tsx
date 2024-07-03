import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { COLORS } from '../../../constants';

const ImageTyping = (props) => {
    const {
        currentQuestion,
        questions,
        handleAnswer,
        handleSubmit,
        primary,
        secondary,
        timeLeft,
        timerFrozen,
        typedAnswer,
        setTypedAnswer,
        playSound,
    } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            <TouchableOpacity 
                style={{ alignItems: 'center', justifyContent: 'center', width: '90%', borderRadius: 25, marginBottom: 30, backgroundColor: 'lightgrey' }} 
                onPress={() => playSound(questions[currentQuestion].media)}>
                <Image 
                    source={{ uri: questions[currentQuestion].image }} 
                    style={styles.image}
                    resizeMode="contain" />
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
            <TextInput
                style={styles.input}
                value={typedAnswer}
                onChangeText={setTypedAnswer}
                placeholder="Type your answer here"
                placeholderTextColor="grey"
            />
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: primary }]} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
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
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: 'black',
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
    submitButton: {
        padding: 10,
        borderRadius: 8,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ImageTyping;

//FUNCTIONS AND STATES ALL IMPORTED!