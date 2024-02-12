import * as React from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView, SafeAreaView, FlatList, VirtualizedList, Image, StatusBar, TouchableOpacity} from 'react-native';
import {LANGS} from "../../data";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const LangListMain = () => {
    const navigation = useNavigation();
  
    const handleLanguagePress = (screenName) => {
      navigation.navigate(screenName);
    };
  
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={LANGS}
          renderItem={({ item }) => (
            <CourseInfo
              key={item.id}
              title={item.title}
              titlen={item.titlen}
              color={item.color}
              image={item.image}
              navigateTo={item.navigateTo}
              onPress={() => handleLanguagePress(item.navigateTo)}
            />
          )}
        />
      </SafeAreaView>
    );
  };
  export default LangListMain;