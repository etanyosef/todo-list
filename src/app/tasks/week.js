export default function renderTasksWeek() {
    const mainContent = document.querySelector('.content');
    // clear and set page title
    const pageTitleDiv = document.querySelector('.page-title');

    const pageTitleH2 = document.createElement('h2');
    
    pageTitleDiv.textContent = '';
    pageTitleH2.textContent = 'Week';
    mainContent.textContent = '';

    pageTitleDiv.prepend(pageTitleH2);
}