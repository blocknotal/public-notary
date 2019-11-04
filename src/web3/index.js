import Arweave from 'arweave/web';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 80,           
    protocol: 'https', 
    timeout: 40000, 
    logging: false,
})

export{
    arweave
}