import React from 'react'
import { Grid, Avatar, Button } from '@material-ui/core'
import makeBlockie from 'ethereum-blockies-base64'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class UserHome extends React.Component{
   
    render(){
        const { walletAddress } = this.props.userData
        if(!walletAddress){
            return(
                <Redirect to="/" />
            )
        }
        return(
            <Grid container style={{ }} justify="center" alignContent="center" alignItems="center" direction="column">
                        <Avatar src={makeBlockie(walletAddress)} style={{margin:10}} />
                        <p>{walletAddress}</p>
                    <Grid continer direction="row">
                        <Link to={'/home/newagree'}>
                            <Button variant="contained" color="primary">New Agreement </Button>
                        </Link>
                    </Grid>
            </Grid>
        )
    }
}

export default UserHome