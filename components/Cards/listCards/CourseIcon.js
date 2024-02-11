import * as React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const CourseIconProps = {
  title: PropTypes.string.isRequired,
  titlen: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  navigateTo: PropTypes.string.isRequired,
};


const CourseIcon = (props) => {
    const navigation = useNavigation();
 return (
    <View style={styles.langContainer}>
      <View style={styles.langIconContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 310,
            height: 160,
            marginLeft: 30,
            marginRight: 30,
            flexShrink: 0,
            borderRadius: 50,
            backgroundColor: props.color,
          }}
        >
          <View style={styles.langPictureMain}>
            <Image style={styles.langPicture} source={props.image} />
          </View>
        </View>
        <View style={styles.langTitleBox}>
          <Text style={styles.langTitle}>
            {props.title} / {props.titlen}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate(props.navigateTo)}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 265,
            marginTop: -50,
            zIndex: 6,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 35,
            borderRightWidth: 35,
            borderBottomWidth: 20,
            borderTopWidth: 20,
            borderLeftColor: props.color,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            position: 'relative',
          }}
          onPress={() => navigation.navigate(props.navigateTo)}
        ></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    langContainer: {
        flexshrink: 0,
        justifyContent: 'center',
        marginTop: 19,
        width: 360,
        height: 159,
    },
    langIconContainer: {
        justifyContent: 'center',
        width: 300,
        height: 150,
    },
    langTitle: {
        fontFamily: 'LEMON MILK',
        alignItems: 'center',
        color: '#000000',
        fontSize: 15,
    },
    langIconMain: {
        width: 300,
        height: 150,
        flexShrink: 0,
        borderRadius: 50,
    },
    langPictureMain: {
        zIndex: 0,
        justifyContent: 'center',
        width: 270,
        marginLeft: 15,
        marginRight: 15,
        height: 120,
        flexShrink: 0,
        borderRadius: 30,
        backgroundColor: '#ffffff'},

    langTitleBox: {
        zIndex: 2,
        justifyContent: 'top-left',
        alignItems: 'center',
        marginTop: -165,
        marginLeft: 25,
        width: 180,
        height: 30,
        flexShrink: 0,
        borderRadius: 15,
        border: 'black',
        borderWidth: 1,
        backgroundColor: '#ffffff'},

    langPicture: {
        alignItems: 'center',
        width: 270,
        height: 120,
        flexShrink: 0,
        borderRadius: 30,
        backgroundColor: '#ffffff'},
    startButton: {
        marginLeft: 250,
        marginTop: 25,
        backgroundColor: '#ffffff',
        zIndex: 4,
        height: 60,
        width: 60,
        borderRadius: 30,
        border: 'black',
        borderWidth: 1,
    },
    triangle: {
        marginLeft: 250,
        marginTop: 50,
        zIndex: 6,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 20,
        borderTopWidth:20,
        borderLeftColor: 'red',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute'
    },
},
);
export {CourseIcon};