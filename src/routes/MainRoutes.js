import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Login from '../app/login/Login'
import UserDashboardMain from '../app/user-main/UserDashboardMain'
import UserHome from '../app/user-home/UserHome'
import StorageIndex from '../app/storage/StorageIndex';
import NewAgreement from '../app/agreement/NewAgreement';
import ForSignAgree from '../app/agreement/ForSignAgree';
import DeployAgree from '../app/agreement/DeployAgree'
import SearchAgree from '../app/agreement/SearchAgree'
import VerifySignature from '../app/agreement/VerifySignatures'
import ConfirmSignature from '../app/agreement/components/ConfirmSignature'
import getArweaveAccount from '../web3/getArweaveAccount'
import getArStorageFiles from '../web3/getArStorageFiles'
import ConfirmDeployFile from '../app/storage/components/ConfirmUpload'

class MainRoutes extends React.Component{
  state = {
    userData: { walletAddress: false },
    arUserData: { account: false, loadingArUserData: false },
    arStorageList: { fileList: false }
  }

  fetchUserDataSaga = (walletAddress) => {
    try{
      this.setState({ userData: { walletAddress} })
    }catch(e){
      console.log(e)
    }
  }

  fetchArUserDataSaga = async(arWalletFile) => {
    try{
      this.setState({ arUserData: { account: false, loadingArUserData: true}})
      const account = await getArweaveAccount(arWalletFile)
      const fileList = await getArStorageFiles(account.address)
      this.setState({
        arUserData: { account, loadingArUserData: false },  arStorageList: { fileList } })
    }catch(e){
      console.log(e)
      this.setState({ arUserData: { account: false, loadingArUserData: false },  arStorageList: { fileList: false } })
      alert('Failed to Load Arweave Account Data')
    }
  }


  render(){
    const { userData, arUserData, arStorageList } = this.state
    return(
      <HashRouter basename="/">
        <Route exact path="/" render={() => <Login userData={userData} fetchUserData={this.fetchUserDataSaga} />} />
        <Route path="/home" component={UserDashboardMain} />
        <Route exact path="/home" render={(props) => <UserHome {...props} userData={userData} /> } />
          <Route exact path="/home/storage" 
            render={(props) => <StorageIndex 
              {...props} userData={userData} arStorageList={arStorageList} arUserData={arUserData} fetchArUserDataSaga={this.fetchArUserDataSaga}
              /> } 
          />
          <Route exact path="/home/newagree" render={(props) => <NewAgreement {...props} userData={userData} arStorageList={arStorageList} arUserData={arUserData} fetchArUserDataSaga={this.fetchArUserDataSaga} />} />
          <Route exact path="/home/agreements/sign" render={props => <ForSignAgree {...props} userData={userData}  />} />
          <Route exact path="/home/agreements/deploy" render={props => <DeployAgree {...props} userData={userData}  />} />
          <Route exact path="/home/search" component={SearchAgree} />
          <Route exact path="/home/verify" component={VerifySignature} />
          <Route exact path="/home/confirmsign" component={ConfirmSignature} />
          <Route exact path="/home/confirmfiledeploy" component={ConfirmDeployFile} />

        </HashRouter>
    )
  }
}

export default MainRoutes
