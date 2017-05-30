import React from 'react'

import {Link} from 'react-router-dom'
import IconButton from 'react-toolbox/lib/button/IconButton'

export default ({links = {}, page = {}}) => {

    const {number, size, totalElements, totalPages} = page
    const currentPage = number + 1
    const start = (currentPage * size - size) + 1
    let end = currentPage * size
    end = end > totalElements ? totalElements : end
    return (
        <div className="flex flex-row flex-end">
            <small className="flex flex-self-center">{start}-{end} of {totalElements} </small>
            {getLink(links.first, "skip_previous")}
            {getLink(links.prev, "keyboard_arrow_left")}
            {getLink(links.next, "keyboard_arrow_right")}
            {getLink(links.last, "skip_next")}
        </div>
    )

    function getLink(link, icon) {
        if(link) {
            const href = link.href.split('/api')[1]
            if(href) {
                const split = href.split('?')
                const path = split[0]
                const search = `?${split[1]}`
                return (
                    <Link className="flex flex-self-center" to={{pathname: path, search: search}}>
                        <IconButton icon={icon} />
                    </Link>
                )
            }
        }
        return <IconButton className="flex flex-self-center" disabled={true} icon={icon}></IconButton>
    }
}
