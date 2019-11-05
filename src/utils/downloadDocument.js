import { saveAs } from 'file-saver';

const downloadFile = (docFile) => {
    saveAs(docFile, "document.pdf");
}

export default downloadFile
