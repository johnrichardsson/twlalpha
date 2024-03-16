import * as React from "react";
import { Link } from "expo-router";
import { View, Text} from "react-native";

const LessonCard = (props) => {
    return (
      <View style={{ height: 100, width: 100, borderRadius: 25, backgroundColor: props.color, justifyContent: 'center' }}>
        <Text>{props.title}</Text>
      </View>
    );
  };

  export default LessonCard