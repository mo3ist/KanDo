import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"

import user from "./user"
import kanbans from "./kanbas"
import tasks from "./tasks"
import {apiMiddleware} from "../middleware/api"

const reducers = combineReducers({user: user, kanbans: kanbans, tasks: tasks})
const middlewares = applyMiddleware(thunk, apiMiddleware)
const enhancers = compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const store = createStore(reducers, enhancers)