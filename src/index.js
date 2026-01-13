import './css/style.css';
import './css/reset.css';

import renderTasksToday from './app/tasks/today.js';
import renderTasksWeek from './app/tasks/week.js';

renderTasksToday();

const btnToday = document.getElementById('btn-today');
const btnWeek = document.getElementById('btn-week');
const btnMonth = document.getElementById('btn-month');

btnToday.addEventListener('click', () => {
    renderTasksToday();
});

btnWeek.addEventListener('click', () => {
    renderTasksWeek();
});

