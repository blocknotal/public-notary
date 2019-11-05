import React from 'react'
import { Grid, Table, TableRow, TableCell, Typography } from "@material-ui/core";

const ListDoc = props => {
    const { files, openDoc } = props
    if(!files || files.length === 0){
        return(
            <Grid container justify="center">
                <Typography align="center" style={{ margin: 10 }}>No Files Upload</Typography>
            </Grid>
        )
    }
    return(
        <Grid container style={{padding:10}} alignContent="center" justify="center" alignsItems="center" direction="column">
            <div style={{ maxWidth: 750 }}>
            <Table>
            {files.map(file => (
                <TableRow>
                    <TableCell>{file.docName}</TableCell>
                    <TableCell onClick={() => openDoc(file.docFile)}>
                        <div class="search icon"></div>
                    </TableCell>
                </TableRow>
            ))}
            </Table>
            </div>
        </Grid>
    )
}

export default ListDoc