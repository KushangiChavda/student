import React from 'react'
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const StartPage = ({ content, contents, contenttitle, ...props }) => {
    let {pathname} = useLocation();
    let thisPage = pathname.split('/')[1];
    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">{contenttitle}</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <Link to={`/${thisPage}`}>{content.toString().toLowerCase()}</Link>
                            </li>
                            <li className="breadcrumb-item active">{contents.toString().toLowerCase()}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
StartPage.propTypes = {
    content: PropTypes.string,
    contents: PropTypes.string
};
