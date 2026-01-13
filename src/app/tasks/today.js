import { myTasks } from './myTasks.js';

export default function renderTasksToday() {
    // set page title
    const pageTitleDiv = document.querySelector('.page-title');
    const pageTitleH2 = document.createElement('h2');

    pageTitleDiv.textContent = '';  
    pageTitleH2.textContent = 'Today';

    pageTitleDiv.prepend(pageTitleH2);

    // display tasks to DOM
    const mainContent = document.querySelector('.content');
    const taskContainerDiv = document.createElement('div');
    
    taskContainerDiv.classList.add('task-container');    

    myTasks.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('span');
        const taskDescription = document.createElement('span');
        const taskDueDate = document.createElement('span');
        const taskPriority = document.createElement('span');    
        
        taskDiv.classList.add('task');
        
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = task.priority;

        taskDiv.append(taskTitle);
        taskDiv.append(taskDescription);
        taskDiv.append(taskDueDate);
        taskDiv.append(taskPriority);

        taskContainerDiv.append(taskDiv);
    });

    mainContent.append(taskContainerDiv);

    console.log(myTasks);
}