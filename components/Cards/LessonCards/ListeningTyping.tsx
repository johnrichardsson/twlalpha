import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { Circle } from 'react-native-progress';

const ListeningTyping = (props) => {
    const {
        currentQuestion,
        questions,
        playSound,
        handleAnswer,
        primary,
        secondary,
        timeLeft,
        timerFrozen,
    } = props;

    const [typedAnswer, setTypedAnswer] = useState('');

    useEffect(() => {
        playSound(questions[currentQuestion].media);
    }, [currentQuestion]);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            <Circle
                progress={timeLeft / 10}
                size={30}
                thickness={15}
                color={timerFrozen ? COLORS.gray : props.primary}
                unfilledColor={timerFrozen ? COLORS.gray : props.secondary}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 0 }}
            />
            <Text style={{ marginBottom: 10 }}> BONUS </Text>
            <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderRadius: 25, marginBottom: 30, backgroundColor: 'lightgrey' }}
                    onPress={() => playSound(questions[currentQuestion].media)}>
                    <Image
                        style={{ width: 64, height: 50 }}
                        source={require('../../../../twlalpha/assets/images/audio.png')}
                    />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={setTypedAnswer}
                value={typedAnswer}
                placeholder="Type your answer here"
            />
            <TouchableOpacity
                onPress={() => handleAnswer(typedAnswer)}
                style = {{backgroundColor: 'lightgrey'}}
            >
                <Text>
                    Submit
                </Text>
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
});

export default ListeningTyping;