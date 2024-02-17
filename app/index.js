import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS } from '../constants';

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.backdrop}}>
            <Stack.Screen 
            options = {{
            textAlign: 'center',
            title: 'My Languages',
            headerStyle: {
                backgroundColor: COLORS.primary,
                headerShadowVisible: true,                
            },
            headerTitleStyle: {
                color: '#ffffff', 
            },
            headerTitleAlign: 'center',
            }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                    style={{
                    flex: 1,
                    }}
                    >    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;