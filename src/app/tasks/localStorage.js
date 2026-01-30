import { Project, Projects, Tasks } from './myTasks.js';

export const myLocalStorage = {
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    get(key) {
        const data = localStorage.getItem(key);
        if (!data) {
            myLocalStorage.set('myTasks', new Tasks());
            myLocalStorage.set('Projects', Projects);
        } else {
            return data ? JSON.parse(data) : null;
        }        
    }
}
