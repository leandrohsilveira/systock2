import React, {Component} from 'react'

import queryString from 'query-string'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'
import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'

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
                    <CardText>
                        {loading && (
                            <div style={{position: 'absolute', margin: '30px 45%'}}>
                                <ProgressBar type='circular' mode='indeterminate' multicolor />
                            </div>
                        )}
                        <Table style={{visibility: !loading ? 'visible' : 'hidden'}} multiSelectable={false} onRowSelect={handleSelect} selected={selected}>
                            <TableHead>
                                <TableCell>Username</TableCell>
                            </TableHead>
                            {users.length > 0 ? users.map((user, index) => (
                                    <TableRow key={user.username} selected={(selected).indexOf(index) !== -1}>
                                        <TableCell>{user.username}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow key={-1}>
                                        <TableCell>No result found</TableCell>
                                    </TableRow>
                                )
                            }
                        </Table>
                    </CardText>
                    <CardActions>
                        <Paginator links={links} page={page} />
                    </CardActions>
                </Card>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }

}