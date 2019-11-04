import React from 'react'
import { Dialog, DialogContent, CircularProgress, Grid, Typography } from "@material-ui/core";

const LoadingModal = props => (
    <Dialog open={props.open}>
    <DialogContent>
        <Grid container alignItems="center" alignContent="center" direction="column" justify="center">
            <CircularProgress/>
            <Typography align="center">Loading...</Typography>
        </Grid>
    </DialogContent>
    </Dialog>
)

export default LoadingModal