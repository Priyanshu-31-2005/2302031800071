// Exercise database organized by goal, body part, and equipment
const exerciseDatabase = {
    strength: {
        "upper-body": {
            none: [
                {
                    name: "Push-ups",
                    description: "Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.",
                    sets: 3,
                    reps: "10-12 reps",
                    rest: "60 seconds between sets",
                    modification: "Do from knees if needed"
                },
                {
                    name: "Diamond Push-ups",
                    description: "Place your hands close together under your chest forming a diamond shape with your thumbs and index fingers. Perform a push-up while keeping your elbows close to your body.",
                    sets: 3,
                    reps: "8-10 reps",
                    rest: "60 seconds between sets",
                    modification: "Do from knees if needed"
                },
                {
                    name: "Pike Push-ups",
                    description: "Start in a downward dog position with your hips high. Bend your elbows to lower your head toward the floor, then push back up.",
                    sets: 3,
                    reps: "8-12 reps",
                    rest: "60-90 seconds between sets",
                    modification: "Reduce range of motion if needed"
                },
                {
                    name: "Plank to Push-up",
                    description: "Start in a forearm plank, then push up one arm at a time to a push-up position, then lower back down one arm at a time.",
                    sets: 3,
                    reps: "6-10 reps per side",
                    rest: "45-60 seconds between sets"
                }
            ],
            dumbbells: [
                {
                    name: "Dumbbell Bench Press",
                    description: "Lie on a flat bench with a dumbbell in each hand. Press the weights up until your arms are straight, then lower them back down.",
                    sets: 4,
                    reps: "8-12 reps",
                    rest: "60-90 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Dumbbell Rows",
                    description: "Place one hand on a bench with the opposite foot on the floor. Hold a dumbbell in your free hand, pull it towards your hip while keeping your elbow close to your body.",
                    sets: 3,
                    reps: "12 reps (each arm)",
                    rest: "60 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Shoulder Press",
                    description: "Stand with feet shoulder-width apart, hold dumbbells at shoulder height with palms facing forward. Press weights overhead until arms are extended.",
                    sets: 3,
                    reps: "10 reps",
                    rest: "60-90 seconds between sets",
                    equipment: "dumbbells"
                }
            ],
            "barbell": [
                {
                    name: "Bench Press",
                    description: "Lie on a bench with feet flat on the floor. Grip the barbell slightly wider than shoulder width, lower it to your chest, then press it back up.",
                    sets: 4,
                    reps: "5-8 reps",
                    rest: "90-120 seconds between sets",
                    equipment: "barbell"
                },
                {
                    name: "Bent-Over Rows",
                    description: "Bend at your hips and knees, keeping your back straight. Hold the barbell with an overhand grip and pull it to your lower chest.",
                    sets: 3,
                    reps: "8-10 reps",
                    rest: "60-90 seconds between sets",
                    equipment: "barbell"
                }
            ]
        },
        "lower-body": {
            none: [
                {
                    name: "Bodyweight Squats",
                    description: "Stand with feet shoulder-width apart. Bend your knees and hips to lower your body as if sitting in a chair, then return to standing.",
                    sets: 3,
                    reps: "15-20 reps",
                    rest: "60 seconds between sets"
                },
                {
                    name: "Lunges",
                    description: "Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
                    sets: 3,
                    reps: "12 reps per leg",
                    rest: "60 seconds between sets"
                },
                {
                    name: "Single-Leg Glute Bridge",
                    description: "Lie on your back with knees bent and feet flat. Extend one leg, then lift your hips off the ground using the planted foot.",
                    sets: 3,
                    reps: "10-15 reps per leg",
                    rest: "45 seconds between sets"
                }
            ],
            dumbbells: [
                {
                    name: "Goblet Squats",
                    description: "Hold a dumbbell close to your chest. Squat down, keeping your back straight and chest up, then return to standing.",
                    sets: 3,
                    reps: "12-15 reps",
                    rest: "60-90 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Dumbbell Lunges",
                    description: "Hold dumbbells at your sides, step forward with one leg into a lunge, lower until both knees are bent at 90 degrees, then push back to start.",
                    sets: 3,
                    reps: "10 reps per leg",
                    rest: "60 seconds between sets",
                    equipment: "dumbbells"
                }
            ],
            barbell: [
                {
                    name: "Barbell Back Squats",
                    description: "Position the barbell on your upper back, feet shoulder-width apart. Bend at knees and hips to lower down, then push through heels to stand.",
                    sets: 4,
                    reps: "6-8 reps",
                    rest: "90-120 seconds between sets",
                    equipment: "barbell"
                },
                {
                    name: "Romanian Deadlifts",
                    description: "Hold the barbell in front of your thighs, feet hip-width apart. Hinge at the hips while keeping your back straight, lowering the bar along your legs.",
                    sets: 3,
                    reps: "8-10 reps",
                    rest: "90 seconds between sets",
                    equipment: "barbell"
                }
            ]
        },
        "core": {
            none: [
                {
                    name: "Plank",
                    description: "Get into a push-up position but with forearms on the ground. Keep your body in a straight line from head to heels.",
                    sets: 3,
                    reps: "30-60 seconds hold",
                    rest: "45 seconds between sets"
                },
                {
                    name: "Mountain Climbers",
                    description: "Start in a push-up position, bring one knee toward your chest, then switch legs in a running motion.",
                    sets: 3,
                    reps: "30 seconds",
                    rest: "30 seconds between sets"
                },
                {
                    name: "Russian Twists",
                    description: "Sit on the floor with knees bent, lean back slightly. Rotate your torso from side to side, touching the floor next to your hips.",
                    sets: 3,
                    reps: "15 reps per side",
                    rest: "45 seconds between sets"
                }
            ]
        }
    },
    muscle: {
        "upper-body": {
            none: [
                {
                    name: "Push-up Variations",
                    description: "Perform different push-up variations (wide, narrow, decline) in succession with minimal rest between types.",
                    sets: 3,
                    reps: "8-12 reps of each variation",
                    rest: "60 seconds between sets",
                    modification: "Do from knees if needed"
                },
                {
                    name: "Pull-ups or Inverted Rows",
                    description: "If you have a bar, do pull-ups. If not, find a sturdy table to do inverted rows underneath it.",
                    sets: 3,
                    reps: "As many as possible",
                    rest: "90 seconds between sets",
                    modification: "Use a chair to assist pull-ups if needed"
                }
            ],
            dumbbells: [
                {
                    name: "Dumbbell Chest Flyes",
                    description: "Lie on a bench with a dumbbell in each hand, arms extended above chest. Lower weights out to sides in an arc, then bring back together.",
                    sets: 3,
                    reps: "10-12 reps",
                    rest: "60 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Incline Dumbbell Press",
                    description: "Lie on an inclined bench, hold dumbbells at shoulder level. Press weights up until arms are extended, then lower back down.",
                    sets: 4,
                    reps: "8-10 reps",
                    rest: "60-90 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Dumbbell Bicep Curls",
                    description: "Stand with dumbbells at your sides, palms facing forward. Curl the weights toward your shoulders, then lower back down.",
                    sets: 3,
                    reps: "12 reps",
                    rest: "45-60 seconds between sets",
                    equipment: "dumbbells"
                }
            ]
        },
        "lower-body": {
            none: [
                {
                    name: "Jump Squats",
                    description: "Perform a bodyweight squat, then explode upward into a jump. Land softly and immediately go into the next rep.",
                    sets: 4,
                    reps: "12-15 reps",
                    rest: "60-90 seconds between sets"
                },
                {
                    name: "Bulgarian Split Squats",
                    description: "Place one foot on a bench behind you, the other in front. Lower yourself down until your front thigh is parallel to the ground.",
                    sets: 3,
                    reps: "10-12 reps per leg",
                    rest: "60 seconds between sets"
                }
            ],
            dumbbells: [
                {
                    name: "Dumbbell Deadlifts",
                    description: "Hold dumbbells in front of thighs, feet hip-width apart. Hinge at the hips while keeping your back straight, lowering the weights along your legs.",
                    sets: 4,
                    reps: "10-12 reps",
                    rest: "90 seconds between sets",
                    equipment: "dumbbells"
                },
                {
                    name: "Walking Lunges",
                    description: "Hold dumbbells at your sides, step forward into a lunge, then bring the back foot forward to step into another lunge with the opposite leg.",
                    sets: 3,
                    reps: "10 steps per leg",
                    rest: "60-90 seconds between sets",
                    equipment: "dumbbells"
                }
            ]
        }
    },
    "weight-loss": {
        cardio: {
            none: [
                {
                    name: "Burpees",
                    description: "Begin in standing position, drop to a squat, kick feet back to plank, do a push-up, jump feet back to squat, then jump up with hands overhead.",
                    sets: 4,
                    reps: "10-15 reps",
                    rest: "45 seconds between sets"
                },
                {
                    name: "High Knees",
                    description: "Run in place, bringing knees up to hip height with each step. Swing arms in opposition to legs.",
                    sets: 3,
                    reps: "30-45 seconds",
                    rest: "30 seconds between sets"
                },
                {
                    name: "Jumping Jacks",
                    description: "Stand with feet together and arms at sides, jump to a position with legs apart and arms overhead, then return to starting position.",
                    sets: 3,
                    reps: "45-60 seconds",
                    rest: "30 seconds between sets"
                }
            ]
        },
        "full-body": {
            none: [
                {
                    name: "Circuit Training",
                    description: "Perform a series of exercises back-to-back with minimal rest: 10 squats, 10 push-ups, 10 sit-ups, 10 lunges (each leg).",
                    sets: 3,
                    reps: "1 round of all exercises",
                    rest: "60 seconds between sets"
                },
                {
                    name: "Mountain Climbers",
                    description: "Start in a push-up position, bring one knee toward your chest, then switch legs in a running motion.",
                    sets: 4,
                    reps: "30 seconds",
                    rest: "15 seconds between sets"
                }
            ]
        }
    },
    "endurance": {
        cardio: {
            none: [
                {
                    name: "Jumping Rope",
                    description: "Jump rope continuously, alternating feet or doing double-unders for added intensity.",
                    sets: 3,
                    reps: "2-3 minutes",
                    rest: "60 seconds between sets"
                },
                {
                    name: "Bodyweight HIIT",
                    description: "Alternate 30 seconds of high-intensity exercise (burpees, jumping jacks, high knees) with 15 seconds rest.",
                    sets: 1,
                    reps: "10 rounds of different exercises",
                    rest: "Complete all rounds with minimal rest"
                }
            ]
        },
        "full-body": {
            none: [
                {
                    name: "Endurance Circuit",
                    description: "Perform exercises in circuit with minimal rest: 30 sec jumping jacks, 30 sec squats, 30 sec push-ups, 30 sec mountain climbers.",
                    sets: 3,
                    reps: "1 round of all exercises",
                    rest: "90 seconds after each complete circuit"
                }
            ]
        }
    },
    "flexibility": {
        "full-body": {
            none: [
                {
                    name: "Sun Salutations",
                    description: "Perform a flowing sequence of yoga poses that stretch the entire body.",
                    sets: 2,
                    reps: "5-8 complete flows",
                    rest: "30 seconds between sets"
                },
                {
                    name: "Dynamic Stretching Routine",
                    description: "Perform a series of dynamic stretches: arm circles, leg swings, torso twists, neck rotations, ankle rotations.",
                    sets: 2,
                    reps: "10-15 reps of each stretch",
                    rest: "Move from one stretch to the next with minimal rest"
                }
            ]
        }
    },
    "general": {
        "full-body": {
            none: [
                {
                    name: "Bodyweight Circuit",
                    description: "Complete a full-body circuit: 10 push-ups, 15 squats, 10 lunges each leg, 30-second plank, 15 mountain climbers.",
                    sets: 3,
                    reps: "1 round of all exercises",
                    rest: "60-90 seconds between sets"
                }
            ]
        }
    }
};

