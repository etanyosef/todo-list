export default function renderTasks() {
    console.log('aw');
    const content = document.querySelector('.content');
    
    const pageTitle = document.createElement('h2');
    pageTitle.textContent = 'Tasks';

    content.append(pageTitle);

    
}