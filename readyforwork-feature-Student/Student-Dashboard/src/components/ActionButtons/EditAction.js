import React from 'react';
import {Link} from 'react-router-dom';

const EditAction = ({...props}) => {
    return <Link {...props} title="Edit"><i className="mdi mdi-pencil font-size-18"></i></Link>
}

export default EditAction;