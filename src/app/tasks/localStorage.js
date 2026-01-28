import { myTasks, Projects } from './myTasks.js';


export const myLocalStorage = {
    set(data) {
        localStorage.setItem('myTasks', JSON.stringify(data));
    },

    get() {
        const data = localStorage.getItem('myTasks');
        return data ? JSON.parse(data) : null;
    }
}

export const setTasksToStorage = (myTasks) => {
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
}

export const getTasksFromStorage = () => {
    const storageMyTasks = JSON.parse(localStorage.getItem('myTasks'));
    return storageMyTasks;
}

localStorage.setItem('Projects', JSON.stringify(Projects));



const storageProjects = JSON.parse(localStorage.getItem('Projects'));
console.log(storageProjects);