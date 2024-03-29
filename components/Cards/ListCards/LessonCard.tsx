import * as React from "react";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const LessonCard = (props) => {
    return (
      
      <View>
        <Link href= {props.lessonOpen} asChild>
        <TouchableOpacity style={{ height: 250, width: 150, borderRadius: 25, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{props.title}</Text>
        </TouchableOpacity>
        </Link> 
      </View>
      
    );
  };

  export default LessonCard