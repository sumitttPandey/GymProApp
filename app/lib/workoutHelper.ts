import { Exercise } from "./use-gym-store"

/* ---------- MUSCLE GROUPS (DROPDOWN) ---------- */
export const getMuscleGroups = (exercises: Exercise[]) => {
  return Array.from(
    new Set(
      exercises
        .map(e => e.muscleGroup)
        .filter(Boolean)
    )
  ) as string[]
}

/* ---------- LAST 3 MUSCLE PROGRESS ---------- */
export const getLast3MuscleProgress = (
  exercises: Exercise[],
  muscle: string
) => {
  const filtered = exercises.filter(
    e => e.muscleGroup === muscle
  )

  const grouped: Record<string, Exercise[]> = {}

  filtered.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = []
    grouped[e.date].push(e)
  })

  return Object.entries(grouped)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 3)
    .reverse()
    .map(([date, list], i) => ({
      label: `Day ${i + 1}`,
      volume: list.reduce(
        (sum, e) =>
          sum +
          (e.weight > 0
            ? e.weight * e.sets * e.reps
            : e.sets * e.reps),
        0
      ),
    }))
}

/* ---------- RECENT WORKOUTS ---------- */
export const getRecentWorkouts = (exercises: Exercise[]) =>
  [...exercises]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

/* ---------- WEEKLY STATS ---------- */
export const getWeeklyStats = (exercises: Exercise[]) => {
  const now = new Date()

  const last7 = exercises.filter(e => {
    const d = new Date(e.date)
    return (now.getTime() - d.getTime()) / 86400000 <= 7
  })

  return computeStats(last7)
}

/* ---------- MONTHLY STATS ---------- */
export const getMonthlyStats = (exercises: Exercise[]) => {
  const now = new Date()

  const last30 = exercises.filter(e => {
    const d = new Date(e.date)
    return (now.getTime() - d.getTime()) / 86400000 <= 30
  })

  return computeStats(last30)
}

/* ---------- SHARED STATS ---------- */
const computeStats = (list: Exercise[]) => {
  let sets = 0
  let volume = 0

  list.forEach(e => {
    sets += e.sets
    volume +=
      e.weight > 0
        ? e.weight * e.sets * e.reps
        : e.sets * e.reps
  })

  return { sets, volume }
}