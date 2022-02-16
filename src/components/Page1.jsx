import React from 'react'
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { create } from 'ipfs-http-client';
import { getNFTsScript } from "../cadence/scripts/get_nfts.js";
import { listForSaleTx } from "../cadence/transactions/list_for_sale.js";
import { unlistFromSaleTx } from "../cadence/transactions/unlist_from_sale.js";
import { mintNFT } from "../cadence/transactions/mint_nft.js";

const client = create('https://ipfs.infura.io:5001/api/v0');
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

export default function Page1(props) {
    const [price, setPrice] = useState()
    const [nameOfNFT, setNftName] = useState('');
    const [file, setFile] = useState();
    const [mintedNFTS, setMintedNFTS] = useState([]);

    useEffect(() => {
        if (props.loggedIn)
            getUserNFTs()
    }, [])

    const getUserNFTs = async () => {
        const result = await fcl.send([
            fcl.script(getNFTsScript),
            fcl.args([
                fcl.arg(props.address, t.Address)
            ])
        ]).then(fcl.decode);
        console.log(result);
        setMintedNFTS(result);
    }


    const listForSale = async (id) => {
        if (!price) {
            document.getElementById(`price-${id}`).style.borderColor = 'red';
            alert("please enter the price u want to sell for")
            return;
        }
        const transactionId = await fcl.send([
            fcl.transaction(listForSaleTx),
            fcl.args([
                fcl.arg(id, t.UInt64),
                fcl.arg((parseFloat(price)).toFixed(1), t.UFix64)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999)
        ]).then(fcl.decode);

        console.log(transactionId);
        return fcl.tx(transactionId).onceSealed();
    }

    const unlistFromSale = async (id) => {
        const transactionId = await fcl.send([
            fcl.transaction(unlistFromSaleTx),
            fcl.args([
                fcl.arg(parseInt(id), t.UInt64)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999)
        ]).then(fcl.decode);
        console.log(transactionId);
        return fcl.tx(transactionId).onceSealed();
    }

    const mintNewNft = async () => {
        try {
            console.log(file, nameOfNFT);
            const added = await client.add(file)
            const hash = added.path;

            const transactionId = await fcl.send([
                fcl.transaction(mintNFT),
                fcl.args([
                    fcl.arg(hash, t.String),
                    fcl.arg(nameOfNFT, t.String)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(9999)
            ]).then(fcl.decode);

            console.log(transactionId);
            fcl.tx(transactionId).onceSealed().then(() => {
                getUserNFTs()
            })
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }

    return (
        <div>
            {/* Site made with Mobirise Website Builder v5.6.0, https://mobirise.com */}
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="generator" content="Mobirise v5.6.0, mobirise.com" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
            <link rel="shortcut icon" href="assets/images/mbr-124x174.png" type="image/x-icon" />
            <meta name="description" content />
            <title>Mint NFT</title>
            <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css" />
            <link rel="stylesheet" href="assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css" />
            <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css" />
            <link rel="stylesheet" href="assets/dropdown/css/style.css" />
            <link rel="stylesheet" href="assets/socicon/css/styles.css" />
            <link rel="stylesheet" href="assets/theme/css/style.css" />
            <link rel="preload" href="https://fonts.googleapis.com/css?family=Jost:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
            <noscript>&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&amp;display=swap"&gt;</noscript>
            <link rel="preload" as="style" href="assets/mobirise/css/mbr-additional.css" /><link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css" />
            <section data-bs-version="5.1" className="gallery2 cid-sX0X2aUdgD" id="gallery2-x">
                <div className="container">
                    <div className="mbr-section-head" >
                        <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2"><strong>List Your Minted NFTs for sale</strong></h4>
                        <div className="navbar-buttons mbr-section-btn" ><a className="btn btn-primary display-4" href="#form4-y">Mint New</a></div>
                    </div>
                    <div className="row mt-4">
                        {mintedNFTS.map(NFT => (
                            <div className="item features-image сol-12 col-md-6 col-lg-6" key={NFT.id}>
                                <div className="item-wrapper">
                                    <div className="item-img">
                                        <img src={`https://ipfs.infura.io/ipfs/${NFT.ipfsHash}`} alt='' />
                                    </div>
                                    <div className="item-content">
                                        <h5 className="item-title mbr-fonts-style display-5">{NFT.metadata.name}</h5>
                                        <p className="mbr-text mbr-fonts-style mt-3 display-7">
                                        </p>
                                    </div>
                                    <div className="col-lg-12 col-md col-12 mb-3">
                                        <input className="item-content" type={'text'} placeholder="Enter the price.." onChange={(e) => setPrice(e.target.value)} id={`price-${NFT.id}`}></input>
                                    </div>
                                    <div className="mbr-section-btn item-footer mt-2">
                                        <button onClick={() => listForSale(NFT.id)} className="btn btn-primary item-btn display-7" target="_blank">List For Sale</button>
                                    </div>
                                    <div className="mbr-section-btn item-footer mt-2">
                                        {/* <button onClick={() => unlistFromSale(NFT.id)} className="btn btn-primary item-btn display-7" target="_blank">List For Sale</button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section>
            <section data-bs-version="5.1" className="form4 cid-sX0XbCK4Ge mbr-fullscreen" id="form4-y">
                <div className="container" id='formfill'>
                    <div className="row content-wrapper justify-content-center">
                        <div className="col-lg-3 offset-lg-1 mbr-form" data-form-type="formoid">
                            <form className="mbr-form form-with-styler" ><input type="hidden" name="email" />
                                <div className="row">
                                    <div hidden="hidden" data-form-alert className="alert alert-success col-12">Thanks for filling out the form!</div>
                                    <div hidden="hidden" data-form-alert-danger className="alert alert-danger col-12">
                                        Oops...! some problem!
                                    </div>
                                </div>
                                <div className="dragArea row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <h1 className="mbr-section-title mb-4 display-2"><strong>Let's Get Your Art Pay Your Bills</strong></h1>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <p className="mbr-text mbr-fonts-style mb-4 display-7">
                                            Fill some descriptions and select the file you want to tokenize</p>
                                    </div>
                                    <div className="col-lg-12 col-md col-12 form-group mb-3" data-for="name">
                                        <input onChange={(e) => setNftName(e.target.value)} type="text" name="name" placeholder="Name" data-form-field="name" className="form-control" defaultValue id="name-form4-y" />
                                    </div>
                                    <div className="col-lg-12 col-md col-12 form-group mb-3" data-for="email">
                                        <input onChange={(e) => setFile(e.target.files[0])} type="file" className="form-control" id="email-form4-y" />
                                    </div>
                                    <div onClick={() => mintNewNft()} className="col-12 col-md-auto mbr-section-btn"><button type="button" className="btn btn-secondary display-4"><span className="mbri-video-play mbr-iconfont mbr-iconfont-btn" />Mint NFT</button></div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-7 offset-lg-1 col-12">
                            <div className="image-wrapper">
                                <img className="w-100" src="assets/images/sq4.gif" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section data-bs-version="5.1" className="  cid-sX10Xuk6Tc mbr-reveal" once="footers" id=" -14">
                <div className="container">
                    <div className="media-container-row align-center mbr-white">
                        <div className="row row-copirayt">
                            <p className="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7">
                                © Copyright 2022 Made with ❤️ By Anand Jha<br />&nbsp;All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
