// Function to select exercises based on the user's fitness goal, equipment, and focus areas
function selectExercises(goal, equipment, fitnessLevel, focusAreas) {
    // If no specific focus areas are selected, use a default set
    const areas = focusAreas && focusAreas.length > 0 
        ? focusAreas 
        : getDefaultFocusAreas(goal);
    
    // Determine number of exercises based on fitness level
    const exercisesPerArea = {
        beginner: 2,
        intermediate: 3,
        advanced: 4
    };
    
    // Create array of workout days based on focus areas
    const workoutDays = [];
    
    for (const area of areas) {
        // Get either the specific focus area or a general "full-body" area if not found
        const exercises = getExercisesForFocusArea(goal, area, equipment, exercisesPerArea[fitnessLevel]);
        
        // Add the workout day to the array
        workoutDays.push(exercises);
    }
    
    return workoutDays;
}

// Function to get default focus areas based on the user's goal
function getDefaultFocusAreas(goal) {
    switch (goal) {
        case 'strength':
        case 'muscle':
            return ['upper-body', 'lower-body', 'core'];
        case 'weight-loss':
            return ['cardio', 'full-body', 'cardio'];
        case 'endurance':
            return ['cardio', 'full-body', 'cardio'];
        case 'flexibility':
            return ['full-body', 'full-body', 'full-body'];
        case 'general':
        default:
            return ['full-body', 'full-body', 'full-body'];
    }
}

// Function to get exercises for a specific focus area
function getExercisesForFocusArea(goal, focusArea, availableEquipment, exerciseCount) {
    // Get workout title and description
    const title = workoutTitles[goal]?.[focusArea]?.title || 
                 workoutTitles[goal]?.["full-body"]?.title || 
                 "Workout Day";
    
    const description = workoutTitles[goal]?.[focusArea]?.description || 
                       workoutTitles[goal]?.["full-body"]?.description || 
                       "Complete all exercises with proper form.";
    
    // Get warm-up and cool-down exercises
    const warmupExercises = warmups[focusArea] || warmups["full-body"];
    const cooldownExercises = cooldowns[focusArea] || cooldowns["full-body"];
    
    // Get potential exercises for this goal and focus area
    let exercises = [];
    
    // First, try to get exercises for the specific goal and focus area
    if (exerciseDatabase[goal]?.[focusArea]) {
        // For each available equipment type, try to find exercises
        for (const equipment of availableEquipment) {
            if (exerciseDatabase[goal][focusArea][equipment]) {
                exercises = exercises.concat(exerciseDatabase[goal][focusArea][equipment]);
            }
        }
    }
    
    // If no exercises were found, try to get general exercises or "none" equipment exercises
    if (exercises.length === 0) {
        // Try "full-body" for the same goal
        if (exerciseDatabase[goal]?.["full-body"]) {
            for (const equipment of availableEquipment) {
                if (exerciseDatabase[goal]["full-body"][equipment]) {
                    exercises = exercises.concat(exerciseDatabase[goal]["full-body"][equipment]);
                }
            }
        }
        
        // If still no exercises, fall back to "none" equipment
        if (exercises.length === 0 && exerciseDatabase[goal]?.[focusArea]?.none) {
            exercises = exercises.concat(exerciseDatabase[goal][focusArea].none);
        }
        
        // Last resort: general fitness with no equipment
        if (exercises.length === 0) {
            exercises = exerciseDatabase.general["full-body"].none;
        }
    }
    
    // Shuffle exercises and take required number
    exercises = shuffleArray(exercises);
    exercises = exercises.slice(0, Math.min(exerciseCount, exercises.length));
    
    // Create and return the workout day object
    return {
        title: title,
        description: description,
        warmup: warmupExercises,
        exercises: exercises,
        cooldown: cooldownExercises
    };
}

// Utility function to shuffle an array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Main function to generate a workout plan based on user inputs
function generateWorkoutPlan(formData) {
    // Extract form data
    const {
        fitnessLevel,
        workoutFrequency,
        workoutDuration,
        fitnessGoal,
        equipment,
        focusAreas,
        limitations
    } = formData;
    
    // Generate a unique ID for the plan
    const planId = Date.now();
    
    // Generate workout days
    const workoutDays = selectExercises(
        fitnessGoal,
        equipment,
        fitnessLevel,
        focusAreas
    );
    
    // Adjust the number of workout days based on frequency
    const frequency = parseInt(workoutFrequency);
    const finalWorkoutDays = workoutDays.slice(0, frequency);
    
    // Create the workout plan object
    const plan = {
        id: planId,
        fitnessLevel: fitnessLevel,
        frequency: workoutFrequency,
        duration: workoutDuration,
        goal: fitnessGoal,
        equipment: equipment,
        focusAreas: focusAreas,
        limitations: limitations,
        workoutDays: finalWorkoutDays,
        created: new Date().toISOString()
    };
    
    return plan;
}