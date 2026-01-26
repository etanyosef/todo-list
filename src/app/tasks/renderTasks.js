import { myTasks } from './myTasks.js';

const body = document.querySelector('body');
const dialog = document.querySelector('dialog');
const form = document.createElement('form');
const mainContent = document.querySelector('.content');

export default function renderTasksToday() {    
    // clear and set page title
    const pageTitleDiv = document.querySelector('.page-title');

    const pageTitleH2 = document.createElement('h2');

    pageTitleDiv.textContent = '';  
    pageTitleH2.textContent = 'Today';
    mainContent.textContent = '';

    pageTitleDiv.prepend(pageTitleH2);

    renderToday(); 
}

export const renderTasks = (project) => {
    // clear content DOM
    mainContent.textContent = '';
    // display tasks to DOM
    const taskContainerDiv = document.createElement('div');
    
    taskContainerDiv.classList.add('task-container');    

    project.tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
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
        const svgDoneCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>';

        taskDiv.classList.add('task');
        taskTitle.classList.add('title');
        taskDescription.classList.add('description');
        taskDueDate.classList.add('due-date');
        taskPriority.classList.add('priority', task.priority);
        buttonsSpan.classList.add('task-action');
        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');
        
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = task.priority;
        doneBtn.innerHTML = svgDoneCode;
        editBtn.innerHTML = svgEditCode;
        deleteBtn.innerHTML = svgDeleteCode;

        taskDiv.append(taskTitle);
        taskDiv.append(taskDescription);
        taskDiv.append(taskDueDate);
        taskDiv.append(taskPriority);
        buttonsSpan.append(doneBtn);
        buttonsSpan.append(editBtn);
        buttonsSpan.append(deleteBtn);
        taskDiv.append(buttonsSpan);

        if (task.isDone == false) {
            taskContainerDiv.prepend(taskDiv);
        } else {
            taskDiv.classList.add('is-done');
            taskContainerDiv.append(taskDiv);
        }

        doneBtn.addEventListener('click', ()=> {
            if (project.name != undefined) {
                task.isDone = !task.isDone;
                renderTasks(project);
            } else {
                task.toggleDone();
                renderToday();
            }
        });

        editBtn.addEventListener('click', () => {
            renderEditTask(task, project);
        });

        deleteBtn.addEventListener('click', () => {
            // check if its in a project
            if (project.name != undefined) {
                project.deleteTask(task.id);
                renderTasks(project);
            } else {
                myTasks.deleteTask(task.id);
                renderToday();
            }
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

        if (validateForm() == 1) {
            return;
        }

        // get the input data from form
        const newTaskData = new FormData(form);
        const data = Object.fromEntries(newTaskData);

        if (project.name != undefined) {
            const currentProject = project;

            currentProject.addTask(data.title, data.description, data.dueDate, data.priority);
            
            dialog.close();
            form.reset();
            renderTasks(currentProject);
        } else {
            // add new task and close dialog and clear form
            myTasks.newTask(data.title, data.description, data.dueDate, data.priority);
            dialog.close();
            form.reset();
            // clear content DOM and display new tasks
            renderTasks(myTasks);
        }        
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
    const buttonAddTask = document.createElement('button');

    buttonDiv.textContent = '';
    buttonAddTask.textContent = 'Save';
    buttonAddTask.id = 'save-btn';
    buttonAddTask.type = 'submit';

    buttonDiv.append(buttonAddTask);

    dialog.showModal();

    buttonAddTask.addEventListener('click', (e) => {
        e.preventDefault();

        if (validateForm() == 1) {
            return;
        }
        
        const selectedPriority = document.querySelector('input[name="priority"]:checked').value;
        
        if (project.name != undefined)  {
            const currentProject = project;
            task.title = title.value;
            task.description = description.value;
            task.dueDate = dueDate.value;
            task.priority = selectedPriority;

            dialog.close();
            form.reset();
            renderTasks(currentProject);
        } else {
            task.title = title.value;
            task.description = description.value;
            task.dueDate = dueDate.value;
            task.priority = selectedPriority;

            dialog.close();
            form.reset();
            renderTasks(myTasks);
        }       
        
    });
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

const renderToday = () => {
    const btnToday = document.querySelector('#btn-today');
    btnToday.parentNode.classList.add('active');
    renderTasks(myTasks);
}