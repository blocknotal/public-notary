import sha256 from 'js-sha256'


const readArweaveAccount = (rawFile) =>  new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = () => {
      reader.abort();
      reject(new Error("Failed Read the file"))
      }
      reader.addEventListener("load", () => {
        resolve(reader.result)
      }, false)
      reader.readAsText(rawFile)
})


const readPdfFile = (rawFile) => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Failed Read the file"))
      }
      reader.addEventListener("load", () => {
        resolve({ docFile: reader.result, docName: rawFile.name })
      }, false)
      reader.readAsDataURL(rawFile)
})


const readBufferPdfFile = (rawFile) =>  new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = () => {
    reader.abort();
    reject(new Error("Failed Read the file"))
  }
  reader.addEventListener("load", () => {
    resolve(reader.result)
  }, false)
  reader.readAsArrayBuffer(rawFile)
})



const getSha256Pdf = async (rawFile) => new Promise(async (resolve, reject) => {
  try{
    const fileBuffer = await readBufferPdfFile(rawFile)
    let hash = sha256.create()
    hash.update(fileBuffer)
    resolve(hash.hex())
  }catch(e){
    reject(e)
  }
})


const getPdfFileData = async (rawFile) => new Promise(async (resolve, reject) => {
  try{
    const { docFile, docName } = await readPdfFile(rawFile)
    const docHash = await getSha256Pdf(rawFile)
    resolve({ docFile, docName, docHash })
  }catch(e){
    reject(e)
  }
})


export{
  readArweaveAccount,
  getPdfFileData
}