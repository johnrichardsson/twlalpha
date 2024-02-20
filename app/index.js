import { useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS } from '../constants';
import { CourseIcon } from '../components';
import { LANGS } from '../data';

const Home = (props) => {
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
            <View style = {{flex: 1}}>
                <FlatList
                    data={ LANGS }
                    renderItem={({ item }) => (
                        <CourseIcon
                            key={item.id}
                            title={item.title}
                            titlen={item.titlen}
                            color={item.color}
            />
            )}
            keyExtractor={(item) => item.id.toString()}
            />
            </View>
        </SafeAreaView>
    )
}

export default Home;