import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { Turkish1aQ } from './Questions/Turkish1aQ';
import { shuffledTurkish1aQ } from './Questions/Turkish1aQ';
 
const Turkish1a = () => {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        // Shuffle the questions array when the component mounts
        setShuffledQuestions(shuffleArray(Turkish1aQ));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>
                Chapter 1a
            </Text>
            <Lesson questions= {shuffledTurkish1aQ} />
        </View>
    );
};

export default Turkish1a;

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        marginBottom: 30,
        marginLeft: 35,
        marginTop: 60,
        fontWeight: 'bold',
        color: 'green',
    }
});

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}