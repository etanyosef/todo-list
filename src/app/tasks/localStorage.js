import { Tasks } from './myTasks.js';

export const myLocalStorage = {
    set(data) {
        localStorage.setItem('myTasks', JSON.stringify(data));
    },

    get() {
        const data = localStorage.getItem('myTasks');
        if (!data) {
            myLocalStorage.set(new Tasks());
        } else {
            return data ? JSON.parse(data) : null;
        }        
    }
}
