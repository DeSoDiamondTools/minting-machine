import React, { PureComponent, Fragment } from "react";

import DesoIdentity from '../src/libs/desoIdentity';
import DesoApi from '../src/libs/desoApi';

import Arweave from "arweave";

import ReactFileReader from 'react-file-reader';

const IdentityUsersKey = "identityUsersV2"

const initOptions = {
    host: "arweave.net", // Hostname or IP address for a Arweave host
    port: 443, // Port
    protocol: "https", // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false, // Enable network request logging
};

const arweave = Arweave.init(initOptions);

const FileInput = ({ files, handleFiles }) => {
    return (
        <div className="mb-40">
            {
                files.length > 0 && 
                <div>
                    <b>Selected files:</b> {files.map(f => f.name).join(", ")}
                </div>
            }

            <div className="bg-blue-400 hover:bg-blue-300 cursor-pointer border border-black p-8"></div>
                <ReactFileReader fileTypes={[".json",".png"]} multipleFiles={true} handleFiles={handleFiles}>
                    Click to select some files
                </ReactFileReader>
            
        </div>
    )
}

class IndexPage extends PureComponent {
    state = {
        desoIdentity: null,
        desoApi: null,

        isLogged: false,
        publickey: null,

        files: [],
        message: ""
    }

    componentDidMount() {
        const di = new DesoIdentity();
        this.setState({ desoIdentity: di });
        const da = new DesoApi()
        this.setState({ desoApi: da });

        console.log(localStorage);
    
        let user = {};
        if (localStorage.getItem(IdentityUsersKey) === 'undefined'){
          user = {}
        } else if (localStorage.getItem(IdentityUsersKey)){
          user = JSON.parse(localStorage.getItem(IdentityUsersKey) || '{}')
        }
    
        if(user.publicKey){
            this.setState({ publickey: user.publicKey });
            this.setState({ isLogged: true });
        }
    }

    login = async () => {
        const { desoIdentity } = this.state;

        const user = await desoIdentity.loginAsync(4)
        this.setState({ publickey: user.publicKey });
        this.setState({ isLogged: true });
    }

    logout = async () => {
        const { desoIdentity, publickey } = this.state;

        const result = await desoIdentity.logout(publickey)
        this.setState({ publickey: null });
        this.setState({ isLogged: false });
    }

    setMessage = (message) => this.setState({ message });

    handleFiles = (files) => {
        const filesArray = Array.from(files);

        this.setState({ files: [ ...this.state.files, ...filesArray] });
    }

    convertImageToData = (imageToConvert, callback) => {
        const fileReader = new FileReader();

        fileReader.onload = async e => {
            callback(new Uint8Array(e.target.result));
        }
        fileReader.readAsArrayBuffer(imageToConvert);
    }

    uploadImageToArweave = async (imageToUpload) => {
        const key = await arweave.wallets.generate();
        
        // I know this is not the best way to do this, but I'm not sure how to do it better
        const callback = async convertedImage => {
            let transaction = await arweave.createTransaction({ data: convertedImage }, key);
            transaction.addTag("Content-Type", "image/png");

            await arweave.transactions.sign(transaction, key);

            console.log(`https://arweave.net/${transaction.id}`);
            const postResponse = await arweave.transactions.post(transaction);
            console.log("post response", postResponse);
            console.log(`https://arweave.net/${transaction.id}`)
        }

        this.convertImageToData(imageToUpload, callback);
    }

    readMetadata = (metadataFile) => {
        const fileReader = new FileReader();

        fileReader.onload = async e => {
            console.log(JSON.parse(e.target.result));

            //callback(new Uint8Array(e.target.result));
        }
        fileReader.readAsText(metadataFile);
    }

    createDeSoPost = async () => {
        /*const rtnSubmitPost = await desoApi.submitPost(publicKey, body, extraData);
        const postTransactionHex = rtnSubmitPost.TransactionHex;
        const signedPostTransactionHex = await desoIdentity.signTxAsync(postTransactionHex);
        const rtnSubmitPostTransaction = await desoApi.submitTransaction(signedPostTransactionHex);

        if(rtnSubmitPostTransaction) {
            setMessage(`🎉 ${i+1} Post created!`)
            console.log(rtnSubmitPostTransaction)
        }*/
    }

