import * as React from "react";
import { View, Text,  StyleSheet, Image, TouchableOpacity} from "react-native";

const CourseIcon = (props) => {
 return (
    <View style={styles.langContainer}>
      <View style={styles.langIconContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 360,
            height: 160,
            marginLeft: 30,
            marginRight: 30,
            flexShrink: 0,
            borderRadius: 50,
            backgroundColor: props.color,
          }}
        >
          <View style={styles.langPictureMain}>
            <View style={styles.langPicture}/>
          </View>
        </View>
        <View style={styles.langTitleBox}>
          <Text style={styles.langTitle}>
            {props.title} / {props.titlen}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.startButton}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 285,
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
          }}>
          </TouchableOpacity>
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
        justifyContent: 'center',
        marginTop: 19,
        width: 360,
        height: 159,
    },
    langIconContainer: {
        justifyContent: 'center',
        width: 330,
        height: 150,
    },
    langTitle: {
        alignItems: 'center',
        color: '#000000',
        fontSize: 15,
    },
    langIconMain: {
        width: 330,
        height: 150,
        flexShrink: 0,
        borderRadius: 50,
    },
    langPictureMain: {
        zIndex: 0,
        justifyContent: 'center',
        width: 300,
        marginLeft: 15,
        marginRight: 15,
        height: 120,
        flexShrink: 0,
        borderRadius: 30,
        backgroundColor: '#ffffff'},

    langTitleBox: {
        zIndex: 2,
        alignItems: 'center',
        marginTop: -165,
        marginLeft: 25,
        width: 180,
        height: 30,
        flexShrink: 0,
        borderRadius: 15,
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
        marginLeft: 270,
        marginTop: 25,
        backgroundColor: '#ffffff',
        zIndex: 4,
        height: 60,
        width: 60,
        borderRadius: 30,
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
export default CourseIcon;