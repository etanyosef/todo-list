import { myTasks, saveProjectsToLocalStorage, Tasks } from './myTasks.js';
import { format, isPast, isThisMonth, isThisWeek, isToday, toDate } from 'date-fns';

const body = document.querySelector('body');
const dialog = document.querySelector('dialog');
const form = document.createElement('form');
const mainContent = document.querySelector('.content');
const pageTitleDiv = document.querySelector('.page-title');
const pageTitleH2 = document.createElement('h2');

export default function renderInbox() {    
    // clear and set page title
    pageTitleDiv.textContent = '';
    pageTitleH2.textContent = 'Inbox';

    pageTitleDiv.prepend(pageTitleH2);

    const btnToday = document.querySelector('#btn-inbox');
    btnToday.parentNode.classList.add('active');

    renderTasks(myTasks); 
}

export const renderWeekTasks = () => {
    pageTitleH2.textContent = 'Week';

    const thisWeekTasks = new Tasks();
    myTasks.tasks.forEach(task => {
        if (isThisWeek(task.dueDate)) {
            thisWeekTasks.tasks.push(task);
        }
    });
    renderTasks(thisWeekTasks);
}

export const renderMonthTasks = () => {
    pageTitleH2.textContent = 'Month';

    const thisMonthTasks = new Tasks();
    myTasks.tasks.forEach(task => {
        if (isThisMonth(task.dueDate)) {
            thisMonthTasks.tasks.push(task);
        }
    });
    renderTasks(thisMonthTasks);
}

export const renderTasks = (project) => {
    // clear content DOM
    mainContent.textContent = '';
    // display tasks to DOM
    const taskContainerDiv = document.createElement('div');
    
    taskContainerDiv.classList.add('task-container');    

    project.tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        const taskTitleSpan = document.createElement('span');
        const taskTitle = document.createElement('span');
        const taskDescription = document.createElement('span');
        const taskDueDate = document.createElement('span');
        const taskPriority = document.createElement('span');    
        const buttonsSpan = document.createElement('span');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const doneBtn = document.createElement('button');
        const svgEditCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-edit-outline</title><path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" /></svg>';
        const svgDeleteCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';
        const svgCheckboxCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-blank-outline</title><path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" /></svg>';
        const svgDoneCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked</title><path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg>';

        taskDiv.classList.add('task');
        taskTitleSpan.classList.add('title-span');
        taskTitle.classList.add('title');
        taskDescription.classList.add('description');
        taskDueDate.classList.add('due-date');
        taskPriority.classList.add('priority', task.priority);
        buttonsSpan.classList.add('task-action');
        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');
        
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = format(new Date(task.dueDate), 'MMM do, yyyy');
        taskPriority.textContent = task.priority;
        editBtn.innerHTML = svgEditCode;
        deleteBtn.innerHTML = svgDeleteCode;
        
        taskTitleSpan.append(doneBtn);
        taskTitleSpan.append(taskTitle);
        taskDiv.append(taskTitleSpan);
        taskDiv.append(taskDescription);
        taskDiv.append(taskDueDate);
        taskDiv.append(taskPriority);
        buttonsSpan.append(editBtn);
        buttonsSpan.append(deleteBtn);
        taskDiv.append(buttonsSpan);

        // check task if it's today or past
        if (isToday(toDate(task.dueDate))) {
            taskDueDate.classList.add('today');
        } else if (isPast(task.dueDate)) {
            taskDueDate.classList.add('past');
        }

        // check if the task is done
        if (task.isDone == false) {
            doneBtn.innerHTML = svgCheckboxCode;
            taskContainerDiv.prepend(taskDiv);
        } else {
            taskDiv.classList.add('is-done');
            doneBtn.innerHTML = svgDoneCode;
            taskContainerDiv.append(taskDiv);
        }

        doneBtn.addEventListener('click', () => {
            toggleDoneTask(project, task);
        });

        editBtn.addEventListener('click', () => {
            renderEditTask(task, project);
        });

        deleteBtn.addEventListener('click', () => {
            deleteTask(project, task);
        });  
    });

    // add new task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('btn-new-task');
    addTaskBtn.textContent = 'New task';

    addTaskBtn.addEventListener('click', () => {
        renderAddTask(project);
    });

    taskContainerDiv.prepend(addTaskBtn);

    mainContent.append(taskContainerDiv);
}

const createTaskDialog = () => {
    // dialog header
    const dialogHead = document.createElement('div');
    const dialogTitle = document.createElement('h2');
    const dialogCloseBtn = document.createElement('button');
    const svgCloseCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>';

    dialogHead.classList.add('dialog-header');

    dialogTitle.textContent = 'New Task';
    dialogCloseBtn.innerHTML = svgCloseCode;

    dialogHead.append(dialogTitle);
    dialogHead.append(dialogCloseBtn);    

    // task title label and input
    const titleDiv = document.createElement('div');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');

    titleDiv.classList.add('form-group');
    titleLabel.textContent = 'Title';
    titleLabel.htmlFor = 'task-title';
    titleInput.type = 'text';
    titleInput.id = 'task-title';
    titleInput.name = 'title';
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
    descriptionInput.name = 'description';
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
    dueDateInput.name = 'dueDate';
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
    priorityLowRadio.value = 'low';
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
    priorityMediumRadio.value = 'medium';

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
    priorityHighRadio.value = 'high';

    priorityHighLabel.append(priorityHighRadio);
    priorityFieldset.append(priorityHighLabel);
    form.append(priorityFieldset);

    // append form button div
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('form-buttons');
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
}

