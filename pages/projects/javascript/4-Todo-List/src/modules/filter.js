import { getProjectsArray } from '../modules/storage';
import { isWithinInterval, add, compareAsc } from "date-fns";


export function filterTasks(taskArray, currentFilter) {
    let filteredTasksArray = taskArray;

    if (typeof currentFilter == 'string') {
        let taskFilters = {
            'All Tasks': function () {
                return filteredTasksArray;
            },
            'Today': function () {
                filteredTasksArray = filteredTasksArray.filter((task) => 
                    isWithinInterval(new Date(task.dueDate), {
                        start: new Date(),
                        end: add(new Date(), {days: 1})
                    })
                );

                return filteredTasksArray;
            },
            'This Week': function () {
                filteredTasksArray = filteredTasksArray.filter((task) => 
                    isWithinInterval(new Date(task.dueDate), {
                        start: new Date(),
                        end: add(new Date(), {weeks: 1})
                    })
                );

                return filteredTasksArray;
            },
            'Overdue': function () {
                filteredTasksArray = filteredTasksArray.filter((task) => 
                    compareAsc(new Date(task.dueDate), new Date()) == -1
                );

                return filteredTasksArray;
            }
        };

        return taskFilters[currentFilter]();
    } else {
        filteredTasksArray = filteredTasksArray.filter((task) => task.project == getProjectsArray()[currentFilter]);
        return filteredTasksArray;
    }
}