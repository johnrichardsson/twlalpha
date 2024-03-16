import { useState } from 'react';
import { View, FlatList, SafeAreaView, Text } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';

import { LessonCard } from '../../components';
import { COLORS } from '../../constants';
import TURKISHCHAPTER1 from '../tur/turData/turChapters'

const turCourse = () => {
    return (
        <SafeAreaView>
            <Text>turCourse</Text>
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                    <FlatList
                        data={ TURKISHCHAPTER1 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
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

export default turCourse