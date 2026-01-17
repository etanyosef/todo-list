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

    editTask(title, description, dueDate, priority) {
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


class Project {
    constructor(name) {
        let id = 0;

        this.id = id;
        this.name = name;
        this.tasks = [];
    }

    addTask(title, description, dueDate, priority) {
        this.tasks.push(title, description, dueDate, priority);
    }
}

class Projects {
    constructor() {
        this.projects = [];        
    }

    newProject(name) {
        name = new Project(name);
        this.projects.push(name);
    }

    newTask(title, description, dueDate, priority) {
        this.projects.tasks.push({
            'title': title, 
            'description': description, 
            'dueDate': dueDate, 
            'priority': priority
        });
    }
}

console.log(myTasks);

const project1 = new Projects();
project1.newProject('project 1');
project1.projects[0].tasks.push('1');
console.log(project1);
console.log(project1.projects[0].tasks);

console.log(project1.projects.length);