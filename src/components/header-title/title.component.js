import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { NavLink } from 'react-router-dom';


function HeaderTitle() {
    return (
        <div>
            Socker Social
            <div className="pull-right">
                <NavLink to="/login">
                    <FlatButton label="sign in" />
                </NavLink>
                <NavLink to="/register">
                    <FlatButton label="sign up" />
                </NavLink>
            </div>
        </div>
    )
};

export {HeaderTitle}