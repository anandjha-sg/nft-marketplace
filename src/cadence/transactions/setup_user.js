export const setupUserTx = `
import FungibleToken from 0x9a0766d93b6608b7
import MyNFT from 0x4ce71b5fc17521fc
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x4ce71b5fc17521fc
import FlowToken from 0x7e60df042a9c0868

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- MyNFT.createEmptyCollection(), to: /storage/MyCryptonautCollection)
    acct.link<&MyNFT.Collection{MyNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/MyCryptonautCollection, target: /storage/MyCryptonautCollection)
    acct.link<&MyNFT.Collection>(/private/MyCryptonautCollection, target: /storage/MyCryptonautCollection)
    
    let MyCryptonautCollection = acct.getCapability<&MyNFT.Collection>(/private/MyCryptonautCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- NFTMarketplace.createSaleCollection(MyNFTCollection: MyCryptonautCollection, FlowTokenVault: FlowTokenVault), to: /storage/MyCryptonautSaleCollection)
    acct.link<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>(/public/MyCryptonautSaleCollection, target: /storage/MyCryptonautSaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}

`