// DOM elements
const elements = {
    // Views
    formView: document.getElementById('formView'),
    planView: document.getElementById('planView'),
    savedPlansView: document.getElementById('savedPlansView'),
    
    // Form elements
    workoutForm: document.getElementById('workoutForm'),
    
    // Plan display elements
    planGoal: document.getElementById('planGoal'),
    planFrequency: document.getElementById('planFrequency'),
    planDuration: document.getElementById('planDuration'),
    dayTabs: document.getElementById('dayTabs'),
    dayContent: document.getElementById('dayContent'),
    progressGrid: document.getElementById('progressGrid'),
    
    // Buttons
    savedPlansBtn: document.getElementById('savedPlansBtn'),
    savePlanBtn: document.getElementById('savePlanBtn'),
    printPlanBtn: document.getElementById('printPlanBtn'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    editPreferencesBtn: document.getElementById('editPreferencesBtn'),
    backToFormBtn: document.getElementById('backToFormBtn'),
    
    // Saved plans
    savedPlansList: document.getElementById('savedPlansList'),
    
    // Toast notification
    toast: document.getElementById('toast'),
    toastTitle: document.getElementById('toastTitle'),
    toastDescription: document.getElementById('toastDescription'),
    
    // Confirmation dialog
    confirmDialog: document.getElementById('confirmDialog'),
    dialogTitle: document.getElementById('dialogTitle'),
    dialogMessage: document.getElementById('dialogMessage'),
    dialogCancelBtn: document.getElementById('dialogCancelBtn'),
    dialogConfirmBtn: document.getElementById('dialogConfirmBtn'),
    
    // Copyright year
    currentYear: document.getElementById('currentYear')
};

// App state
let state = {
    currentView: 'form', // 'form', 'plan', 'savedPlans'
    currentPlan: null,
    completedDays: [],
    pendingAction: null
};

// Initialize the application
function init() {
    // Set the current year in the footer
    elements.currentYear.textContent = new Date().getFullYear();
    
    // Add event listeners
    setupEventListeners();
    
    // Show the form view by default
    showView('form');
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    elements.workoutForm.addEventListener('submit', handleFormSubmit);
    
    // Navigation buttons
    elements.savedPlansBtn.addEventListener('click', () => showView('savedPlans'));
    elements.backToFormBtn.addEventListener('click', () => showView('form'));
    elements.editPreferencesBtn.addEventListener('click', () => showView('form'));
    
    // Plan actions
    elements.savePlanBtn.addEventListener('click', handleSavePlan);
    elements.printPlanBtn.addEventListener('click', handlePrintPlan);
    elements.resetProgressBtn.addEventListener('click', handleResetProgress);
    
    // Dialog buttons
    elements.dialogCancelBtn.addEventListener('click', closeConfirmDialog);
    elements.dialogConfirmBtn.addEventListener('click', executeConfirmedAction);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        fitnessLevel: document.getElementById('fitnessLevel').value,
        workoutFrequency: document.getElementById('workoutFrequency').value,
        workoutDuration: document.getElementById('workoutDuration').value,
        fitnessGoal: document.querySelector('input[name="fitnessGoal"]:checked').value,
        equipment: Array.from(document.querySelectorAll('input[name="equipment"]:checked')).map(el => el.value),
        focusAreas: Array.from(document.querySelectorAll('input[name="focusAreas"]:checked')).map(el => el.value),
        limitations: document.getElementById('limitations').value
    };
    
    // Validate form data
    if (!formData.equipment || formData.equipment.length === 0) {
        showToast('Error', 'Please select at least one equipment option.');
        return;
    }
    
    // Generate workout plan
    const plan = generateWorkoutPlan(formData);
    
    // Update state
    state.currentPlan = plan;
    state.completedDays = getProgress(plan.id)?.completedDays || [];
    
    // Display the plan
    displayWorkoutPlan(plan);
    
    // Show the plan view
    showView('plan');
}

// Display workout plan
function displayWorkoutPlan(plan) {
    // Update plan overview
    elements.planGoal.textContent = getGoalText(plan.goal);
    elements.planFrequency.textContent = `${plan.frequency} days per week`;
    elements.planDuration.textContent = `${plan.duration} minutes per session`;
    
    // Create tabs for workout days
    createWorkoutDayTabs(plan);
    
    // Create progress tracker
    createProgressTracker(plan);
}

