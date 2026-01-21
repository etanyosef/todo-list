import { Projects } from "./myTasks.js";

import { renderTasks } from "./renderTasks.js";

const mainContent = document.querySelector('.content');
const pageTitleDiv = document.querySelector('.page-title');
const pageTitleH2 = document.createElement('h2');

export const renderProjectMenu = () => {
    const projectsMenuList = document.querySelector('.projects .sidemenu');

    const projectLi = document.createElement('li');
    const projectBtn = document.createElement('button');

    projectBtn.textContent = '+New Project';

    projectLi.append(projectBtn);
    projectsMenuList.append(projectLi);

    Projects.forEach(project => {
        const projectLi = document.createElement('li');
        const projectBtn = document.createElement('button');

        projectBtn.textContent = project.name;

        projectLi.append(projectBtn);
        projectsMenuList.append(projectLi);

        projectBtn.addEventListener('click', () => {
            pageTitleDiv.textContent = '';  
            pageTitleH2.textContent = `Project - ${project.name}`;
            mainContent.textContent = '';

            pageTitleDiv.prepend(pageTitleH2);
            renderTasks(project);
        });
    });
}

