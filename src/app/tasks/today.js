import { myTasks } from './myTasks.js';

const body = document.querySelector('body');
const dialog = document.createElement('dialog');
const mainContent = document.querySelector('.content');

export default function renderTasksToday() {    
    // clear and set page title
    const pageTitleDiv = document.querySelector('.page-title');

    const pageTitleH2 = document.createElement('h2');

    pageTitleDiv.textContent = '';  
    pageTitleH2.textContent = 'Today';
    mainContent.textContent = '';

    pageTitleDiv.prepend(pageTitleH2);

    renderTasks();

    createAddTaskDialog();
    
}

const renderTasks = () => {
    // clear content DOM
    mainContent.textContent = '';
    // display tasks to DOM
    const taskContainerDiv = document.createElement('div');
    
    taskContainerDiv.classList.add('task-container');    

    myTasks.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('span');
        const taskDescription = document.createElement('span');
        const taskDueDate = document.createElement('span');
        const taskPriority = document.createElement('span');    
        const deleteBtn = document.createElement('button');
        
        taskDiv.classList.add('task');
        taskTitle.classList.add('title');
        taskDescription.classList.add('description');
        taskDueDate.classList.add('due-date');
        taskPriority.classList.add('priority');
        deleteBtn.classList.add('delete-btn');
        
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = task.priority;
        deleteBtn.textContent = 'Delete';

        taskDiv.append(taskTitle);
        taskDiv.append(taskDescription);
        taskDiv.append(taskDueDate);
        taskDiv.append(taskPriority);
        taskDiv.append(deleteBtn);

        taskContainerDiv.append(taskDiv);

        deleteBtn.addEventListener('click', () => {
            myTasks.deleteTask(task.id);
            renderTasks();
        });
    });

    // add new task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('btn-new-task');
    addTaskBtn.textContent = 'New task';
    addTaskBtn.addEventListener('click', () => dialog.showModal() );
    taskContainerDiv.prepend(addTaskBtn);

    mainContent.append(taskContainerDiv);
}

const createAddTaskDialog = () => {
    // dialog header
    const dialogHead = document.createElement('div');
    const dialogTitle = document.createElement('h2');
    const dialogCloseBtn = document.createElement('button');

    dialogTitle.textContent = 'New Task';
    dialogCloseBtn.textContent = 'Close';

    dialogHead.append(dialogTitle);
    dialogHead.append(dialogCloseBtn);

    // create form
    const form = document.createElement('form');

    // task title label and input
    const titleDiv = document.createElement('div');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');

    titleDiv.classList.add('form-group');
    titleLabel.textContent = 'Title';
    titleLabel.htmlFor = 'task-title';
    titleInput.type = 'text';
    titleInput.id = 'task-title';
    titleInput.required = true;

    titleDiv.append(titleLabel);
    titleDiv.append(titleInput);
    form.append(titleDiv);
    
    // task description label and input
    const descriptionDiv = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');

    descriptionDiv.classList.add('form-group');
    descriptionLabel.textContent = 'Description';
    descriptionLabel.htmlFor = 'task-description';
    descriptionInput.type = 'text';
    descriptionInput.id = 'task-description';
    descriptionInput.required = true;

    descriptionDiv.append(descriptionLabel);
    descriptionDiv.append(descriptionInput);
    form.append(descriptionDiv);

    // task due date label and input
    const dueDateDiv = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    const dueDateInput  = document.createElement('input');

    dueDateDiv.classList.add('form-group');
    dueDateLabel.textContent = 'Due Date';
    dueDateLabel.htmlFor = 'task-due-date';
    dueDateInput.type = 'date';
    dueDateInput.id = 'task-due-date';
    dueDateInput.required = true;

    dueDateDiv.append(dueDateLabel);
    dueDateDiv.append(dueDateInput);
    form.append(dueDateDiv);

    // task priority fieldset and radios
    const priorityFieldset = document.createElement('fieldset');
    const priorityLegend = document.createElement('legend');
    priorityLegend.textContent = 'Priority';
    priorityFieldset.classList.add('fieldset');
    priorityFieldset.required = true;
    priorityFieldset.append(priorityLegend);

    // priority low radio
    const priorityLowLabel = document.createElement('label');
    const priorityLowRadio = document.createElement('input');

    priorityLowLabel.textContent = 'Low';
    priorityLowLabel.htmlFor = 'priority-low';

    priorityLowRadio.type = 'radio';
    priorityLowRadio.name = 'priority';
    priorityLowRadio.id = 'priority-low';
    priorityLowRadio.value = 'Low';
    priorityLowRadio.required = true;
    
    priorityLowLabel.append(priorityLowRadio);
    priorityFieldset.append(priorityLowLabel);    

    // priority medium radio
    const priorityMediumLabel = document.createElement('label');
    const priorityMediumRadio = document.createElement('input');

    priorityMediumLabel.textContent = 'Medium';
    priorityMediumLabel.htmlFor = 'priority-medium';

    priorityMediumRadio.type = 'radio';
    priorityMediumRadio.name = 'priority';
    priorityMediumRadio.id = 'priority-medium';
    priorityMediumRadio.value = 'Medium';

    priorityMediumLabel.append(priorityMediumRadio);
    priorityFieldset.append(priorityMediumLabel);

    // priority high radio
    const priorityHighLabel = document.createElement('label');
    const priorityHighRadio = document.createElement('input');

    priorityHighLabel.textContent = 'High';
    priorityHighLabel.htmlFor = 'priority-high';

    priorityHighRadio.type = 'radio';
    priorityHighRadio.name = 'priority';
    priorityHighRadio.id = 'priority-high';
    priorityHighRadio.value = 'High';

    priorityHighLabel.append(priorityHighRadio);
    priorityFieldset.append(priorityHighLabel);
    form.append(priorityFieldset);

    // form buttons
    const buttonDiv = document.createElement('div');
    const buttonAddTask = document.createElement('button');

    buttonDiv.classList.add('form-group');
    buttonAddTask.textContent = 'Save';
    buttonAddTask.type = 'submit';

    buttonDiv.append(buttonAddTask);
    form.append(buttonDiv);

    // append dialog header and form to dialog
    dialog.append(dialogHead);
    dialog.append(form);
    body.append(dialog);

    // event listeners
    dialogCloseBtn.addEventListener('click', () => {
        form.reset();
        dialog.close();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // get value of priority radios
        const priority = form.elements['priority'].value;
        // add new task
        addNewTask(titleInput.value, descriptionInput.value, dueDateInput.value, priority);
        dialog.close();
        form.reset();
        // clear content DOM and display new tasks
        renderTasks();
    });
}

const addNewTask = (title, description, dueDate, priority) => {
    myTasks.newTask(title, description, dueDate, priority);
}