// Create tabs for workout days
function createWorkoutDayTabs(plan) {
    // Clear existing tabs and content
    elements.dayTabs.innerHTML = '';
    elements.dayContent.innerHTML = '';
    
    // Create tabs and content for each workout day
    plan.workoutDays.forEach((day, index) => {
        // Create tab
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = `Day ${index + 1}`;
        tab.dataset.tab = `day-${index}`;
        tab.addEventListener('click', handleTabClick);
        elements.dayTabs.appendChild(tab);
        
        // Create content pane
        const pane = document.createElement('div');
        pane.className = `tab-pane ${index === 0 ? 'active' : ''}`;
        pane.id = `day-${index}`;
        
        // Add heading and description
        const heading = document.createElement('h4');
        heading.className = 'text-lg font-medium mb-2';
        heading.textContent = day.title;
        pane.appendChild(heading);
        
        const description = document.createElement('p');
        description.className = 'text-gray-600 mb-4';
        description.textContent = day.description;
        pane.appendChild(description);
        
        // Add warm-up section
        const warmupSection = createSectionElement('Warm-up (5 min)', day.warmup);
        pane.appendChild(warmupSection);
        
        // Add exercises
        const exercisesContainer = document.createElement('div');
        exercisesContainer.className = 'space-y-4';
        
        day.exercises.forEach(exercise => {
            const exerciseElement = createExerciseElement(exercise);
            exercisesContainer.appendChild(exerciseElement);
        });
        
        pane.appendChild(exercisesContainer);
        
        // Add cool-down section
        const cooldownSection = createSectionElement('Cool Down (5 min)', day.cooldown);
        pane.appendChild(cooldownSection);
        
        // Add to content area
        elements.dayContent.appendChild(pane);
    });
}

// Create section element (warm-up or cool-down)
function createSectionElement(title, items) {
    const section = document.createElement('div');
    section.className = 'workout-section';
    
    const header = document.createElement('h5');
    header.className = 'section-header';
    header.textContent = title;
    section.appendChild(header);
    
    const list = document.createElement('ul');
    list.className = 'section-list';
    
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    
    section.appendChild(list);
    return section;
}

// Create exercise element
function createExerciseElement(exercise) {
    const element = document.createElement('div');
    element.className = 'exercise';
    
    // Exercise header with name and toggle button
    const header = document.createElement('div');
    header.className = 'exercise-header';
    
    const nameContainer = document.createElement('div');
    
    const name = document.createElement('h5');
    name.className = 'exercise-name';
    name.textContent = exercise.name;
    nameContainer.appendChild(name);
    
    const sets = document.createElement('p');
    sets.className = 'exercise-sets';
    sets.textContent = `${exercise.sets} sets of ${exercise.reps}`;
    nameContainer.appendChild(sets);
    
    header.appendChild(nameContainer);
    
    // Toggle button for details
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'exercise-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    toggleBtn.setAttribute('aria-label', 'Show details');
    
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'exercise-details hidden';
    
    toggleBtn.addEventListener('click', () => {
        detailsContainer.classList.toggle('hidden');
        toggleBtn.innerHTML = detailsContainer.classList.contains('hidden') 
            ? '<i class="fas fa-info-circle"></i>' 
            : '<i class="fas fa-times"></i>';
        toggleBtn.setAttribute('aria-label', 
            detailsContainer.classList.contains('hidden') ? 'Show details' : 'Hide details');
    });
    
    header.appendChild(toggleBtn);
    element.appendChild(header);
    
    // Exercise details
    const description = document.createElement('p');
    description.textContent = exercise.description;
    detailsContainer.appendChild(description);
    
    const rest = document.createElement('p');
    rest.innerHTML = `<span class="detail-label">Rest:</span> ${exercise.rest}`;
    detailsContainer.appendChild(rest);
    
    if (exercise.equipment) {
        const equipment = document.createElement('p');
        equipment.innerHTML = `<span class="detail-label">Equipment:</span> ${exercise.equipment}`;
        detailsContainer.appendChild(equipment);
    }
    
    if (exercise.modification) {
        const modification = document.createElement('p');
        modification.innerHTML = `<span class="detail-label">Modification:</span> ${exercise.modification}`;
        detailsContainer.appendChild(modification);
    }
    
    element.appendChild(detailsContainer);
    
    return element;
}

