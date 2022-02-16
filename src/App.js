
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/index'
import Page1 from './components/Page1'
import * as fcl from "@onflow/fcl";
// import * as t from "@onflow/types";
import { useState, useEffect } from 'react';
import { setupUserTx } from "./cadence/transactions/setup_user.js";
import Navbar from './components/Navbar';


fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

  async function logIn(event) {
    event.preventDefault();
    const thisUser = await fcl.authenticate()
    console.log(thisUser.addr);
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: thisUser.addr
      })
    })
  }

  function logOut(event) {
    event.preventDefault();
    fcl.unauthenticate()
  }

  const setupUser = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(setupUserTx),
      fcl.args([]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    alert("User setup complete you are ready to create transactions", transactionId)
    return await fcl.tx(transactionId).onceSealed();
  }


  return (
    <div className="App">
      <Navbar logIn={logIn} user={user} isLoggedIn={user.loggedIn} logOut={logOut} setupUser={setupUser} />
      <Routes>
        <Route path="/" element={<Home address={user.addr} loggedIn={user.loggedIn} />} />
        if (!{user.loggedIn}) {
          <></>
        } else {
          (<>
            <Route path="mintnft" element={<Page1 address={user.addr} loggedIn={user.loggedIn} />} />
          </>)
        }

      </Routes>
    </div>
  );
}
export default App;