import {LAYOUT} from './layout.actions'

const INITIAL_STATE = {
    title: 'Dashboard',
    sideBarOpen: false,
    appBarActions: null
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LAYOUT.TITLE_CHANGED:
            return {...state, title: action.payload}
        case LAYOUT.SIDEBAR_TOGGLED:
            return {...state, sideBarOpen: !state.sideBarOpen}
        case LAYOUT.APPBAR_ACTIONS_CHANGED:
            return {...state, appBarActions: action.payload}
        default:
            return state
    }

}