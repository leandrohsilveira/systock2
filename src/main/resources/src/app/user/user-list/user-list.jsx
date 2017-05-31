import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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

import {UserService} from '../'
import {Paginator} from '../../widgets'

export default class UserList extends Component {

    state = {
        loading: true,
        users: [],
        selected: [],
        links: {},
        page: {}
    }

    componentWillMount() {
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
                                {selected && selected.length && (
                                    <Link to={`${users[selected]._links.app_self.href}/password`}>
                                        <IconButton icon="edit" />
                                    </Link>
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
                                        <TableCell>{[user.profile && user.profile.firstName, user.profile && user.profile.lastName].filter(v => !!v).join(' ')}</TableCell>
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