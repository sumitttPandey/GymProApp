export const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Legs",
  "Glutes",
  "Core",
  "Cardio",
]

export interface ExerciseData {
  name: string
  muscleGroup: string
  description: string
  youtubeId: string // YouTube video ID
}

export const exercisesDatabase: ExerciseData[] = [
  // Chest
  { name: "Bench Press", muscleGroup: "Chest", description: "Barbell bench press", youtubeId: "ScGbp0k58nE" },
  { name: "Incline Dumbbell Press", muscleGroup: "Chest", description: "Incline DB press", youtubeId: "sB6Oy2F1qQY" },
  { name: "Decline Dumbbell Press", muscleGroup: "Chest", description: "Decline DB press", youtubeId: "pYwbWDTf0EE" },
  { name: "Cable Flyes", muscleGroup: "Chest", description: "Cable chest flyes", youtubeId: "sB6Oy2F1qQY" },
  { name: "Push Ups", muscleGroup: "Chest", description: "Bodyweight push ups", youtubeId: "IODxDxX7oi4" },
  { name: "Machine Chest Press", muscleGroup: "Chest", description: "Machine chest press", youtubeId: "mZqK84yktXE" },

  // Back
  { name: "Barbell Row", muscleGroup: "Back", description: "Barbell bent over rows", youtubeId: "QhFC1mO89qE" },
  { name: "Lat Pulldown", muscleGroup: "Back", description: "Lat pulldown machine", youtubeId: "28W1qI2PY0M" },
  { name: "Pull Ups", muscleGroup: "Back", description: "Bodyweight pull ups", youtubeId: "eQIiUZZ1luM" },
  { name: "Dumbbell Row", muscleGroup: "Back", description: "Single arm dumbbell rows", youtubeId: "pYwbWDTf0EE" },
  { name: "T-Bar Row", muscleGroup: "Back", description: "T-bar bent over rows", youtubeId: "qxLJOI65n7U" },
  {
    name: "Assisted Pull Ups",
    muscleGroup: "Back",
    description: "Machine assisted pull ups",
    youtubeId: "28W1qI2PY0M",
  },

  // Shoulders
  { name: "Shoulder Press", muscleGroup: "Shoulders", description: "Barbell shoulder press", youtubeId: "PmpjzF_HgIU" },
  {
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    description: "Dumbbell shoulder press",
    youtubeId: "ZtyxjZM6iSk",
  },
  {
    name: "Lateral Raises",
    muscleGroup: "Shoulders",
    description: "Dumbbell lateral raises",
    youtubeId: "3VczyKlTPAY",
  },
  { name: "Front Raises", muscleGroup: "Shoulders", description: "Dumbbell front raises", youtubeId: "g1x_Q3_6OFE" },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "Shoulders",
    description: "Machine shoulder press",
    youtubeId: "Y8ryjGHnVWc",
  },
  {
    name: "Cable Lateral Raises",
    muscleGroup: "Shoulders",
    description: "Cable lateral raises",
    youtubeId: "9_aVFaEPR8I",
  },

  // Biceps
  { name: "Barbell Curl", muscleGroup: "Biceps", description: "Barbell bicep curls", youtubeId: "kvulkPKjW68" },
  { name: "Dumbbell Curl", muscleGroup: "Biceps", description: "Dumbbell bicep curls", youtubeId: "IkS79uLmMGo" },
  { name: "Cable Curl", muscleGroup: "Biceps", description: "Cable bicep curls", youtubeId: "f0R2RxQVEzU" },
  { name: "Hammer Curls", muscleGroup: "Biceps", description: "Hammer grip dumbbell curls", youtubeId: "zC3nLlEvin4" },
  { name: "Machine Curl", muscleGroup: "Biceps", description: "Machine bicep curl", youtubeId: "gXU-f9QCZAI" },
  {
    name: "Concentration Curls",
    muscleGroup: "Biceps",
    description: "Seated concentration curls",
    youtubeId: "vDw9chMGMNo",
  },

  // Triceps
  { name: "Tricep Dips", muscleGroup: "Triceps", description: "Bodyweight tricep dips", youtubeId: "0326dy_-DzM" },
  { name: "Tricep Pushdown", muscleGroup: "Triceps", description: "Cable tricep pushdown", youtubeId: "m3QjCdgEV08" },
  {
    name: "Overhead Tricep Extension",
    muscleGroup: "Triceps",
    description: "Dumbbell overhead extension",
    youtubeId: "5VyJQPk4YFo",
  },
  {
    name: "Close Grip Bench Press",
    muscleGroup: "Triceps",
    description: "Close grip barbell press",
    youtubeId: "W3bKHrwlpfA",
  },
  {
    name: "Rope Tricep Pushdown",
    muscleGroup: "Triceps",
    description: "Rope cable pushdown",
    youtubeId: "N_hBVnDGhwk",
  },
  { name: "Tricep Machine", muscleGroup: "Triceps", description: "Machine tricep press", youtubeId: "C9u5tCn3yUc" },

  // Legs
  { name: "Squat", muscleGroup: "Legs", description: "Barbell back squat", youtubeId: "ultWZbUMPL8" },
  { name: "Leg Press", muscleGroup: "Legs", description: "Machine leg press", youtubeId: "IZxyjW7MIAI" },
  { name: "Leg Curl", muscleGroup: "Legs", description: "Machine leg curl", youtubeId: "2eVTAH3v4Bw" },
  { name: "Leg Extension", muscleGroup: "Legs", description: "Machine leg extension", youtubeId: "YyvSfVjQeYc" },
  { name: "Lunges", muscleGroup: "Legs", description: "Dumbbell lunges", youtubeId: "Z2n58m1stXU" },
  { name: "Hack Squat", muscleGroup: "Legs", description: "Machine hack squat", youtubeId: "ZwgEhzJo8Vo" },

  // Glutes
  { name: "Deadlifts", muscleGroup: "Glutes", description: "Barbell deadlifts", youtubeId: "r4MzxtBKyNE" },
  { name: "Hip Thrusts", muscleGroup: "Glutes", description: "Barbell hip thrusts", youtubeId: "8FBi1MnczT0" },
  { name: "Glute Bridge", muscleGroup: "Glutes", description: "Bodyweight glute bridge", youtubeId: "wwhzCzjgE1o" },
  {
    name: "Leg Press High Foot",
    muscleGroup: "Glutes",
    description: "Leg press with high foot placement",
    youtubeId: "IZxyjW7MIAI",
  },
  { name: "Cable Kickbacks", muscleGroup: "Glutes", description: "Cable glute kickbacks", youtubeId: "mVdV-HiXFFs" },
  {
    name: "Smith Machine Hip Thrusts",
    muscleGroup: "Glutes",
    description: "Smith machine hip thrusts",
    youtubeId: "8FBi1MnczT0",
  },

  // Core
  { name: "Planks", muscleGroup: "Core", description: "Front plank hold", youtubeId: "pSHjTRCQxIw" },
  { name: "Cable Woodchops", muscleGroup: "Core", description: "Cable woodchop rotations", youtubeId: "u3X6e68_R7c" },
  { name: "Ab Wheel Rollout", muscleGroup: "Core", description: "Ab wheel rollout", youtubeId: "HUKhLOLKDvI" },
  { name: "Machine Crunch", muscleGroup: "Core", description: "Machine crunch", youtubeId: "3GVMKWQRDIM" },
  { name: "Decline Sit Ups", muscleGroup: "Core", description: "Decline bench sit ups", youtubeId: "n6r15_dR2vA" },
  { name: "Hanging Leg Raises", muscleGroup: "Core", description: "Hanging leg raises", youtubeId: "6p_2OaVAQwI" },

  // Cardio
  { name: "Running", muscleGroup: "Cardio", description: "Treadmill running", youtubeId: "7KFN2YEVLDI" },
  { name: "Cycling", muscleGroup: "Cardio", description: "Stationary bike", youtubeId: "JkVNePF_K6w" },
  { name: "Rowing", muscleGroup: "Cardio", description: "Rowing machine", youtubeId: "1bwCRfhAWdg" },
  { name: "Elliptical", muscleGroup: "Cardio", description: "Elliptical machine", youtubeId: "qAiQq_eV3V0" },
  { name: "Jumping Jacks", muscleGroup: "Cardio", description: "Bodyweight jumping jacks", youtubeId: "c4tV3a3pTCQ" },
  { name: "Burpees", muscleGroup: "Cardio", description: "Full body burpees", youtubeId: "JZQA5VrZLYU" },
]

export function getExercisesByMuscle(muscleGroup: string): ExerciseData[] {
  return exercisesDatabase.filter((ex) => ex.muscleGroup === muscleGroup)
}
