
import {start,change,next} from "../actions/controlAction"
function currentMap(state = {}, action) {
    switch (action.type) {
        case start :
            return action.payload
        case next :
            return {
                ...state.next,
                next:action.payload
            }
        case change : 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default {
    currentMap
}