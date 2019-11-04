import React from 'react'
import { Route, Redirect } from 'react-router-dom'


class PrivateRoute extends React.Component{
    state = {
        
    }

    render(){
        const { auth, component: Component, ...rest } = this.props
        return(
            <Route {...rest} render={props => (auth ? <Component {...this.props} /> : <Redirect to="/" />)} />
        )
    }
}

export default PrivateRoute
