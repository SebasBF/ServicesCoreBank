import query from "../db";

export class TransactionModel {

  async getAllTransactions(){
    const transactions = await query("SELECT * from transacciones", [])
    return transactions.rows;
  }

  async getTransactionById(accountId: string){
    const transaction = await query("SELECT * from transacciones where numerocuenta = $1", [accountId])
    return transaction.rows;
  }
}