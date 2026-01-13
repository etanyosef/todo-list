import { myTasks } from './myTasks.js';

export default function renderTasksToday() {
    // set page title
    const pageTitleDiv = document.querySelector('.page-title');
    const pageTitleH2 = document.createElement('h2');

    pageTitleDiv.textContent = '';  
    pageTitleH2.textContent = 'Today';

    pageTitleDiv.prepend(pageTitleH2);

    // 

    console.log(myTasks);
}