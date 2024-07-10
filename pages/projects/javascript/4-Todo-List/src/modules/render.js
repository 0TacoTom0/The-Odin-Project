import { updateFilter, getCurrentFilter, getProjectsArray, addProject, removeProject, getTaskArray, setTaskId, completeTaskToggle, removeTask } from "./storage";
import { sortAscending, sortDescending, sortByPriority } from "./sort";
import { filterTasks } from "./filter";
import { format } from "date-fns";

//Render Project Functions

export function renderProjects() {
    let projectsList = document.getElementById('project-buttons-container');
    let projectsArray = getProjectsArray();

    document.getElementById('project-buttons-container').innerHTML = '';
    for (let i = 0; i < projectsArray.length; i++) {
        projectsList.insertAdjacentHTML('beforeend', `
            <button id='${i}'>
                <p>${projectsArray[i]}</p>
                <p id='task-counter'>0</p>
                <a id='deleteProjectButton'></a>
            </button>`
        );

        if (getCurrentFilter() == i) {
            document.getElementById(i).classList.add('active-button');
        }

        document.getElementById(i).addEventListener('click', e => {
            if (!projectsList.classList.contains('edit-mode')) {
                updateFilter(i);
            }
        })
    }

    if (projectsArray.length == 0) {
        projectsList.insertAdjacentHTML('beforeend', `
            <p id='no-projects-p'>You have no projects!</p>`
        );
    }

    document.querySelectorAll('#deleteProjectButton').forEach((element) => element.addEventListener('click', e => {
        removeProject(element.parentElement.id);
    }));
    updateProjectTaskCounter();
}

export function updateProjectTaskCounter() {
    let counterP = document.querySelectorAll('#task-counter');
    counterP.forEach((element) => {
        let projectFilters = {
            'all-tasks-filter-button': 'All Tasks',
            'today-filter-button': 'Today',
            'this-week-filter-button': 'This Week',
            'overdue-filter-button': 'Overdue'
        };
    
        let currentElementId = projectFilters[element.parentElement.id];
    
        //if 'currentElementId' is undefined then the id must be a project number
        if (currentElementId == undefined) {
            element.innerHTML = filterTasks(getTaskArray(), Number(element.parentElement.id)).length;
        } else {
            element.innerHTML = filterTasks(getTaskArray(), currentElementId).length;
        }
    });
}

export function createAddProjectInput() {
    let projectsList = document.getElementById('project-buttons-container');
    projectsList.classList.remove('edit-mode');

    if (document.getElementById('no-projects-p')) {
        projectsList.removeChild(document.getElementById('no-projects-p'));
    }

    projectsList.insertAdjacentHTML('beforeend', `
        <button class='new-project-div'>
            <input id='project-text-input' type='text' placeholder='Project name'></input>
        </button>`
    );

    let textInput = document.getElementById('project-text-input');
    textInput.focus();

    textInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            textInput.blur();
        }
    });

    textInput.addEventListener('blur', e => {
        addProject(textInput.value);
        document.querySelector('.new-project-div').remove();
        renderProjects();
    });
}

export function updateFilterHeader(name) {
    document.getElementById('current-filter-h3').innerHTML = name;
}

export function updateActiveButtonElement(name){
    if (document.querySelector('.active-button') !== null) {
        document.querySelector('.active-button').classList.remove('active-button');
    }
    document.getElementById(name).classList.add('active-button');
}

//Render Tasks Functions

