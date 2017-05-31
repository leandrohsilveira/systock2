import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {toastr} from 'react-redux-toastr'

import queryString from 'query-string'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardText'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import IconButton from 'react-toolbox/lib/button/IconButton'
import IconMenu from 'react-toolbox/lib/menu/IconMenu'
import MenuItem from 'react-toolbox/lib/menu/MenuItem'

import {UserService} from '../'
import {Paginator, NavMenuItem} from '../../widgets'
import {changeTitle} from '../../layout'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class UserList extends Component {

    state = {
        loading: true,
        users: [],
        selected: [],
        links: {},
        page: {}
    }

    componentDidMount() {
        const {changeTitle} = this.props
        changeTitle('Users list')
        this.load(this.props)
    }

    componentWillReceiveProps(props) {
        if(props && props.location) {
            this.load(props)
        }
    }

    load = (props) => {
        const {page = 0, size = 10, sort = 'username,asc'} = queryString.parse(props.location.search)
        this.setState({loading: true})
        UserService.findAll(page, size, sort)
                    .then(data => {
                        this.setState({users: data._embedded.users, links: data._links, page: data.page, loading: false})
                    })
    }

    handleSelect = (selected) => {
        this.setState({selected})
    }

    render() {
        const {users = [], links = {}, page = {}, selected, loading} = this.state
        const {handleSelect} = this
        return (
            <div className="content">
                <Card>
                    <CardTitle>
                        <div className="flex flex-row flex-space-between">
                            <div className="flex flex-self-center"></div>
                            <div className="flex flex-self-center">
                                {selected && !!selected.length && (
                                    <div>
                                        <Link to={`${users[selected]._links.app_self.href}/profile`}>
                                            <IconButton icon="edit" />
                                        </Link>
                                        <IconMenu icon='more_vert' position='topRight' menuRipple>
                                            <NavMenuItem iconClass="vpn_key" value="Change password" href={`${users[selected]._links.app_self.href}/password`}  />
                                            <NavMenuItem iconClass="delete" value="Delete" href={`${users[selected]._links.app_self.href}/password`}  />
                                        </IconMenu>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardTitle>
                    <CardText>
                        {loading && (
                            <div style={{position: 'absolute', margin: '30px 45%'}}>
                                <ProgressBar type='circular' mode='indeterminate' multicolor />
                            </div>
                        )}
                        <Table style={{visibility: !loading ? 'visible' : 'hidden'}} multiSelectable={false} onRowSelect={handleSelect} selected={selected}>
                            <TableHead>
                                <TableCell>Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>E-mail</TableCell>
                            </TableHead>
                            {users.length > 0 ? users.map((user, index) => (
                                    <TableRow key={user.username} selected={(selected).indexOf(index) !== -1}>
                                        <TableCell>{UserService.getFullName(user.profile)}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.profile && user.profile.email}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow key={-1}>
                                        <TableCell colSpan={3}>No result found</TableCell>
                                    </TableRow>
                                )
                            }
                        </Table>
                    </CardText>
                    <CardActions>
                        <Paginator links={links} page={page} />
                    </CardActions>
                </Card>
            </div>
        )
    }

}