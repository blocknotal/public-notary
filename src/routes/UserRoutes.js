import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserDashboardMain from '../app/user-main/UserDashboardMain'
import UserHome from '../app/user-home/UserHome'
import StorageIndex from '../app/storage/StorageIndex';
import { fetchArUserDataSaga } from '../state/actions/setArUserDataActions'
import NewAgreement from '../app/agreement/NewAgreement';
import ForSignAgree from '../app/agreement/ForSignAgree';
import DeployAgree from '../app/agreement/DeployAgree'
import SearchAgree from '../app/agreement/SearchAgree'
import VerifySignature from '../app/agreement/VerifySignatures'
import ConfirmSignature from '../app/agreement/components/ConfirmSignature'

const UserRoutes = props => {
  const { userData, arUserData, fetchArUserDataSaga, arStorageList } = props
  return(
    <UserDashboardMain>
      <React.Fragment>
        <Route exact path="/home" render={(props) => <UserHome {...props} userData={userData} /> } />
        <Route exact path="/home/storage" 
          render={(props) => <StorageIndex 
            {...props} userData={userData} arStorageList={arStorageList} arUserData={arUserData} fetchArUserDataSaga={fetchArUserDataSaga}
            /> } 
        />
        <Route exact path="/home/newagree" render={(props) => <NewAgreement {...props} userData={userData} arStorageList={arStorageList} arUserData={arUserData} fetchArUserDataSaga={fetchArUserDataSaga} />} />
        <Route exact path="/home/agreements/sign" render={props => <ForSignAgree {...props} userData={userData}  />} />
        <Route exact path="/home/agreements/deploy" render={props => <DeployAgree {...props} userData={userData}  />} />
        <Route exact path="/home/search" component={SearchAgree} />
        <Route exact path="/home/verify" component={VerifySignature} />
        <Route exact path="/home/confirmsign" component={ConfirmSignature} />

      </React.Fragment>
    </UserDashboardMain>
  )
}


const mapStateToProps = state => ({
  userData: state.UserData,
  arUserData: state.ArUserData,
  arStorageList: state.ArStorageList
})

const mapDispatchToProps = dispatch => bindActionCreators({  
  fetchArUserDataSaga
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UserRoutes)
