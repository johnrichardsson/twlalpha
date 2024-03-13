import { View, Text, TouchableOpacity } from "react-native"

const LevelPlaque = (props) =>{
return (
<View style= {{      
      marginLeft: 35,
      marginTop: 25,
      zIndex: 7,
      height: 70,
      width: 70,
      alignItems: 'center',
      position: 'absolute'}}>
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
    <TouchableOpacity style={{
      backgroundColor: '#ffffff',
      zIndex: 7,
      height: 70,
      width: 70,
      borderRadius: 35,
      borderWidth: 1,
      position: 'absolute'}}>
    </TouchableOpacity>
</View>
)
}

export default LevelPlaque