export function renderTasks() {
    setTaskId();
    let taskArray = getTaskArray();
    let sortBy = document.getElementById('select-filter-option').value;
    let currentFilter = getCurrentFilter();
    let tasksContainer = document.querySelector('.tasks-container');

    //Sort tasks
    
    if (sortBy == 'due-date-ascending') {
        taskArray = sortAscending(taskArray);
    } else if (sortBy == 'due-date-descending') {
        taskArray = sortDescending(taskArray);
    } else if (sortBy == 'priority') {
        taskArray = sortByPriority(taskArray);
    }

    //Filter tasks

    taskArray = filterTasks(taskArray, currentFilter);

    //Render tasks

    tasksContainer.innerHTML = '';
    for (let i = 0; i < taskArray.length; i++) {
        tasksContainer.insertAdjacentHTML('beforeend', `
            <div class="task ${taskArray[i].completed ? 'task-completed' : ''}" id='${taskArray[i].id}'>
                <div class="task-title-div">
                    <input type="checkbox" id='${taskArray[i].id}-checkbox' ${taskArray[i].completed ? 'checked' : ''}>
                    <div>
                        <p>${taskArray[i].title}</p>
                        <p class="task-description-p">${taskArray[i].description}</p>
                        <p class="task-due-date-p">${format(new Date(taskArray[i].dueDate), 'dd/MM/yyyy p')}</p>
                    </div>
                </div>
                <div class="task-info-div">
                    <p class='priority-p'>Priority: <span>${taskArray[i].priority}</span></p>
                    <p>${format(new Date(taskArray[i].dueDate), 'dd/MM/yyyy p')}</p>
                    <button class="more-icon"></button>
                    <div class="dropdown hide">
                        <ul>
                            <li><button id='${taskArray[i].id}-details-button'>Details</button></li>
                            <hr>
                            <li><button id='${taskArray[i].id}-edit-button'>Edit</button></li>
                            <hr>
                            <li><button id='${taskArray[i].id}-delete-button'>Delete</button></li>
                        </ul>
                    </div>
                </div>
            </div>`
        );

        let priorityColours = {
            'High': '#FF3131',
            'Medium': '#39FF14',
            'Low': '#1F51FF'
        };
        document.getElementById(taskArray[i].id).querySelector('span').style.color = priorityColours[taskArray[i].priority];

        let checkboxInput = document.getElementById(`${taskArray[i].id}-checkbox`);
        checkboxInput.addEventListener('click', function() {
            completeTaskToggle(taskArray[i].id);
        })

        let moreButton = document.getElementById(taskArray[i].id).querySelector('.more-icon');
        let dropdownElement = document.getElementById(taskArray[i].id).querySelector('.dropdown');
        moreButton.addEventListener('click', function() {
            document.querySelectorAll('.dropdown').forEach((element) => {
                if (element != dropdownElement) {
                    element.classList.add('hide');
                }
            });
            dropdownElement.classList.toggle('hide');
        })

        document.getElementById(`${taskArray[i].id}-details-button`).addEventListener('click', function() {
            renderDetails(taskArray[i]);
            hideAllDropdowns();
        })

        document.getElementById(`${taskArray[i].id}-edit-button`).addEventListener('click', function() {
            showForm('edit', taskArray[i].id);
            hideAllDropdowns();
        })

        document.getElementById(`${taskArray[i].id}-delete-button`).addEventListener('click', function() {
            removeTask(taskArray[i].id);
        })
    }

    if (taskArray.length == 0) {
        tasksContainer.insertAdjacentHTML('beforeend', `
            <p class='no-tasks-p'>You currently have no tasks</p>`
        );
    }
    updateProjectTaskCounter();
}

export function hideAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach((element) => {
        element.classList.add('hide')
    });
}

function renderDetails(task) {
    document.body.insertAdjacentHTML('beforeend', `
        <div class='background-fade'>
            <div class='details-container'>
            <div class='details-flex-container'>
                <div class='priority-and-date-container'>
                    <p>Priority: <span>${task.priority}</span></p>
                    <hr>
                    <p>${format(new Date(task.dueDate), 'dd/MM/yyyy p')}</p>
                </div>
                <h3>${task.title}</h3>
                <p class='description-content-p'>${task.description}</p>
            </div>
            <button id='close-details'>Close</button>
            </div>
        </div>`
    );

    let priorityColours = {
        'High': '#FF3131',
        'Medium': '#39FF14',
        'Low': '#1F51FF'
    };
    document.querySelector('.background-fade').querySelector('span').style.color = priorityColours[task.priority];

    document.getElementById('close-details').addEventListener('click', function () {
        document.querySelector('.background-fade').remove();
    })
}

//Form  Functions
let editTaskId = '';

export function showForm(mode, taskId) {
    let form = document.getElementById('add-task-form');
    let completeButton = document.getElementById('form-complete-button');
    let projectSelectElement = document.getElementById('task-project');
    let projectsArray = getProjectsArray();

    projectSelectElement.innerHTML = '';
    projectSelectElement.insertAdjacentHTML('beforeend', `<option value="None">None</option>`);
    for (const project of projectsArray) {
        projectSelectElement.insertAdjacentHTML('beforeend', `
            <option value='${project}' ${projectsArray[getCurrentFilter()] == project ? `selected='selected'` : ``}>${project}</option>
        `);
    }

    if(mode == 'add'){
        completeButton.innerHTML = 'Add';
    }
    else{
        let taskArray = getTaskArray();
        let index = taskArray.findIndex(task => task.id === taskId);

        insertTaskDetailsToBeChanged(taskArray[index]);
        editTaskId = taskId;
        completeButton.innerHTML = 'Change';
    }

    form.classList.remove('form-hide');
}

export function hideForm() {
    let form = document.getElementById('add-task-form');
    form.classList.add('form-hide');
    clearForm();
}

function clearForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-due-date').value = "2024-01-01T00:00";
    document.getElementById('task-priority').selectedIndex = 0;
}

function insertTaskDetailsToBeChanged(task) {
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-due-date').value = task.dueDate;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-project').value = task.project;
}

export function getEditedTaskId() {
    return editTaskId;
}