// Warm-up exercises for different workout types
const warmups = {
    "upper-body": [
        "Arm circles: 30 seconds",
        "Jumping jacks: 1 minute",
        "Push-up to downward dog: 10 reps",
        "Shoulder rolls: 30 seconds",
        "Light jogging in place: 2 minutes"
    ],
    "lower-body": [
        "Bodyweight squats: 15 reps",
        "Leg swings: 10 per leg",
        "Hip circles: 10 in each direction",
        "Light jogging in place: 2 minutes",
        "Walking lunges: 10 per leg"
    ],
    core: [
        "Cat-cow stretch: 10 reps",
        "Plank: 30 seconds",
        "Bird-dog: 5 reps per side",
        "Hip bridges: 10 reps",
        "Light jogging in place: 2 minutes"
    ],
    cardio: [
        "Jumping jacks: 1 minute",
        "High knees: 30 seconds",
        "Butt kicks: 30 seconds",
        "Light jogging in place: 2 minutes",
        "Arm circles: 30 seconds"
    ],
    "full-body": [
        "Jumping jacks: 1 minute",
        "Bodyweight squats: 10 reps",
        "Arm circles: 10 in each direction",
        "Light jogging in place: 2 minutes",
        "Torso twists: 10 to each side"
    ]
};

// Cool-down exercises for different workout types
const cooldowns = {
    "upper-body": [
        "Upper body stretches: 3 minutes",
        "Deep breathing: 2 minutes"
    ],
    "lower-body": [
        "Lower body stretches: 3 minutes",
        "Deep breathing: 2 minutes"
    ],
    core: [
        "Core and back stretches: 3 minutes",
        "Deep breathing: 2 minutes"
    ],
    cardio: [
        "Full body stretches: 3 minutes",
        "Deep breathing: 2 minutes"
    ],
    "full-body": [
        "Full body stretches: 3 minutes",
        "Deep breathing: 2 minutes"
    ]
};

