import query from "../db";

export class TransferModel {

  async getAllTransfers(){
    const transactions = await query("SELECT * from transferencias", [])
    return transactions.rows;
  }

  async getTransfersByAccountId(accountId: string){
    const transaction = await query("SELECT * from transferencias where numerocuenta = $1", [accountId])
    return transaction.rows;
  }
}