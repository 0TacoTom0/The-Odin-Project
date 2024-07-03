import { compareAsc, compareDesc } from "date-fns";

export function sortAscending(taskArray) {
    let newTaskArray = taskArray.sort(function(a, b) {
        let dateA = new Date(a.dueDate);
        let dateB = new Date(b.dueDate);
        return compareAsc(dateA, dateB);
    });
    return newTaskArray;
}

export function sortDescending(taskArray) {
    let newTaskArray = taskArray.sort(function(a, b) {
        let dateA = new Date(a.dueDate);
        let dateB = new Date(b.dueDate);
        return compareDesc(dateA, dateB);
    });
    return newTaskArray;
}

export function sortByPriority(taskArray) {
    let highPriorityArray = taskArray.filter((task) => task.priority == 'High');
    let mediumPriorityArray = taskArray.filter((task) => task.priority == 'Medium');
    let lowPriorityArray = taskArray.filter((task) => task.priority == 'Low');

    let newTaskArray = sortDescending(highPriorityArray).concat(sortDescending(mediumPriorityArray), sortDescending(lowPriorityArray));

    return newTaskArray;
}