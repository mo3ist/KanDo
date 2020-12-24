// Action creators
export const TASK_ADDED = "TASK_ADDED"
export const TASK_DELETED = "TASK_DELETED"
export const TASK_UPDATED = "TASK_UPDATED" 
export const TASK_LOADED = "TASKS_LOADED"

// Action creators 

// Reducers
const tasks = (tasks={}, action) => {
    switch (action.type) {
        case TASK_LOADED:  
            const newTasks = {...tasks, [action.payload.kanban]: [...action.payload.data]} 
            return newTasks

        case TASK_ADDED:
            return {...tasks, [action.payload.kanban]: [...tasks[action.payload.kanban], action.payload.data]}

        case TASK_DELETED:
            return {...tasks, [action.payload.kanban]: tasks[action.payload.kanban].filter((task) => task.id !== action.payload.data.id)}

        case TASK_UPDATED:
                const removed = {...tasks, [action.payload.prevTask.kanban]: tasks[action.payload.prevTask.kanban].filter((task) => task.id !== action.payload.prevTask.id)}
                return {...removed, [action.payload.data.kanban]: [...removed[action.payload.data.kanban], action.payload.data] }

        default:
            return tasks
    }
} 
export default tasks