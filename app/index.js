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
                <Text> a b c</Text>
                    <ScrollView>
                    <FlatList
                        data={ LANGS }
                        renderItem={({ item }) => (
                            <View>
                                <CourseIcon
                                    key = {item.id}
                                    title = {item.title}
                                    titlen = {item.titlen}
                                    color = {item.color}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home;