const renderAddTask = (project) => {
    dialog.textContent = '';
    form.textContent = '';
    
    createTaskDialog();

    const buttonDiv = document.querySelector('form .form-buttons');
    const buttonAddTask = document.createElement('button');

    buttonDiv.textContent = '';
    buttonAddTask.textContent = 'Add';
    buttonAddTask.id = 'add-btn';
    buttonAddTask.type = 'submit';

    buttonDiv.append(buttonAddTask);

    dialog.showModal();

    buttonAddTask.addEventListener('click', (e) => {
        e.preventDefault();
        setNewTask(project);                
    });
}

const renderEditTask = (task, project) => {
    dialog.textContent = '';
    form.textContent = '';

    createTaskDialog();

    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');
    const dueDate = document.getElementById('task-due-date');
    const priority = document.querySelector(`#priority-${task.priority}`);

    // set the values to DOM inputs
    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate;
    if (priority != null) {
        priority.setAttribute('checked', true);
    }    

    // clear the form-buttons and display the save button for edit
    const buttonDiv = document.querySelector('form .form-buttons');
    const buttonUpdateTask = document.createElement('button');

    buttonDiv.textContent = '';
    buttonUpdateTask.textContent = 'Save';
    buttonUpdateTask.id = 'save-btn';
    buttonUpdateTask.type = 'submit';

    buttonDiv.append(buttonUpdateTask);

    dialog.showModal();

    buttonUpdateTask.addEventListener('click', (e) => {
        e.preventDefault();               
        updateTask(project, task);
    });
}

const renderDefaultTasks = () => {
    const pageTitle = document.querySelector('.page-title h2');
    if (pageTitle.textContent == 'Week') {                
        renderWeekTasks();
    } else if (pageTitle.textContent == 'Month') {
        renderMonthTasks();
    } else {
        renderTasks(myTasks);
    }
}

const validateForm = () => {
    if (form.checkValidity() == false) {
        const errorMsg = document.querySelector('form .error-message');
        if (errorMsg !== null) {
            errorMsg.textContent = 'Please fill up all the requried fields.';
            form.prepend(errorMsg);
        } else {
            const errorMsgPara = document.createElement('p');
            errorMsgPara.textContent = 'Please fill up all the requried fields.';
            errorMsgPara.classList.add('error-message');
            form.prepend(errorMsgPara);
        }   
        return 1;   
    } 
}

function setNewTask(project) {
    if (validateForm() == 1) {
            return;
    }
    // get the input data from form
    const newTaskData = new FormData(form);
    const data = Object.fromEntries(newTaskData);

    if (project.name != undefined) {
        const currentProject = project;
        currentProject.addTask(data.title, data.description, data.dueDate, data.priority);
        saveProjectsToLocalStorage();
        dialog.close();
        form.reset();
        renderTasks(currentProject);
    } else {
        // add new task
        myTasks.newTask(
            crypto.randomUUID(), data.title, data.description, data.dueDate, data.priority, false
        );
        // save tasks to localStorage
        myTasks.saveToLocalStorage();
        // close dialog and clear form
        dialog.close();
        form.reset();
        // clear content DOM and display new tasks
        renderDefaultTasks();
    }
}

function toggleDoneTask(project, task) {
    if (project.name != undefined) {
        task.isDone = !task.isDone;
        saveProjectsToLocalStorage();
        renderTasks(project);
    } else {
        task.toggleDone();
        renderDefaultTasks();
        myTasks.saveToLocalStorage();
    }
}

function deleteTask(project, task) {
    // check if its in a project
    if (project.name != undefined) {
        project.deleteTask(task.id);
        saveProjectsToLocalStorage();
        renderTasks(project);
    } else {
        myTasks.deleteTask(task.id);
        myTasks.saveToLocalStorage();
        renderDefaultTasks();
    }
}

function updateTask(project, task) {
    if (validateForm() == 1) {
        return;
    }
        
    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');
    const dueDate = document.getElementById('task-due-date');
    const selectedPriority = document.querySelector('input[name="priority"]:checked').value;
        
    if (project.name != undefined)  {
        const currentProject = project;

        task.title = title.value;
        task.description = description.value;
        task.dueDate = dueDate.value;
        task.priority = selectedPriority;

        saveProjectsToLocalStorage();
        dialog.close();
        form.reset();
        renderTasks(currentProject);
    } else {
        task.title = title.value;
        task.description = description.value;
        task.dueDate = dueDate.value;
        task.priority = selectedPriority;

        myTasks.saveToLocalStorage();
        dialog.close();
        form.reset();
        renderDefaultTasks();
    }
}