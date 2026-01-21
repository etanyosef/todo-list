class Task {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Tasks {
    constructor() {
        this.tasks = [];
    }

    newTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority);
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
}

export const myTasks = new Tasks();
myTasks.newTask('awaw', 'wawaawewe', 'karun', 'low');
myTasks.newTask('awaw2', 'wawaawewe2', 'karun', 'high');
myTasks.newTask('awaw2', 'wawaawewe2', 'karun', 'medium');

export const Projects = [];
class Project {
    constructor(name) {
        this.id = crypto.randomUUID;
        this.name = name;
        this.tasks = [];
    }

    addTask(title, description, dueDate, priority) {
        this.tasks.push({
            title: title, 
            description: description, 
            dueDate: dueDate, 
            priority: priority
        });
    }
}

console.log(myTasks);

Projects.push(new Project('Project2'));
Projects.push(new Project('project 1'));
Projects[0].addTask('title', 'descrip', 'anytime', 'low');
Projects[0].addTask('title2', 'descrip2', 'anytime2', 'medium');
console.log(Projects);

// console.log(project1.projects[0].newTask('aw', 'aw', 'anytime', 'low'));
