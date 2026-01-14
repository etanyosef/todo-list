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
}

export const myTasks = new Tasks();
myTasks.newTask('awaw', 'wawaawewe', 'karun', 'ambot');
myTasks.newTask('awaw2', 'wawaawewe2', 'karun', 'ambot');

