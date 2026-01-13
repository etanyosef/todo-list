export default function renderTasksWeek() {
    const pageTitleDiv = document.querySelector('.page-title');
    pageTitleDiv.textContent = '';
    
    const pageTitleH2 = document.createElement('h2');
    pageTitleH2.textContent = 'Week';

    pageTitleDiv.prepend(pageTitleH2);
}