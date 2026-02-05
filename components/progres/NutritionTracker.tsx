// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
// import { useGymStore } from "@/app/lib/use-gym-store"

// const API_KEY = "PdvSHF8TR2ih0vuiXvlyerBpaOE5doGhBTa3OmQf"

// interface FoodResult {"PdvSHF8TR2ih0vuiXvlyerBpaOE5doGhBTa3OmQf" 
//   fdcId: number
//   description: string
//   calories: number

//   protein: number
// }

// export default function NutritionTracker() {
//   const [query, setQuery] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [results, setResults] = useState<FoodResult[]>([])

//   const addMeal = useGymStore((s) => s.addMeal)

//   const searchFood = async () => {
//     if (!query.trim()) return
//     setLoading(true)

//     try {
//       const res = await fetch(
//         `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=5&api_key=${API_KEY}`
//       )
//       const json = await res.json()

//       const parsed: FoodResult[] = json.foods.map((food: any) => {
//         const nutrients = food.foodNutrients || []

//         const calories =
//           nutrients.find((n: any) => n.nutrientName === "Energy")?.value ?? 0

//         const protein =
//           nutrients.find((n: any) => n.nutrientName === "Protein")?.value ?? 0

//         return {
//           fdcId: food.fdcId,
//           description: food.description,
//           calories,
//           protein,
//         }
//       })

//       setResults(parsed)
//     } catch (e) {
//       console.log("Food search error", e)
//     }

//     setLoading(false)
//   }

//   const handleAdd = (food: FoodResult) => {
//     addMeal({
//       name: food.description,
//       calories: Math.round(food.calories),
//       protein: Math.round(food.protein),
//       carbs: 0,
//       fats: 0,
//       date: new Date().toISOString().split("T")[0],
//       time: "Snack",
//     })
//   }

//   return (
//     <View className="p-4">
//       <Text className="text-xl font-bold text-white mb-3">Nutrition Search</Text>

//       <View className="flex-row gap-2">
//         <TextInput
//           value={query}
//           onChangeText={setQuery}
//           placeholder="Search food (eg chicken)"
//           placeholderTextColor="#999"
//           className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg"
//         />

//         <TouchableOpacity
//           onPress={searchFood}
//           className="bg-green-600 px-4 justify-center rounded-lg"
//         >
//           <Text className="text-white font-semibold">Search</Text>
//         </TouchableOpacity>
//       </View>

//       {loading && <ActivityIndicator className="mt-4" />}

//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.fdcId.toString()}
//         className="mt-4"
//         renderItem={({ item }) => (
//           <View className="bg-zinc-900 p-3 rounded-lg mb-2">
//             <Text className="text-white font-semibold">
//               {item.description}
//             </Text>

//             <Text className="text-zinc-400 text-sm mt-1">
//               🔥 {item.calories} kcal | 💪 {item.protein} g protein
//             </Text>

//             <TouchableOpacity
//               onPress={() => handleAdd(item)}
//               className="mt-2 self-start bg-green-700 px-3 py-1 rounded"
//             >
//               <Text className="text-white text-sm">Add</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   )
// }