// Create progress tracker
function createProgressTracker(plan) {
    // Clear existing tracker
    elements.progressGrid.innerHTML = '';
    
    // Create tracker items for each workout day
    plan.workoutDays.forEach((day, index) => {
        const trackerDay = document.createElement('div');
        trackerDay.className = `tracker-day ${state.completedDays.includes(index) ? 'completed' : ''}`;
        trackerDay.dataset.day = index;
        trackerDay.addEventListener('click', () => toggleDayCompletion(index));
        
        const dayNumber = document.createElement('p');
        dayNumber.className = 'day-number';
        dayNumber.textContent = `Day ${index + 1}`;
        trackerDay.appendChild(dayNumber);
        
        const dayType = document.createElement('p');
        dayType.className = 'day-type';
        dayType.textContent = day.title.split(' ')[0];
        trackerDay.appendChild(dayType);
        
        const checkmark = document.createElement('div');
        checkmark.className = 'day-check';
        if (state.completedDays.includes(index)) {
            checkmark.innerHTML = '<i class="fas fa-check"></i>';
        }
        trackerDay.appendChild(checkmark);
        
        elements.progressGrid.appendChild(trackerDay);
    });
}

// Handle tab click
function handleTabClick(event) {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Add active class to corresponding pane
    const paneId = event.target.dataset.tab;
    document.getElementById(paneId).classList.add('active');
}

// Toggle workout day completion
function toggleDayCompletion(dayIndex) {
    let newCompletedDays;
    
    if (state.completedDays.includes(dayIndex)) {
        // Remove day from completed days
        newCompletedDays = state.completedDays.filter(day => day !== dayIndex);
    } else {
        // Add day to completed days
        newCompletedDays = [...state.completedDays, dayIndex];
    }
    
    // Update state
    state.completedDays = newCompletedDays;
    
    // Save progress
    if (state.currentPlan) {
        saveProgress(state.currentPlan.id, newCompletedDays);
    }
    
    // Update tracker display
    createProgressTracker(state.currentPlan);
}

// Handle saving plan
function handleSavePlan() {
    if (state.currentPlan) {
        const result = savePlan(state.currentPlan);
        if (result) {
            showToast('Success', 'Your workout plan has been saved successfully!');
        } else {
            showToast('Error', 'There was a problem saving your workout plan.');
        }
    }
}

// Handle printing plan
function handlePrintPlan() {
    window.print();
}

// Handle resetting progress
function handleResetProgress() {
    if (state.currentPlan) {
        showConfirmDialog(
            'Reset Progress', 
            'Are you sure you want to reset your progress for this workout plan?',
            'resetProgress'
        );
    }
}

// Display saved plans
function displaySavedPlans() {
    // Get saved plans
    const savedPlans = getSavedPlans();
    
    // Clear saved plans list
    elements.savedPlansList.innerHTML = '';
    
    if (savedPlans.length === 0) {
        // Show empty state
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        
        const emptyIcon = document.createElement('div');
        emptyIcon.className = 'empty-icon';
        emptyIcon.innerHTML = '<i class="fas fa-folder-open"></i>';
        emptyState.appendChild(emptyIcon);
        
        const emptyText = document.createElement('p');
        emptyText.className = 'empty-text';
        emptyText.textContent = "You don't have any saved workout plans yet";
        emptyState.appendChild(emptyText);
        
        const createButton = document.createElement('button');
        createButton.className = 'btn-primary';
        createButton.textContent = 'Create Your First Plan';
        createButton.addEventListener('click', () => showView('form'));
        emptyState.appendChild(createButton);
        
        elements.savedPlansList.appendChild(emptyState);
    } else {
        // Create and add saved plan cards
        savedPlans.forEach(plan => {
            const card = createSavedPlanCard(plan);
            elements.savedPlansList.appendChild(card);
        });
    }
}

