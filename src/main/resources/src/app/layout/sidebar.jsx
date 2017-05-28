import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Drawer from 'react-toolbox/lib/drawer/Drawer'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'
import MenuItem from 'react-toolbox/lib/menu/MenuItem'

import NavMenuItem from '../widgets/nav-menu-item'

// import {logout} from '../user/auth.actions'

// const mapStateToProps = state => ({user: state.auth.user})
// const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)

// @connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends Component {

    state = {
        showUserMenu: false
    }

    handleLogout = () => {
        const {onNavigate, logout} = this.props
        this.setState({showUserMenu: false})
        onNavigate()
        logout()
    }

    handleUserMenuClick = () => {
        this.setState({showUserMenu: !this.state.showUserMenu})
    }

    render() {
        const {onNavigate, user} = this.props
        const {showUserMenu} = this.state
        const {handleLogout, handleUserMenuClick} = this
        return (
            <div>
                <AppBar className="banner" flat>
                    <div className="flex flex-column flex-space-between">
                        <div className="flex flex-row"></div>
                        <div className="flex flex-column flex-center title">
                            <div className="flex flex-row flex-center">
                                <i className="material-icons flex-self-center">monetization_on</i>
                                <span className="flex-self-center">Systock</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            {user && (
                                <div className="flex flex-row flex-space-between">
                                    <div className="flex flex-row flex-start">
                                        <i className="material-icons flex-self-center">account_circle</i>
                                        <span className="flex-self-center auth">{user.email}</span>
                                        {/*<span className="flex-self-center auth">leandro.hinckel@gmail.com</span>*/}
                                    </div>
                                    <div className="flex flex-row flex-end flex-self-center">
                                        <IconButton icon={showUserMenu ? 'arrow_drop_up' : 'arrow_drop_down'} inverse onClick={handleUserMenuClick} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AppBar>
                <NavMenuItem href="/" onClick={onNavigate} iconClass="home" value="Home"></NavMenuItem>,
            </div>
        )
    }

}