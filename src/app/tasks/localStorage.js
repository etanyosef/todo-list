export const myLocalStorage = {
    set(data) {
        localStorage.setItem('myTasks', JSON.stringify(data));
    },

    get() {
        const data = localStorage.getItem('myTasks');
        return data ? JSON.parse(data) : null;
    }
}

