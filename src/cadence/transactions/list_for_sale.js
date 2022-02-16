export const listForSaleTx = `
import NFTMarketplace from 0x4ce71b5fc17521fc

transaction(id: UInt64, price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MyCryptonautSaleCollection)
                            ?? panic("This SaleCollection does not exist")
    
    saleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
`