class Task {
    constructor(title, description, dueDate, priority) {
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
}

export const myTasks = new Tasks();
myTasks.newTask('awaw', 'wawaawewe', 'karun', 'ambot');
myTasks.newTask('awaw2', 'wawaawewe2', 'karun', 'ambot');

