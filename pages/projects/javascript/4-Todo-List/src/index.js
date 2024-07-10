import './styles/main.scss';
import { initStorage, updateFilter, addTask, editTask } from './modules/storage';
import { renderProjects, createAddProjectInput, renderTasks, hideAllDropdowns, showForm, hideForm, getEditedTaskId } from './modules/render';

initStorage();
renderProjects();

let navbarToggleButton = document.getElementById('hamburger-menu-toggle');
let sidebar = document.getElementById('sidebar');
let fadeScreenDiv = document.getElementById('fade-screen-div');
let filterButtonContainer = document.querySelector('.filter-buttons-container');
let projectsList = document.getElementById('project-buttons-container');
let addProjectButton = document.getElementById('add-project-button');
let editProjectsButton = document.getElementById('edit-projects-button');
let sortByInput = document.getElementById('select-filter-option');
let addTaskButton = document.getElementById('add-task-button');
let formCompleteButton = document.getElementById('form-complete-button');
let formCancelButton = document.getElementById('form-cancel-button');

navbarToggleButton.addEventListener('click', e => {
    sidebar.classList.toggle('sidebar-open');
    fadeScreenDiv.classList.toggle('fade-screen');
})

fadeScreenDiv.addEventListener('click', e => {
    sidebar.classList.toggle('sidebar-open');
    fadeScreenDiv.classList.toggle('fade-screen');
})

filterButtonContainer.childNodes.forEach(element => {
    element.addEventListener('click', e => {
        updateFilter(element.id);
    })
})

addProjectButton.addEventListener('click', e => {
    createAddProjectInput(); 
})

editProjectsButton.addEventListener('click', e => {
    projectsList.classList.toggle('edit-mode');
})

addTaskButton.addEventListener('click', e => {
    showForm('add', null);
})

sortByInput.addEventListener('change', e => {
    renderTasks();
})

formCompleteButton.addEventListener('click', e => {
    if (formCompleteButton.innerHTML == 'Add') {
        let newTask = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            dueDate: document.getElementById('task-due-date').value,
            priority: document.getElementById('task-priority').value,
            project: document.getElementById('task-project').value,
        }
        addTask(newTask);
    }
    else{
        let newTask = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            dueDate: document.getElementById('task-due-date').value,
            priority: document.getElementById('task-priority').value,
            project: document.getElementById('task-project').value,
        }
        editTask(getEditedTaskId(), newTask);
    }
    renderTasks();
    hideForm();
});

formCancelButton.addEventListener('click', e => {
    hideForm();
})

//Hide all dropdowns if the user clicks elsewhere
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('more-icon') && e.target.parentElement.nodeName != 'LI') {
        hideAllDropdowns();
    }
})