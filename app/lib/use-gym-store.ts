import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

// ---------- UTILS ----------
const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2)

// ---------- TYPES ----------
export interface Exercise {
  id: string
  muscle: string
  name: string
  weight: number
  sets: number
  reps: number
  date: string
  muscleGroup?: string
}

export interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  date: string
  time: string
}

export interface UserProfile {
  name: string
  height: number
  weight: number
  goalCalories: number
  goalProtein: number
  goalCarbs: number
  goalFats: number
}

export interface WorkoutDay {
  date: string
  exercises: Exercise[]
  totalWeight: number
  totalSets: number
}

// ---------- STORE ----------
interface GymStore {
  profile: UserProfile
  updateProfile: (profile: Partial<UserProfile>) => void

  exercises: Exercise[]
  addExercise: (exercise: Omit<Exercise, "id">) => void
  removeExercise: (id: string) => void

  meals: Meal[]
  addMeal: (meal: Omit<Meal, "id">) => void
  removeMeal: (id: string) => void
}

export const useGymStore = create<GymStore>()(
  persist(
    (set) => ({
      profile: {
        name: "User",
        height: 175,
        weight: 70,
        goalCalories: 2400,
        goalProtein: 180,
        goalCarbs: 280,
        goalFats: 80,
      },

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      exercises: [],
      addExercise: (exercise) =>
        set((state) => ({
          exercises: [...state.exercises, { ...exercise, id: generateId() }],
        })),

      removeExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((e) => e.id !== id),
        })),

      meals: [],
      addMeal: (meal) =>
        set((state) => ({
          meals: [...state.meals, { ...meal, id: generateId() }],
        })),

      removeMeal: (id) =>
        set((state) => ({
          meals: state.meals.filter((m) => m.id !== id),
        })),
    }),
    {
      name: "gym-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

// ---------- HELPERS ----------
export const getToday = () =>
  new Date().toISOString().split("T")[0]

export function computeTodaysMeals(meals: Meal[]) {
  const today = getToday()
  return meals.filter((m) => m.date === today)
}

export function computeTodaysNutrition(meals: Meal[]) {
  const todaysMeals = computeTodaysMeals(meals)
  return todaysMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )
}

export function computeWeeklyData(exercises: Exercise[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date()
  const weekData: WorkoutDay[] = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    const dayExercises = exercises.filter((e) => e.date === dateStr)

    weekData.push({
      date: days[date.getDay()],
      exercises: dayExercises,
      totalWeight: dayExercises.reduce(
        (sum, e) => sum + e.weight * e.sets * e.reps,
        0
      ),
      totalSets: dayExercises.reduce((sum, e) => sum + e.sets, 0),
    })
  }

  return weekData
}

export function computeMonthlyData(exercises: Exercise[]) {
  const today = new Date()
  const monthData = []

  for (let week = 3; week >= 0; week--) {
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - week * 7 - 6)
    const weekEnd = new Date(today)
    weekEnd.setDate(today.getDate() - week * 7)

    const weekExercises = exercises.filter((e) => {
      const exerciseDate = new Date(e.date)
      return exerciseDate >= weekStart && exerciseDate <= weekEnd
    })

    monthData.push({
      week: `Week ${4 - week}`,
      weight: weekExercises.reduce(
        (sum, e) => sum + e.weight * e.sets * e.reps,
        0
      ),
      sets: weekExercises.reduce((sum, e) => sum + e.sets, 0),
    })
  }

  return monthData
}