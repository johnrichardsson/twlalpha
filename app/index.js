import { useState } from 'react';
import { View, FlatList, SafeAreaView, Text } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';

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
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View>
                                <CourseIcon
                                    title = {item.title}
                                    titlen = {item.titlen}
                                    color = {item.color}
                                    image = {item.image}
                                    onPress = {item.onPress}
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