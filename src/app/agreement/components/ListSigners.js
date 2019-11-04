import React from 'react'
import { Grid, Table, TableRow, TableCell, Avatar } from "@material-ui/core";
import makeBlockie from 'ethereum-blockies-base64';

const ListSigners = props => {
    const { listSigners, removeSigner } = props
    if(!listSigners || listSigners.length === 0) return null
    return(
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
            <Table style={{ maxWidth: 400 }}>
            {listSigners.map((signer, index) => (
                <TableRow>
                    <TableCell><Avatar src={makeBlockie(signer)} /></TableCell>
                    <TableCell>{signer}</TableCell>
                    <TableCell onClick={() => removeSigner(index)}>X</TableCell>
                </TableRow>
            ))}
            </Table>
        </Grid>
    )
}

export default ListSigners