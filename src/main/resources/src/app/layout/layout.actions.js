export const LAYOUT = {
    TITLE_CHANGED: 'LAYOUT.TITLE_CHANGED',
    SIDEBAR_TOGGLED: 'LAYOUT.SIDEBAR_TOGGLED',
    APPBAR_ACTIONS_CHANGED: 'LAYOUT.APPBAR_ACTIONS_CHANGED'
}

export const changeTitle = (title) => ({
    type: LAYOUT.TITLE_CHANGED,
    payload: title
})

export const onSideBarToggle = () => ({
    type: LAYOUT.SIDEBAR_TOGGLED
})

export const changeAppBarActions = (actions) => ({
    type: LAYOUT.APPBAR_ACTIONS_CHANGED,
    payload: actions
})