import React from 'react'
import { Dialog, DialogContent, Button, Grid } from "@material-ui/core";
import PDFViewer from 'pdf-viewer-reactjs';
import { saveAs } from 'file-saver';

const downloadFile = (docFile) => {
    saveAs(docFile, "document.pdf");
}

const ViewDoc = props => {
    const { open, docFile, closeViewDoc } = props
    return(
        <Dialog open={open}>
        <DialogContent>
            <Grid container direction="row" alignContent="center" justify="center" alignItems="center">
                <Button style={{ margin: 5 }} variant="contained" color="secondary" onClick={closeViewDoc}>Close</Button>
                <Button style={{ margin: 5 }} variant="contained" color="primary" onClick={() => downloadFile(docFile)}>Download File</Button>
            </Grid>
            <PDFViewer document={{ url: docFile }} />
        </DialogContent>
        </Dialog>
    )
}

export default ViewDoc