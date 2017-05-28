import React from 'react'

import {Link} from 'react-router-dom'

import MenuItem from 'react-toolbox/lib/menu/MenuItem'

export default props => (
    <Link className="nav-menu-item" to={props.href} onClick={props.onClick}>
        <MenuItem icon={props.iconClass} caption={props.value} />
    </Link>
)