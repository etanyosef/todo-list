class Task {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }
}

export class Tasks {
    constructor() {
        this.tasks = [];
    }

    newTask(title, description, dueDate, priority, isDone) {
        const task = new Task(title, description, dueDate, priority, isDone);
        this.tasks.push(task);
        return ({title, description, dueDate, priority, isDone});
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
}

export const myTasks = new Tasks();
// myTasks.newTask('Sample Task', 'This is a sample task.', '2026-01-27', 'low');
// myTasks.newTask('awaw2', 'wawaawewe2', '2026-01-28', 'high');
// myTasks.newTask('awaw2', 'wawaawewe2', '2026-01-29', 'medium');

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
Projects[0].addTask('title', 'descrip', '2026-02-01', 'low');
Projects[0].addTask('title2', 'descrip2', '2026-02-02', 'medium');
console.log(Projects);


