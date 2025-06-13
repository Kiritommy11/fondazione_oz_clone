import { Colors } from "@/assets/colors"
import { MotiView } from "moti"
import { View } from "react-native"
interface LoadingIndicatorProps  {

    size?: number,
    }
const LoadingIndicator=({
    size=100
}:LoadingIndicatorProps)=>{
  return(
    <View style={{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:Colors.Background
    }}>
<MotiView
    from={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 0,
      shadowOpacity: 0.5,
    }}
    animate={{  
      width: size + 20,
      height: size + 20,
      borderRadius: (size + 20) / 2,
      borderWidth: size / 10,
    }}
    transition={{
      type: 'timing',
      duration: 1000,
      loop: true,
    }}
      style={{
        width:size,
    height:size,
    borderRadius: size / 2,
    borderWidth: size/10,
    borderColor: Colors.BackgroundWhite,
    shadowColor: Colors.BackgroundWhite,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,

}}/>
</View>
    )
}

export default LoadingIndicator;