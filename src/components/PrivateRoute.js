import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';



const PrivateRoute = ({component: Component, ...rest}) => {
    const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
    return(
        <Route
            {...rest}
            render={props => {
                console.log(props)
                if (tokenPresent){
                    return <Component {...props} />;
                } else {
                    return <Redirect to='/' />;
                }
            }}
        />
    )
}

export default PrivateRoute;
