class Task {
    constructor(id, title, description, dueDate, priority, isDone) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }
}

export class Tasks {
    constructor() {
        this.tasks = [];
    }

    newTask(id, title, description, dueDate, priority, isDone) {
        const task = new Task(id, title, description, dueDate, priority, isDone);
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id != id);
    }

    updateTask({title, description, dueDate, priority}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getTask() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
        }
    }

    saveToLocalStorage() {
        try {
            const jsonData = JSON.stringify(this);
            localStorage.setItem('myTasks', jsonData);
        } catch(error) {
            console.error("Error saving to localStorage:", error);
        }
    }

    static loadFromLocalStorage() {
        try {
            const jsonData = localStorage.getItem('myTasks');
            if (!jsonData) {
                console.warn(`No data found in localStorage for key: 'myTasks'`);
                return null;
            }
            const data = JSON.parse(jsonData);
            
            // rehydrate into class instance;
            return data;
        } catch(error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
}

// initalize tasks
export const myTasks = new Tasks();
loadMyTasksFromLocalStorage();

function loadMyTasksFromLocalStorage() {    
    const data = Tasks.loadFromLocalStorage();
    if (!data) {
        myTasks.newTask(
            crypto.randomUUID(), 'Sample task', 'This is a description', '2026-01-27', 'low', false
        );
    } else {
        data.tasks.forEach(task => {
            myTasks.newTask(
                task.id, task.title, task.description, task.dueDate, task.priority, task.isDone
            );
        });
    }    
}

// initialize projects array
export const Projects = [];

export class Project {
    constructor(id, name, tasks) {
        this.id = id;
        this.name = name;
        this.tasks = [...tasks];
    }

    addTask(title, description, dueDate, priority) {
        this.tasks.push({
            id: crypto.randomUUID(),
            title: title, 
            description: description, 
            dueDate: dueDate, 
            priority: priority,
            isDone: false
        });
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id != id);
    }
}

// rehydrate Projects array
loadProjectsFromLocalStorage();
function loadProjectsFromLocalStorage() {
    try {
        const jsonData = localStorage.getItem('Projects');
        if(!jsonData) {
            console.warn("No data found in localStorage for key: 'Projects'.");
            return null;
        }
        const data = JSON.parse(jsonData);

        if (!data) {
            Projects.push(new Project('Project2'));
            Projects.push(new Project('project 1'));
        } else {
            data.forEach(project => {
                Projects.push( new Project(project.id, project.name, project.tasks) );
                const index = Projects.indexOf(project.id);
                console.log(project.id);
                console.log(index);
                console.log(Projects);
            });
        }
    } catch(error) {
        console.error("Error loading from localStorage:", error);
        return null;
    }
}
    
export const saveProjectsToLocalStorage = () => {
    try {
        const jsonData = JSON.stringify(Projects);
        localStorage.setItem('Projects', jsonData);
    } catch(error) {
        console.error("Error saving Projects to localStorage:", error);
    }
}

// Projects.push(new Project('Project2'));
// Projects.push(new Project('project 1'));
// Projects[0].addTask('title', 'descrip', '2026-02-1', 'low');
// Projects[0].addTask('title2', 'descrip2', '2026-02-2', 'medium');
// console.log(Projects);

// console.log(project1.projects[0].newTask('aw', 'aw', 'anytime', 'low'));
