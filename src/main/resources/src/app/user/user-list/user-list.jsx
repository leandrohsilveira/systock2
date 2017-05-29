import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import queryString from 'query-string'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'

import {UserService} from '../'

export default class UserList extends Component {

    state = {
        loading: true,
        users: [],
        selected: [],
        links: {}
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
                        this.setState({users: data._embedded.users, links: data._links, loading: false})
                    })
    }

    getLink = (link, text) => {
        if(link) {
            const href = link.href.split('/api')[1]
            if(href) {
                const split = href.split('?')
                const path = split[0]
                const search = `?${split[1]}`
                return <Link to={{pathname: path, search: search}}>{text}</Link>
            }
        }
        return false
    }

    handleSelect = (selected) => {
        this.setState({selected})
    }

    render() {
        const {users = [], links = {}, selected, loading} = this.state
        const {handleSelect, getLink} = this
        return (
            <div>
                <Table multiSelectable={false} onRowSelect={handleSelect} selected={selected}>
                    <TableHead>
                        <TableCell>Username</TableCell>
                    </TableHead>
                    {!loading && users.length > 0 ? users.map((user, index) => (
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
                {loading && (
                    <ProgressBar type='circular' mode='indeterminate' multicolor />
                )}
                <br/>
                <br/>
                <br/>
                {getLink(links.first, "[<<]")}
                {getLink(links.prev, "[<]")}
                {getLink(links.next, "[>]")}
                {getLink(links.last, "[>>]")}
            </div>
        )
    }

}