    convertDeSoPostToNFT = async () => {
        // Creating the NFT
        /*const rtnCreateNFT = await desoApi.createNFT(publicKey, rtnSubmitPostTransaction.TxnHashHex);
        const NFTTransactionHex = rtnCreateNFT.TransactionHex;
        const signedNFTTransactionHex = await desoIdentity.signTxAsync(NFTTransactionHex);
        const rtnSubmitNFTTransaction = await desoApi.submitTransaction(signedNFTTransactionHex); 

        if(rtnSubmitNFTTransaction) {
            setMessage(`🎉 ${i+1} NFT created!`)
            console.log(rtnSubmitNFTTransaction)
        }*/
    }

    mintNFTs = async () => {
        const { files } = this.state;

        if(files.length > 0) {
            const totalNFTs = files.length / 2;
            
            for(let i = 0; i < totalNFTs; i++) {
                /*const imageToUpload = files.find(file => file.name == `${i}.png`);
                const imageInArweave = this.uploadImageToArweave(imageToUpload);*/

                /*const metadataFile = files.find(file => file.name == `${i}.json`);
                const metadata = this.readMetadata(metadataFile);

                const DeSoPostHashHex = this.createDeSoPost(imageInArweave, metadata);
                this.convertDeSoPostToNFT(DeSoPostHashHex);*/
            }
        }
    }


    render () {
        const { isLogged, files } = this.state;
        
        return (
            <Fragment>
                <iframe
                    title="desoidentity"
                    id="identity"
                    frameBorder="0"
                    src="https://identity.deso.org/embed?v=2"
                    style={{height: "100vh", width: "100vw", display: "none", position: "fixed",  zIndex: 1000, left: 0, top: 0}}
                ></iframe>
                
                <div className="p-4 bg-blue-200 text-center">
                    <h1 className="font-heading text-6xl text-yellow-500">First open NFT Minting Machine for DeSo</h1>
                    <h1 className="font-heading text-4xl text-blue-500">DiamondTools</h1>

                    <a href="https://www.discord.gg/FnRXpJbsFn" target="_blank">
                        <div className="max-w-max mx-auto p-2 bg-white rounded-lg flex gap-2 items-center">
                            <img className="w-5 h-5" src="/social-icons/discord.svg" />
                            Join project!
                        </div>
                    </a>
                </div>
                <div className="max-w-max my-16 mx-auto p-4 bg-blue-400 rounded-lg text-center">
                    <h2 className="font-heading text-4xl text-white pb-2">metadata standar</h2>

                    <img className="mx-auto" src="/images/metadata-standar.png" />
                </div>

                {
                    isLogged ? (
                        <button onClick={this.login} className="bg-purple-400 hover:bg-purple-300 py-2 px-4">Logout</button>
                    ) : (
                        <button onClick={this.logout} className="bg-purple-400 hover:bg-purple-300 py-2 px-4">Login</button>
                    )
                }

                <div className="relative px-2 grid grid-cols-3 gap-4">
                    {
                        isLogged === false && <div className="absolute min-w-full min-h-full bg-red-200 flex justify-center items-center">have to login.</div>
                    }
                    <div>
                        <h2 className="font-heading text-3xl">1. Upload your assets (metadata .json & art .png)</h2>
                        <FileInput files={files} handleFiles={this.handleFiles} />
                    </div>

                    <div>
                        <h2 className="font-heading text-3xl">2. Mint your NFT collection</h2>
                        <button onClick={this.mintNFTs} className="px-4 py-2 rounded-sm bg-purple-800 text-white hover:bg-purple-900">Easy af!</button>
                    </div>

                    <div>
                        <h2 className="font-heading text-3xl">3. Minted NFTs</h2>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default IndexPage;