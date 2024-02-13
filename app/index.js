import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS } from '../constants';

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.backdrop}}>
            <Stack.Screen 
            name = "Index"
            options = {{
            headerStyle: {backgroundColor: COLORS.primary},
            }}
            />
        </SafeAreaView>
    )
}

export default Home;