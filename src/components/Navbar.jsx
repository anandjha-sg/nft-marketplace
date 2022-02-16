import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    var button = ''
    if (props.isLoggedIn) {
        button = <div ><b>{props.user.addr}</b></div>
        document.getElementById('logout').style.display = "block"
    } else {
        button = <div className="navbar-buttons mbr-section-btn"><a className="btn btn-primary display-4" onClick={(e) => props.logIn(e)} >Setup Wallet</a></div>
    }
    return (
        <section data-bs-version="5.1" className="menu menu3 cid-sWYFlKMfUq" once="menu" id="menu3-l">
            <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <span className="navbar-logo">
                            <img src="assets/images/mbr-124x174.png" alt="Mobirise" style={{ height: '4.7rem' }} />
                        </span>
                        <span className="navbar-caption-wrap"><a className="navbar-caption text-black display-7" >Cryptonaut</a></span>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-target="#navbarSupportedContent" data-bs-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <div className="hamburger">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                            <li className="nav-item"><Link className="nav-link link text-black text-primary display-4" to="/">Marketplace</Link></li>
                            <li className="nav-item"><Link className="nav-link link text-black text-primary display-4" to="./mintnft">Minted NFT</Link></li>
                        </ul>
                        <div className="icons-menu" id='logout' style={{ display: "none" }}>
                            <a className="iconfont-wrapper" target="_blank" onClick={(e) => props.logOut(e)}>
                                <span className="p-2 mbr-iconfont mobi-mbri-logout mobi-mbri" />
                            </a>
                            <a className="iconfont-wrapper" target="_blank" onClick={(e) => props.setupUser(e)}>
                                <span className="p-2 mbr-iconfont mobi-mbri-folder mobi-mbri" />
                            </a>
                        </div>
                        {button}
                    </div>
                </div>
            </nav>
        </section >
    )
}
