import * as React from "react";
import { View, Text,  StyleSheet, Image, TouchableOpacity} from "react-native";
import { TriangleButton } from "../../Widgets/TriangleButton";

const CourseIcon = (props) => {
 return (
    <View style={styles.langContainer}>
      <View style={styles.langIconContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 330,
            height: 160,
            marginLeft: 30,
            marginRight: 30,
            flexShrink: 0,
            borderRadius: 50,
            backgroundColor: props.color,
          }}
        >
          <View style={styles.langPictureMain}>
            <Image style={styles.langPicture} source={props.image}/>
          </View>
        </View>
        <View style={styles.langTitleBox}>
          <Text style={styles.langTitle}>
            {props.title} / {props.titlen}
          </Text>
        </View>
        <View>
        <TouchableOpacity
          style={styles.startButton}
        ></TouchableOpacity>
        <TriangleButton color= {props.color}/>
        <View style = {{  
          height: 120,
          width: 70,
          borderRadius: 20,
          marginLeft: 40,
          zIndex: 3,
          position: 'absolute',
          backgroundColor: props.color
          }}>
        </View>
          <View style= {styles.levelContainer}>
            <Text style = 
            {{
              zIndex: 8
            }}>
                Level
            </Text>
            <Text style = 
            {{
              fontSize: 30,
              zIndex: 8
            }}>
                1
            </Text>
            <View style={styles.levelPlaque}>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    langContainer: {
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 20,
        width: 360,
        height: 160,
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
        height: 129,
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
        width: 300,
        height: 130,
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
    sideBar: {
      height: 70,
      width: 70,
      zIndex: 3,
      position: 'absolute',

    },
    levelContainer: {
      marginLeft: 35,
      marginTop: 25,
      zIndex: 7,
      height: 70,
      width: 70,
      alignItems: 'center',
      position: 'absolute'
    },
    levelPlaque: {
      backgroundColor: '#ffffff',
      zIndex: 7,
      height: 70,
      width: 70,
      borderRadius: 35,
      borderWidth: 1,
      position: 'absolute'
  },
},
);
export default CourseIcon;