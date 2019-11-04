import React from 'react'
import UploadArweaveAccount from "../../storage/components/UploadArweaveAccount";
import { Grid, Table, TableRow, TableCell } from "@material-ui/core";
import LoadingModal from '../../../utils/LoadingModal';

const SelectDocument = props => {
    const { arUserData, files, loadArAccount, selectDoc, openDoc } = props
    if(arUserData.account && !(arUserData.loadingArUserData)){
        return(
            <Grid container direction="column">
            <Table>
            {files.map(data => (
                <TableRow>
                    <TableCell>{data.docName}</TableCell>
                    <TableCell style={{ padding: 25 }} onClick={() => openDoc(data.docFile)}><div class="search icon"></div></TableCell>
                    <TableCell style={{ padding: 25 }} onClick={() => selectDoc(data)}> <div class="check icon"></div> </TableCell>
                </TableRow>
            ))}
            </Table>
        </Grid>
        )
    }else{
        return(
            <React.Fragment>
                <UploadArweaveAccount loadArAccount={loadArAccount} />
                <LoadingModal open={arUserData.loadingArUserData} />
            </React.Fragment>
        )
    }
}

export default SelectDocument