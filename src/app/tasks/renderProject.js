import { Projects } from "./myTasks.js";

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
            console.log(project.name);
        });
    });
}

const renderProjectTasks = () => {
    
}