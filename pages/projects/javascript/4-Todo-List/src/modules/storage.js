import { renderProjects, updateFilterHeader, updateActiveButtonElement, renderTasks } from "./render";
import { add } from "date-fns";

let starterTasks = [
    {
        title: 'Do the dishes',
        description: 'Kinda self explanatory...',
        dueDate: add(new Date(), {hours: 2, minutes: 43}).toISOString().substring(0, 16),
        priority: 'High',
        project: 'Project 1',
        completed: false,
        id: 'task-0',
    },
    {
        title: 'Finish the Odin Project',
        description: 'Or else I might end up homeless :(',
        dueDate: add(new Date(), {weeks: 2, days: 6, hours: 4, minutes: 21}).toISOString().substring(0, 16),
        priority: 'Low',
        project: 'Project 1',
        completed: false,
        id: 'task-1',
    },
    {
        title: 'Do some homework',
        description: 'Maths and stuff.',
        dueDate: add(new Date(), {days: 1}).toISOString().substring(0, 16),
        priority: 'Low',
        project: 'Project 2',
        completed: true,
        id: 'task-2',
    },
    {
        title: 'Make dinner',
        description: 'I was thinking something like fried chicken?',
        dueDate: add(new Date(), {hours: 2}).toISOString().substring(0, 16),
        priority: 'Medium',
        project: 'Project 2',
        completed: false,
        id: 'task-3',
    },
];

let starterProjects = ['Project 1', 'Project 2'];

let projectArray = [];
let taskArray = [];
let currentFilter = '';

export function initStorage() {
    if (!localStorage.getItem('tasks')) {
        populateStorage();
    }
    updateFilter('all-tasks-filter-button');
}

function populateStorage() {
    localStorage.setItem('tasks', JSON.stringify(starterTasks));
    localStorage.setItem('projects', JSON.stringify(starterProjects));
}

//Filter Functions

export function updateFilter(name) {

    let projectFilters = {
        'all-tasks-filter-button': 'All Tasks',
        'today-filter-button': 'Today',
        'this-week-filter-button': 'This Week',
        'overdue-filter-button': 'Overdue'
    };

    currentFilter = projectFilters[name];

    //if 'currentFilter' is undefined then the new filter must be a project.
    if (currentFilter == undefined) {
        currentFilter = name;
        updateFilterHeader(getProjectsArray()[currentFilter])
    } else {
        updateFilterHeader(currentFilter);
    }
    updateActiveButtonElement(name);
    renderTasks();
}

export function getCurrentFilter() {
    return currentFilter;
}

//Project Functions

export function getProjectsArray() {
    projectArray = JSON.parse(localStorage.getItem('projects'));
    return projectArray;
}

export function addProject(name) {
    if (name != '') {
        projectArray = getProjectsArray();
        projectArray.push(name);
        localStorage.setItem('projects', JSON.stringify(projectArray));
    }
}

export function removeProject(i) {
    projectArray = getProjectsArray();
    if (i > -1) {
        projectArray.splice(i, 1);
    }
    localStorage.setItem('projects', JSON.stringify(projectArray));

    if (currentFilter > i && typeof currentFilter != 'string') {
        updateFilter(currentFilter-1);
    } else if (currentFilter == i) {
        //if the active project is deleted swap back to the 'All Projects' filter
        updateFilter('all-tasks-filter-button');
    }
    renderProjects();
}

//Task Functions

export function getTaskArray() {
    taskArray = JSON.parse(localStorage.getItem('tasks'));
    return taskArray;
}

export function setTaskId() {
    projectArray = getTaskArray();

    for (let i = 0; i < projectArray.length; i++) {
        projectArray[i].id = `task-${i}`;
    }
    localStorage.setItem('tasks', JSON.stringify(projectArray));
    return projectArray;
}

export function addTask(newTask) {
    taskArray = getTaskArray();

    if (newTask.title == '') {
        newTask.title = 'Untitled task'
    }
    if (newTask.description == '') {
        newTask.description = 'No description'
    }

    taskArray.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

export function editTask(taskId, newTask) {
    taskArray = getTaskArray();
    let index = taskArray.findIndex(task => task.id === taskId);

    taskArray[index].title = newTask.title;
    taskArray[index].description = newTask.description;
    taskArray[index].dueDate = newTask.dueDate;
    taskArray[index].priority = newTask.priority;
    taskArray[index].project = newTask.project;

    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

export function removeTask(taskId) {
    taskArray = getTaskArray();
    let index = taskArray.findIndex(task => task.id === taskId);

    if (index > -1) {
        taskArray.splice(index, 1);
    }

    for (let i = 0; i < taskArray.length; i++) {
        taskArray[i].id = `task-${i}`;
    }

    localStorage.setItem('tasks', JSON.stringify(taskArray));
    renderTasks();
}

export function completeTaskToggle(index) {
    taskArray = getTaskArray();
    let taskIndex = taskArray.indexOf(taskArray.find((task) => task.id == index));
    taskArray[taskIndex].completed = !taskArray[taskIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    renderTasks();
}