// Create saved plan card
function createSavedPlanCard(plan) {
    const card = document.createElement('div');
    card.className = 'saved-plan-card';
    
    // Header with title and actions
    const header = document.createElement('div');
    header.className = 'saved-plan-header';
    
    const title = document.createElement('h4');
    title.className = 'saved-plan-title';
    title.textContent = plan.name || `${getGoalText(plan.goal)} Plan`;
    header.appendChild(title);
    
    const actionsMenu = document.createElement('div');
    actionsMenu.className = 'plan-actions-menu';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'plan-action edit';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.setAttribute('aria-label', 'Edit plan');
    editBtn.addEventListener('click', () => loadPlan(plan));
    actionsMenu.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'plan-action delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.setAttribute('aria-label', 'Delete plan');
    deleteBtn.addEventListener('click', () => {
        showConfirmDialog(
            'Delete Plan', 
            'Are you sure you want to delete this workout plan? This action cannot be undone.',
            'deletePlan',
            plan.id
        );
    });
    actionsMenu.appendChild(deleteBtn);
    
    header.appendChild(actionsMenu);
    card.appendChild(header);
    
    // Creation date
    const dateElement = document.createElement('p');
    dateElement.className = 'saved-plan-date';
    dateElement.textContent = `Created on ${formatDate(plan.created)}`;
    card.appendChild(dateElement);
    
    // Plan badges
    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'plan-badges';
    
    const goalBadge = document.createElement('span');
    goalBadge.className = 'plan-badge primary';
    goalBadge.textContent = getGoalText(plan.goal);
    badgesContainer.appendChild(goalBadge);
    
    const frequencyBadge = document.createElement('span');
    frequencyBadge.className = 'plan-badge secondary';
    frequencyBadge.textContent = `${plan.frequency} days/week`;
    badgesContainer.appendChild(frequencyBadge);
    
    const durationBadge = document.createElement('span');
    durationBadge.className = 'plan-badge secondary';
    durationBadge.textContent = `${plan.duration} min`;
    badgesContainer.appendChild(durationBadge);
    
    card.appendChild(badgesContainer);
    
    // View plan link
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'saved-plan-actions';
    
    const viewLink = document.createElement('button');
    viewLink.className = 'plan-view-link';
    viewLink.textContent = 'View Plan';
    viewLink.addEventListener('click', () => loadPlan(plan));
    actionsContainer.appendChild(viewLink);
    
    card.appendChild(actionsContainer);
    
    return card;
}

// Load a saved plan
function loadPlan(plan) {
    // Update state
    state.currentPlan = plan;
    state.completedDays = getProgress(plan.id)?.completedDays || [];
    
    // Display the plan
    displayWorkoutPlan(plan);
    
    // Show the plan view
    showView('plan');
}

// Show view
function showView(view) {
    // Update state
    state.currentView = view;
    
    // Hide all views
    elements.formView.classList.add('hidden');
    elements.planView.classList.add('hidden');
    elements.savedPlansView.classList.add('hidden');
    
    // Show selected view
    switch (view) {
        case 'form':
            elements.formView.classList.remove('hidden');
            break;
        case 'plan':
            elements.planView.classList.remove('hidden');
            break;
        case 'savedPlans':
            elements.savedPlansView.classList.remove('hidden');
            displaySavedPlans();
            break;
    }
}

// Show toast notification
function showToast(title, message) {
    // Set toast content
    elements.toastTitle.textContent = title;
    elements.toastDescription.textContent = message;
    
    // Show toast
    elements.toast.classList.add('visible');
    
    // Hide toast after a delay
    setTimeout(() => {
        elements.toast.classList.remove('visible');
    }, 3000);
}

// Show confirmation dialog
function showConfirmDialog(title, message, action, actionParam = null) {
    // Set dialog content
    elements.dialogTitle.textContent = title;
    elements.dialogMessage.textContent = message;
    
    // Set pending action
    state.pendingAction = {
        action: action,
        param: actionParam
    };
    
    // Show dialog
    elements.confirmDialog.classList.add('visible');
}

// Close confirmation dialog
function closeConfirmDialog() {
    // Clear pending action
    state.pendingAction = null;
    
    // Hide dialog
    elements.confirmDialog.classList.remove('visible');
}

// Execute confirmed action
function executeConfirmedAction() {
    if (state.pendingAction) {
        switch (state.pendingAction.action) {
            case 'resetProgress':
                if (state.currentPlan) {
                    resetProgress(state.currentPlan.id);
                    state.completedDays = [];
                    createProgressTracker(state.currentPlan);
                    showToast('Success', 'Progress has been reset.');
                }
                break;
            case 'deletePlan':
                if (state.pendingAction.param) {
                    deletePlan(state.pendingAction.param);
                    
                    // If the deleted plan is the current plan, go back to form
                    if (state.currentPlan && state.currentPlan.id === state.pendingAction.param) {
                        state.currentPlan = null;
                        showView('form');
                    } else {
                        // Otherwise just refresh the saved plans view
                        displaySavedPlans();
                    }
                    
                    showToast('Success', 'Plan has been deleted.');
                }
                break;
        }
    }
    
    // Close dialog
    closeConfirmDialog();
}

// Utility functions
function getGoalText(goal) {
    const goalMap = {
        'strength': 'Build Strength',
        'muscle': 'Gain Muscle',
        'weight-loss': 'Lose Weight',
        'endurance': 'Improve Endurance',
        'flexibility': 'Increase Flexibility',
        'general': 'General Fitness'
    };
    
    return goalMap[goal] || goal;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);