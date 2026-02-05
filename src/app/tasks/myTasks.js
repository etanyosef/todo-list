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

    saveToLocalStorage(key) {
        try {
            const jsonData = JSON.stringify(this);
            localStorage.setItem(key, jsonData);
        } catch(error) {
            console.error("Error saving to localStorage:", error);
        }
    }

    static loadFromLocalStorage(myTasks) {
        try {
            const jsonData = localStorage.getItem(myTasks);
            if (!jsonData) {
                console.warn(`No data found in localStorage for key: ${myTasks}`);
                return null;
            }
            const data = JSON.parse(jsonData);
            
            // rehydrate into class instance;
            return data;
            // return new Tasks(
            //     data.id, data.title, data.description, data.dueDate, data.priority, data.isDone
            // );
        } catch(error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
}

// initalize tasks
export const myTasks = new Tasks();

const loadMyTasksFromLocalStorage = () => {    
    const data = Tasks.loadFromLocalStorage('myTasks');
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
loadMyTasksFromLocalStorage();

export const Projects = [];
export class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
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

console.log(myTasks);

Projects.push(new Project('Project2'));
Projects.push(new Project('project 1'));
Projects[0].addTask('title', 'descrip', '2026-02-1', 'low');
Projects[0].addTask('title2', 'descrip2', '2026-02-2', 'medium');
console.log(Projects);

// console.log(project1.projects[0].newTask('aw', 'aw', 'anytime', 'low'));
