import { Projects, Project, myTasks } from "./myTasks.js";

import renderTasksToday from "./renderTasks.js";
import { renderTasks } from "./renderTasks.js";

const mainContent = document.querySelector('.content');
const pageTitleDiv = document.querySelector('.page-title');
const pageTitleH2 = document.createElement('h2');

export const renderProjectMenu = () => {
    const projectsMenuList = document.querySelector('.projects .sidemenu');
    projectsMenuList.textContent = '';

    const projectLi = document.createElement('li');
    const projectBtn = document.createElement('button');
    const newProjectSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder-plus</title><path d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.12 13.3 20.1 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg>';
    const newProjectIcon = document.createElement('span');

    projectBtn.classList.add('btn-new-project');

    Projects.forEach(project => {
        const projectLi = document.createElement('li');
        const projectBtn = document.createElement('button');
        const deleteProjectBtn = document.createElement('button');
        const svgDeleteCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';
        
        projectBtn.textContent = project.name;
        projectBtn.classList.add('nav-btn');
        deleteProjectBtn.innerHTML = svgDeleteCode;
        deleteProjectBtn.classList.add('delete-btn');

        projectLi.prepend(projectBtn);
        projectLi.append(deleteProjectBtn);
        projectsMenuList.prepend(projectLi);

        projectBtn.addEventListener('click', () => {
            pageTitleDiv.textContent = '';  
            pageTitleH2.textContent = `${project.name}`;

            pageTitleDiv.prepend(pageTitleH2);
            renderTasks(project);

            // remove sidebar active class if it exist 
            // and add active class on button clicked
            const sidebarActiveBtn = document.querySelector('.sidebar .active');
            if (sidebarActiveBtn != null) {
                sidebarActiveBtn.classList.remove('active');
            }
            projectLi.classList.add('active');
        });

        deleteProjectBtn.addEventListener('click', () => {
            // get index of the project 
            // and splice it from Project array
            const index = Projects.indexOf(project);
            Projects.splice(index, 1);

            renderProjectMenu();
            renderTasksToday();
        });
    });
    
    newProjectIcon.innerHTML = newProjectSvg;
    projectLi.append(projectBtn);
    projectsMenuList.prepend(projectLi);

    projectBtn.textContent = 'New Project';
    projectBtn.prepend(newProjectIcon);
    projectBtn.addEventListener('click', () => {
        renderAddProjectDialog();
    });
}

const renderAddProjectDialog = () => {
    const dialog = document.querySelector('dialog');

    dialog.textContent = '';

    const dialogHead = document.createElement('div');
    const dialogTitle = document.createElement('h2');
    const dialogCloseBtn = document.createElement('button');

    dialogHead.classList.add('dialog-header');
    dialogTitle.textContent = 'New Project';
    dialogCloseBtn.textContent = 'X';

    dialogHead.append(dialogTitle);
    dialogHead.append(dialogCloseBtn);   

    const newProjectForm = document.createElement('form');
    const newProjectDiv = document.createElement('div');
    const projectNameLabel = document.createElement('label');
    const projectNameInput = document.createElement('input');
    const buttonDiv = document.createElement('div');
    const newProjectSubmitBtn = document.createElement('button');

    newProjectDiv.classList.add('form-group');

    projectNameLabel.textContent = 'Project Name';    
    projectNameLabel.htmlFor = 'project-name';

    projectNameInput.type = 'text';
    projectNameInput.id = 'project-name';
    projectNameInput.name = 'projectName';
    projectNameInput.required = true;

    buttonDiv.classList.add('form-buttons');
    newProjectSubmitBtn.textContent = 'Add';
    newProjectSubmitBtn.type = 'submit';

    buttonDiv.append(newProjectSubmitBtn);
    newProjectDiv.append(projectNameLabel, projectNameInput);
    newProjectForm.append(newProjectDiv, buttonDiv);
    dialog.append(dialogHead, newProjectForm);
    dialog.showModal();
    // set focus on textbox
    projectNameInput.focus();

    dialogCloseBtn.addEventListener('click', () => {
        newProjectForm.reset();
        dialog.close();
    });

    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        Projects.push(new Project(projectNameInput.value));
        console.log(Projects);

        newProjectForm.reset();
        dialog.close();
        renderProjectMenu();
    });
}