// Workout titles and descriptions by goal
const workoutTitles = {
    strength: {
        "upper-body": { 
            title: "Upper Body Strength", 
            description: "Focus on compound movements for upper body strength development."
        },
        "lower-body": { 
            title: "Lower Body Power", 
            description: "Build strong legs and glutes with these foundational exercises."
        },
        core: { 
            title: "Core Stability", 
            description: "Develop a strong, stable core to support all your movements."
        },
        "full-body": { 
            title: "Full Body Strength", 
            description: "A comprehensive workout targeting major muscle groups for overall strength."
        }
    },
    muscle: {
        "upper-body": { 
            title: "Upper Body Hypertrophy", 
            description: "Target your chest, back, shoulders, and arms for maximum muscle growth."
        },
        "lower-body": { 
            title: "Lower Body Hypertrophy", 
            description: "Stimulate muscle growth in your legs and glutes with these targeted exercises."
        },
        core: { 
            title: "Core Definition", 
            description: "Build defined abs and a strong core with these targeted exercises."
        },
        "full-body": { 
            title: "Full Body Muscle Building", 
            description: "Stimulate total body muscle growth with this comprehensive workout."
        }
    },
    "weight-loss": {
        cardio: { 
            title: "Fat-Burning Cardio", 
            description: "High-intensity cardio exercises to maximize calorie burn and fat loss."
        },
        "full-body": { 
            title: "Full Body Fat Loss", 
            description: "Combine resistance training with cardio to burn calories and preserve muscle."
        }
    },
    "endurance": {
        cardio: { 
            title: "Cardio Endurance", 
            description: "Build stamina and improve cardiovascular fitness with these exercises."
        },
        "full-body": { 
            title: "Total Body Endurance", 
            description: "Improve stamina and work capacity across all major muscle groups."
        }
    },
    "flexibility": {
        "full-body": { 
            title: "Mobility & Flexibility", 
            description: "Improve your range of motion and functional flexibility with this routine."
        }
    },
    "general": {
        "full-body": { 
            title: "General Fitness Workout", 
            description: "A balanced workout to improve overall fitness, strength, and conditioning."
        }
    }
};