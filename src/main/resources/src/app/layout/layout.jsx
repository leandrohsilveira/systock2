import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import Layout from 'react-toolbox/lib/layout/Layout'
import Panel from 'react-toolbox/lib/layout/Panel'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import IconButton from 'react-toolbox/lib/button/IconButton'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'

import Sidebar from './sidebar'
import theme from './theme'
import './theme.css'

import {onSideBarToggle} from './layout.actions'

const mapStateToProps = state => ({title: state.layout.title, sideBarOpen: state.layout.sideBarOpen, appBarActions: state.layout.appBarActions})
const mapDispatchToProps = dispatch => bindActionCreators({onSideBarToggle: onSideBarToggle}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AppLayout extends Component {

    render() {
        const {sideBarOpen, onSideBarToggle, title, children, appBarActions} = this.props
        return (
            <ThemeProvider theme={theme}>
                <Layout>
                    <NavDrawer active={sideBarOpen} onOverlayClick={onSideBarToggle} permanentAt="lg">
                        <Sidebar onNavigate={onSideBarToggle} />
                    </NavDrawer>
                    <Panel>
                        <AppBar className="app-title">
                            <div className="app-bar-container">
                                <div className="app-bar-title">
                                    <div className="app-bar-container">
                                        <IconButton icon="menu" inverse className="drawer-button" onClick={onSideBarToggle} />
                                        <h3>{title}</h3>
                                    </div>
                                </div>
                                <div className="app-bar-actions">
                                    {appBarActions}
                                </div>
                            </div>
                        </AppBar>
                        <div>
                            {children}
                        </div>
                    </Panel>
                </Layout>
            </ThemeProvider>
        )
    }
}