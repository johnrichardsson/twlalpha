import { useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS } from '../constants';
import { CourseIcon, ScreenHeaderBtn } from '../components';
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
            headerLeft: () => (
                <ScreenHeaderBtn/>
            ),
            }}            
            />
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                    <FlatList
                        data={ LANGS }
                        renderItem={({ item }) => (
                            <View>
                                <CourseIcon
                                    title = {item.title}
                                    titlen = {item.titlen}
                                    color = {item.color}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
        </SafeAreaView>
    )
}

export default Home;