import {
  useGymStore,
  type Meal,
} from "@/app/lib/use-gym-store"
import { useMemo, useState, useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native"

/* ---------------- TYPES ---------------- */
type FoodItem = {
  id: number
  name: string
  calories: number
  protein: number
}

type ListItem =
  | { type: "food"; data: FoodItem }
  | { type: "meal"; data: Meal }

/* ---------------- CONSTANTS ---------------- */
const USDA_API_KEY = "PdvSHF8TR2ih0vuiXvlyerBpaOE5doGhBTa3OmQf"

const QUICK_FOODS: FoodItem[] = [
  { id: 1, name: "Egg", calories: 155, protein: 13 },
  { id: 2, name: "Banana", calories: 89, protein: 1.1 },
  { id: 3, name: "Milk", calories: 42, protein: 3.4 },
  { id: 4, name: "Oats", calories: 389, protein: 16.9 },
]

let searchTimeout: ReturnType<typeof setTimeout>

/* ---------------- COMPONENT ---------------- */
export default function NutritionTracker() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const meals = useGymStore(s => s.meals)
  const addMeal = useGymStore(s => s.addMeal)
  const removeMeal = useGymStore(s => s.removeMeal)

  /* ---------------- FILTER BY DATE ---------------- */
  const filteredMeals = useMemo(
    () => meals.filter(m => m.date === selectedDate),
    [meals, selectedDate]
  )

  const totals = useMemo(() => {
    return filteredMeals.reduce(
      (t, m) => {
        t.calories += m.calories
        t.protein += m.protein
        return t
      },
      { calories: 0, protein: 0 }
    )
  }, [filteredMeals])

  /* ---------------- AUTO SEARCH ---------------- */
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    clearTimeout(searchTimeout)
    setLoading(true)

    searchTimeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=30&api_key=${USDA_API_KEY}`
        )
        const json = await res.json()

        const map = new Map<string, FoodItem>()

        json.foods?.forEach((food: any) => {
          const nutrients = food.foodNutrients || []
          const calories = nutrients.find((n: any) => n.nutrientId === 1008)?.value
          const protein = nutrients.find((n: any) => n.nutrientId === 1003)?.value

          if (!calories || !protein || protein > 45) return

          const clean = food.description.toLowerCase().split(",")[0]

          if (!map.has(clean)) {
            map.set(clean, {
              id: food.fdcId,
              name: food.description,
              calories: Math.round(calories),
              protein: Math.round(protein * 10) / 10,
            })
          }
        })

        setResults([...map.values()])
      } catch (e) {
        console.log("USDA error", e)
      } finally {
        setLoading(false)
      }
    }, 600)

    return () => clearTimeout(searchTimeout)
  }, [query])

  /* ---------------- ADD FOOD ---------------- */
  const addFood = (food: FoodItem) => {
    Alert.prompt(
      "Enter quantity",
      "How many grams did you eat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: (value?: string) => {
            const grams = Number(value)
            if (!grams) return

            addMeal({
              name: `${food.name} (${grams}g)`,
              calories: Math.round((food.calories * grams) / 100),
              protein: Math.round((food.protein * grams) / 100 * 10) / 10,
              carbs: 0,
              fats: 0,
              date: selectedDate,
              time: "Meal",
            })

            setQuery("")
            setResults([])
          },
        },
      ],
      "plain-text",
      "100"
    )
  }

  const showingResults = results.length > 0

  const listData: ListItem[] = showingResults
    ? results.map(r => ({ type: "food", data: r }))
    : filteredMeals.map(m => ({ type: "meal", data: m }))

  return (
    <FlatList<ListItem>
      className="flex-1 bg-white px-4"
      data={listData}
      keyExtractor={item =>
        item.type === "food"
          ? `food-${item.data.id}`
          : `meal-${item.data.id}`
      }
      showsVerticalScrollIndicator={false}

      ListHeaderComponent={
        <View className="pt-12 pb-4">
          <Text className="text-2xl font-bold mb-6">Nutrition</Text>

          {/* DATE */}
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() =>
                setSelectedDate(
                  new Date(
                    new Date(selectedDate).setDate(
                      new Date(selectedDate).getDate() - 1
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                )
              }
              className="px-3 py-2 bg-gray-200 rounded-lg mr-2"
            >
              <Text>◀</Text>
            </TouchableOpacity>

            <Text className="font-semibold">{selectedDate}</Text>

            <TouchableOpacity
              onPress={() =>
                setSelectedDate(
                  new Date(
                    new Date(selectedDate).setDate(
                      new Date(selectedDate).getDate() + 1
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                )
              }
              className="px-3 py-2 bg-gray-200 rounded-lg ml-2"
            >
              <Text>▶</Text>
            </TouchableOpacity>
          </View>

          {/* TOTAL */}
          <View className="bg-gray-100 rounded-xl p-4 mb-4">
            <Text className="text-gray-500 text-sm">Total</Text>
            <Text className="font-bold text-lg">
              🔥 {totals.calories} kcal   💪 {totals.protein} g
            </Text>
          </View>

          {/* SEARCH */}
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search food (egg, chicken, oats)"
            placeholderTextColor="#999"
            className="bg-gray-100 px-4 py-3 rounded-xl mb-4"
          />

          {/* QUICK ADD */}
          {!showingResults && (
            <>
              <Text className="font-semibold mb-2">Quick Add</Text>
              <FlatList
                horizontal
                data={QUICK_FOODS}
                keyExtractor={i => i.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => addFood(item)}
                    className="bg-gray-100 px-4 py-3 rounded-xl mr-3 w-36"
                  >
                    <Text className="font-semibold">{item.name}</Text>
                    <Text className="text-xs text-gray-600">
                      🔥 {item.calories} | 💪 {item.protein}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {loading && <ActivityIndicator className="mt-4" />}
        </View>
      }

      renderItem={({ item }) =>
        item.type === "food" ? (
          <TouchableOpacity
            onPress={() => addFood(item.data)}
            className="bg-gray-100 p-4 rounded-xl mb-3"
          >
            <Text className="font-semibold">{item.data.name}</Text>
            <Text className="text-gray-600 text-sm">
              Per 100g → 🔥 {item.data.calories} kcal | 💪 {item.data.protein} g
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-gray-100 p-4 rounded-xl mb-3 flex-row justify-between">
            <View>
              <Text>{item.data.name}</Text>
              <Text className="text-xs text-gray-600">
                {item.data.calories} kcal • {item.data.protein}g
              </Text>
            </View>

            <TouchableOpacity onPress={() => removeMeal(item.data.id)}>
              <Text className="text-red-500 text-lg">✕</Text>
            </TouchableOpacity>
          </View>
        )
      }
    />
  )
}