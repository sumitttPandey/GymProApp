import { Meal } from "./use-gym-store"

export const getLast7DaysNutrition = (meals: Meal[]) => {
  const result = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const date = d.toISOString().split("T")[0]

    const dayMeals = meals.filter((m) => m.date === date)

    result.push({
      date,
      calories: dayMeals.reduce((s, m) => s + m.calories, 0),
      protein: dayMeals.reduce((s, m) => s + m.protein, 0),
    })
  }

  return result
}