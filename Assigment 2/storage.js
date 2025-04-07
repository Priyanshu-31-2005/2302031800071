// Local Storage Keys
const STORAGE_KEYS = {
    SAVED_PLANS: 'fitplan_saved_plans',
    PROGRESS: 'fitplan_progress'
};

// Get saved workout plans from local storage
function getSavedPlans() {
    try {
        const plansJson = localStorage.getItem(STORAGE_KEYS.SAVED_PLANS);
        return plansJson ? JSON.parse(plansJson) : [];
    } catch (error) {
        console.error("Error loading saved plans:", error);
        return [];
    }
}

// Save a workout plan to local storage
function savePlan(plan) {
    try {
        const existingPlans = getSavedPlans();
        
        // Check if plan already exists (by id)
        const planIndex = existingPlans.findIndex(p => p.id === plan.id);
        
        if (planIndex >= 0) {
            // Update existing plan
            existingPlans[planIndex] = plan;
        } else {
            // Add new plan
            existingPlans.push(plan);
        }
        
        localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(existingPlans));
        return true;
    } catch (error) {
        console.error("Error saving plan:", error);
        return false;
    }
}

// Delete a workout plan from local storage
function deletePlan(planId) {
    try {
        const existingPlans = getSavedPlans();
        const updatedPlans = existingPlans.filter(plan => plan.id !== planId);
        localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(updatedPlans));
        
        // Also remove any progress tracking for this plan
        removeProgress(planId);
        return true;
    } catch (error) {
        console.error("Error deleting plan:", error);
        return false;
    }
}

// Save workout progress to local storage
function saveProgress(planId, completedDays) {
    try {
        const progressData = getProgressData();
        
        // Update or add progress for this plan
        const planProgressIndex = progressData.findIndex(p => p.planId === planId);
        
        if (planProgressIndex >= 0) {
            progressData[planProgressIndex].completedDays = completedDays;
        } else {
            progressData.push({ planId, completedDays });
        }
        
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressData));
        return true;
    } catch (error) {
        console.error("Error saving progress:", error);
        return false;
    }
}

// Get progress tracking data from local storage
function getProgressData() {
    try {
        const progressJson = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return progressJson ? JSON.parse(progressJson) : [];
    } catch (error) {
        console.error("Error loading progress data:", error);
        return [];
    }
}

// Get progress for a specific plan
function getProgress(planId) {
    try {
        const progressData = getProgressData();
        return progressData.find(p => p.planId === planId);
    } catch (error) {
        console.error("Error getting progress:", error);
        return undefined;
    }
}

// Reset progress for a specific plan
function resetProgress(planId) {
    try {
        const progressData = getProgressData();
        const updatedProgress = progressData.filter(p => p.planId !== planId);
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
        return true;
    } catch (error) {
        console.error("Error resetting progress:", error);
        return false;
    }
}

// Remove progress for a deleted plan
function removeProgress(planId) {
    try {
        const progressData = getProgressData();
        const updatedProgress = progressData.filter(p => p.planId !== planId);
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
        return true;
    } catch (error) {
        console.error("Error removing progress:", error);
        return false;
    }
}