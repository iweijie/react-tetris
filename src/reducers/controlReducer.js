
import { start, change, next, mask, score, reset, level, time } from "../actions/controlAction"
function currentMap(state = {}, action) {
    switch (action.type) {
        case start:
            return action.payload
        case next:
            return {
                ...state.next,
                next: action.payload
            }
        case change:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

function contorlMask(state = true, action) {
    switch (action.type) {
        case mask:
            return action.payload
        default:
            return state;
    }
}

function contorlscore(state = 0, action) {
    switch (action.type) {
        case score:
            return state + action.payload;
        case reset:
            return 0;
        default:
            return state;
    }
}
function contorllevel(state = 1, action) {
    if (action.payload < 1) {
        action.payload = 1
    } else if (action.payload > 6) {
        action.payload = 6
    }
    switch (action.type) {
        case level:
            return action.payload;
        case reset:
            return 1;
        default:
            return state;
    }
}
function contorltime(state = 0, action) {
    switch (action.type) {
        case time:
        console.log(state,"test")
        console.log(action.payload,"test")
        console.log(state + action.payload,"test")
            return state + action.payload;
        case reset:
            return 0;
        default:
            return state;
    }
}


export default {
    currentMap,
    contorlMask,
    contorlscore,
    contorllevel,
    contorltime
}