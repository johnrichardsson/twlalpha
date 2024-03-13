import { View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const TriangleButton = (props) => {
return (
<View style = {{zIndex: 6}}>
    <Link href={props.onPress} asChild>
    <TouchableOpacity
            style={{
                marginLeft: 285,
                marginTop: -50,
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 35,
                borderRightWidth: 35,
                borderBottomWidth: 20,
                borderTopWidth: 20,
                borderRightColor: 'transparent',
                borderLeftColor: props.color,
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                position: 'absolute',
            }}>
    </TouchableOpacity>
    </Link>
</View>
)
}

export { TriangleButton }