// Action creators
export const KANBAN_ADDED = "KANBAN_ADDED"
export const KANBAN_DELETED = "KANBAN_DELETED"
export const KANBAN_UPDATED = "KANBAN_UPDATED" 
export const KANBAN_LOADED = "KANBAN_LOADED"

// Action creators

// Reducers
const kanbans = (kanbans=[], action) => {
    switch (action.type) {
        case KANBAN_LOADED: 
            return [...action.payload]
    
        case KANBAN_ADDED:
            return [...kanbans, action.payload]
    
        case KANBAN_DELETED:
            return kanbans.filter((kanban) => kanban.id !== action.payload.id)

        case KANBAN_UPDATED:
            return kanbans.map(kanban => {
                return kanban.id === action.payload.id ? action.payload : kanban
            })

        default:
            return kanbans
    }
} 
export default kanbans