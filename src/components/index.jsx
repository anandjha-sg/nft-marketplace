import React from 'react'
import '../App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useState, useEffect } from 'react';
import { getSaleNFTsScript } from "../cadence/scripts/get_sale_nfts";
import { purchaseTx } from "../cadence/transactions/purchase.js";
export default function Home(props) {
    const [allMarketPlcaeNFT, setNFTs] = useState([]);
    let allNFT = {}
    useEffect(() => {
        if (props.loggedIn)
            fetch('/allusers', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then((allUsers) => {
                    console.log(allUsers);
                    getMarketPlace(allUsers)
                })
    }, [])

    const getMarketPlace = async (allUsers) => {
        let len = Object.keys(allUsers).length;
        for (const address in allUsers) {
            len = len - 1
            await getUserSaleNFTs(address)
            //set nfts when every user is fetched
            if (len == 0) {
                console.log(allNFT);
                setNFTs(allNFT)
            }
        }

    }

    const getUserSaleNFTs = async (address) => {
        const result = await fcl.send([
            fcl.script(getSaleNFTsScript),
            fcl.args([
                fcl.arg(address, t.Address)
            ])
        ]).then(fcl.decode);
        allNFT[address] = result;
    }

    const purchase = async (id, address) => {
        console.log(parseInt(id))
        const transactionId = await fcl.send([
            fcl.transaction(purchaseTx),
            fcl.args([
                fcl.arg(address, t.Address),
                fcl.arg(parseInt(id), t.UInt64)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999)
        ]).then(fcl.decode);

        console.log(transactionId);
        fcl.tx(transactionId).onceSealed().then(() => {
            alert(`Transaction successful id - ${transactionId}`)
        });
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
            <title>Home</title>
            <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css" />
            <link rel="stylesheet" href="assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css" />
            <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css" />
            <link rel="stylesheet" href="assets/dropdown/css/style.css" />
            <link rel="stylesheet" href="assets/socicon/css/styles.css" />
            <link rel="stylesheet" href="assets/theme/css/style.css" />
            <link rel="preload" href="https://fonts.googleapis.com/css?family=Jost:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
            <noscript>&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&amp;display=swap"&gt;</noscript>
            <link rel="preload" as="style" href="assets/mobirise/css/mbr-additional.css" /><link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css" />
            <section data-bs-version="5.1" className="gallery2 cid-sX0XJ6ZfaV" id="gallery2-10">
                <div className="container">
                    <div className="mbr-section-head">
                        <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2"><strong>Buy These Published Collections</strong></h4>
                    </div>
                    <div className="row mt-4">
                        {
                            Object.keys(allMarketPlcaeNFT).map(userNFT =>
                                Object.keys(allMarketPlcaeNFT[userNFT]).map(NFTID =>
                                (
                                    <div className="item features-image сol-12 col-md-6 col-lg-6">
                                        <div className="item-wrapper">
                                            <div className="item-img">
                                                {/* <img src={`https://ipfs.infura.io/ipfs/${userNFT[NFTID].nftRef.ipfsHash}`} alt='' /> */}
                                            </div>
                                            <div className="item-content">
                                                <h5 className="item-title mbr-fonts-style display-5">{allMarketPlcaeNFT[userNFT][NFTID].nftRef.metadata.name}</h5>
                                                <h5 className="item-title mbr-fonts-style display-5">Price - {allMarketPlcaeNFT[userNFT][NFTID].price}</h5>
                                            </div>
                                            <div className="mbr-section-btn item-footer mt-2">
                                                <button onClick={() => purchase(NFTID, userNFT)} href className="btn btn-primary item-btn display-7" target="_blank">Buy NFT  </button>
                                            </div>
                                        </div>
                                    </div>
                                )

                                    // {
                                    //     console.log(allMarketPlcaeNFT[userNFT][NFTID].nftRef.metadata.name);
                                    // }
                                )
                            )
                        }
                    </div>
                </div>
            </section>
            <section data-bs-version="5.1" className="  cid-sX10Xuk6Tc mbr-reveal" once="footers" id=" -14">
                <div className="container">
                    <div className="media-container-row align-center mbr-white">
                        <div className="row row-copirayt">
                            <p className="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7">
                                © Copyright 2022 Made with ❤️ By Anand Jha<br />&nbsp;All Rights Reserved Studio Graphene</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
