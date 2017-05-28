import {USER} from './'

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER.SIGNED_UP:
            console.debug(action)
            return state;
    
        default:
            return state;
    }
}