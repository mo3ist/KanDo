import { LOGGED_IN, SIGNED_UP } from "./user"
import { KANBAN_LOADED, KANBAN_ADDED, KANBAN_DELETED, KANBAN_UPDATED } from "./kanbas"
import { TASK_ADDED, TASK_LOADED, TASK_DELETED, TASK_UPDATED } from "./tasks"

// Action types
export const API_CALLED = "API_CALLED"
export const API_CALL_SUCCEEDED = "API_CALL_SUCCEEDED"
export const API_CALL_FAILED = "API_CALL_FAILED"

// Action creators 
// So my philosophy here was not to make any move without the backend confirmation so
// any creation/deletion/upda-tion/thingie-tion will have to be passed to api first.  
// user related
export const apiCalled = payload => ({
    type: API_CALLED,
    payload: payload
})

export const logInAction = (cred) => {
    return apiCalled({    
        url: "http://127.0.0.1:8000/api/obtain_token/",
        method: "post",
        data: {
            username: cred.username,
            password: cred.password
        },
        onSuccess: LOGGED_IN
    })
}
export const signUpAction = (cred) => {
    return apiCalled({    
        url: "http://127.0.0.1:8000/api/register/",
        method: "post",
        data: {
            username: cred.username,
            password: cred.password
        },
        onSuccess: SIGNED_UP
    })
}

// kanban related
export const loadKanbans = () => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/kanbans/",
        method: "get",
        onSuccess: KANBAN_LOADED
    })
}

export const createKanban = (name) => {
    return apiCalled(
        {
            url: "http://127.0.0.1:8000/api/kanbans/",
            method: "post",
            data: {
                name: name
            },
            onSuccess: KANBAN_ADDED
        }
    )
}

export const deleteKanban = (kanbanId) => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/kanbans/",
        method: "delete",
        data: {
            kanban: kanbanId
        },
        onSuccess: KANBAN_DELETED

    })
}

export const updateKanban = (prevKanban, kanban) => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/kanbans/",
        method: "put",
        data: {
            prevKanban: prevKanban,
            kanban: kanban
        },
        onSuccess: KANBAN_UPDATED

    })
}

// tasks related
export const loadTasks = kanbanId => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/todos/?kanban="+kanbanId,
        method: "get",
        onSuccess: TASK_LOADED
    })
}

export const createTask = (name, kanbanId) => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/todos/",
        method: "post",
        data: {
            name: name,
            kanban: kanbanId
        },
        onSuccess: TASK_ADDED
    })
} 

export const deleteTask = (taskId) => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/todos/",
        method: "delete",
        data: {
            todo: taskId
        },
        onSuccess: TASK_DELETED

    })
}

export const updateTask = (prevTask, task) => {
    return apiCalled({
        url: "http://127.0.0.1:8000/api/todos/",
        method: "put",
        data: {
            prevTask: prevTask,
            task: task
        },
        onSuccess: TASK_UPDATED

    })
}