import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
export default function WorkoutScreen() {
  const router = useRouter();

const workouts = [
  {
    name: "Pull Ups",
    route: "/Exercise/pullups",
    image:
      "https://cdn.shopify.com/s/files/1/0705/5432/1194/files/mikolo-pull-ups-blog-2.png?v=1693468017",
  },
  {
    name: "Lat Pulldown",
    route: "/Exercise/latpulldown",
    image:
      "https://file.hstatic.net/200001007715/article/lat-pulldown_thumb_a0396ae9e2794e799c98263868e1d27a.webp",
  },
  {
    name: "Seated Cable Rows",
    route: "/Exercise/seatedrows",
    image:
      "https://www.inspireusafoundation.org/file/2023/09/cable-row-benefits.png",
  },
  {
    name: "Barbell Rows",
    route: "/Exercise/barbellrows",
    image:
      "https://fitnessvolt.com/wp-content/uploads/2023/01/reverse-grip-row-guide.jpg",
  },
  
];

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
       {/* Header */}
       <View
         style={{
           flexDirection: "row",
           alignItems: "center",
           padding: 13,
           backgroundColor: "black",
           marginTop: -59
         }}
       >
         <TouchableOpacity onPress={() => router.push("/workout")} style={{ marginRight: 10, marginTop: 30 }}>
           <Ionicons name="arrow-back" size={26} color="white" />
         </TouchableOpacity>
         <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginTop: 30 }}>
           Back Workout
         </Text>
       </View>
 
       {/* Workout List */}
       <FlatList
         data={workouts}
         keyExtractor={(item) => item.name}
         numColumns={1}
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ padding: 16 }}
         renderItem={({ item }) => (
           <TouchableOpacity
             activeOpacity={0.9}
             onPress={() => router.push(item.route as any)}
             style={{
               width: width - 32,
               height: 200,
               borderRadius: 20,
               overflow: "hidden",
               marginBottom: 20,
               alignSelf: "center",
               backgroundColor: "#fff",
               shadowColor: "red",
               shadowOpacity: 0.8,
               shadowOffset: { width: 0, height: 6 },
               shadowRadius: 10,
             }}
           >
             <ImageBackground
               source={{ uri: item.image }}
               style={{
                 flex: 1,
                 justifyContent: "flex-end",
               }}
               imageStyle={{
                 borderRadius: 20,
               }}
             >
               {/* Overlay */}
               <View
                 style={{
                   backgroundColor: "rgba(0,0,0,0.6)",
                   paddingVertical: 12,
                   alignItems: "center",
                 }}
               >
                 <Text
                   style={{
                     color: "#fff",
                     fontSize: 22,
                     fontWeight: "700",
                     letterSpacing: 1,
                   }}
                 >
                   {item.name}
                 </Text>
               </View>
             </ImageBackground>
           </TouchableOpacity>
         )}
       />
     </SafeAreaView>
   );
 }