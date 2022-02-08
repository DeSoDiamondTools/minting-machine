import React, { PureComponent, Fragment } from "react";

//import { } from "../src/sections/indexPage";

import ReactFileReader from 'react-file-reader';

class FileInput extends PureComponent {
    state = {
        files: []
    }

    handleFiles = (files) => {
        console.log(files.base64)
    }

    render () {
        const { files } = this.state;

        return (
            <div>
                {Boolean(files.length) && (
                    <div>Selected files: {files.map(f => f.name).join(", ")}</div>
                )}

                <ReactFileReader fileTypes={[".json",".png"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
                Click to select some files...
                </ReactFileReader>
            </div>
        )
    }
}

class IndexPage extends PureComponent {
    render () {
        return (
            <Fragment>
                <div className="p-4 bg-blue-200 text-center">
                    <h1 className="font-heading text-4xl text-blue-500">DiamondTools</h1>
                    <h1 className="font-heading text-6xl text-yellow-500">First open NFT Minting Machine for DeSo</h1>
                    
                    <a href="https://www.discord.gg/FnRXpJbsFn" target="_blank">
                        <div className="max-w-max mx-auto p-2 bg-white hover:bg-purple-200 rounded-lg flex gap-2 items-center">
                            <img className="w-5 h-5" src="/social-icons/discord.svg" />
                            Join project!
                        </div>
                    </a>
                </div>
                <div className="max-w-max my-16 mx-auto p-4 bg-blue-400 rounded-lg text-center">
                    <h2 className="font-heading text-4xl text-white pb-2">metadata standar</h2>

                    <img className="mx-auto" src="/images/metadata-standar.png" />
                </div>

                <div className="px-2 grid grid-cols-3">
                    <div>
                        <h2 className="font-heading text-3xl">1. Upload your assets (metadata .json & art .png)</h2>
                        <FileInput />
                    </div>

                    <div>
                        <h2 className="font-heading text-3xl">2. Mint your NFT collection</h2>

                        <button className="px-4 py-2 rounded-sm bg-purple-800 text-white hover:bg-purple-900">Easy af!</button>
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