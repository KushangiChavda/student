import React from 'react'
import { Pagination as MuiPagination } from '@material-ui/lab';

const Pagination = ({color = null, ...props}) => {
    return (
        <MuiPagination
            color={color || "primary"}
            {...props}
        />
    )
}
export default Pagination;