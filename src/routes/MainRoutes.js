import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import { bindActionCreators } from 'redux'
import Login from '../app/login/Login'
import PrivateRoute from './utils/PrivateRoute'
import { fetchUserDataSaga } from '../state/actions/setUserDataActions'
import UserRoutes from './UserRoutes'

const MainRoutes = props => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" render={() => <Login fetchUserData={props.fetchUserDataSaga} />} />
      <PrivateRoute path="/home" auth={true} component={UserRoutes} />
    </Switch>
  </ConnectedRouter>
)


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchUserDataSaga }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes)
