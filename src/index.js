import './css/style.css';
import './css/reset.css';

import renderInbox, { renderMonthTasks, renderWeekTasks } from './js/renderTasks.js';

import { renderProjectMenu } from './js/renderProject.js';

// render projects menu and inbox tasks
renderProjectMenu();
renderInbox();

// task buttons
const btnInbox = document.getElementById('btn-inbox');
const btnWeek = document.getElementById('btn-week');
const btnMonth = document.getElementById('btn-month');

btnInbox.addEventListener('click', () => {
    renderInbox();
});

btnWeek.addEventListener('click', () => {
    renderWeekTasks();
});

btnMonth.addEventListener('click', () => {
    renderMonthTasks();
})

const sidebarBtn = document.querySelectorAll('.sidebar .nav-btn');
sidebarBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const menuLiAll = document.querySelectorAll('.sidebar li');
        menuLiAll.forEach(li => {
            li.classList.remove('active');
        });
        btn.parentNode.classList.add('active');
    })
});
