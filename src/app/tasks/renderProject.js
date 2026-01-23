import { Projects, Project } from "./myTasks.js";

import { renderTasks } from "./renderTasks.js";

const mainContent = document.querySelector('.content');
const pageTitleDiv = document.querySelector('.page-title');
const pageTitleH2 = document.createElement('h2');

export const renderProjectMenu = () => {
    const projectsMenuList = document.querySelector('.projects .sidemenu');
    projectsMenuList.textContent = '';
    const projectLi = document.createElement('li');
    const projectBtn = document.createElement('button');

    projectBtn.classList.add('btn-new-project');

    Projects.forEach(project => {
        const projectLi = document.createElement('li');
        const newProjectBtn = document.createElement('button');
        const deleteProjectBtn = document.createElement('button');

        newProjectBtn.textContent = project.name;
        newProjectBtn.classList.add('add-btn');
        deleteProjectBtn.textContent = 'x';
        deleteProjectBtn.classList.add('delete-btn');

        projectLi.prepend(newProjectBtn);
        projectLi.append(deleteProjectBtn);
        projectsMenuList.prepend(projectLi);

        newProjectBtn.addEventListener('click', () => {
            pageTitleDiv.textContent = '';  
            pageTitleH2.textContent = `Project - ${project.name}`;
            mainContent.textContent = '';

            pageTitleDiv.prepend(pageTitleH2);
            renderTasks(project);

            // remove sidebar active class if it exist 
            // and add active class on button clicked
            const sidebarActiveBtn = document.querySelector('.sidemenu .active');
            if (sidebarActiveBtn != null) {
                sidebarActiveBtn.classList.remove('active');
            }
            projectLi.classList.add('active');
        });
    });

    projectLi.append(projectBtn);
    projectsMenuList.prepend(projectLi);

    projectBtn.textContent = '+ New Project';
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

