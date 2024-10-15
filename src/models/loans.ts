import query from "../db";

export class LoansModel {

  async getAllLoans(){
    const transactions = await query("SELECT * from transacciones", [])
    return transactions.rows;
  }

  async getLoanById(accountId: string){
    const transaction = await query("SELECT * from transacciones where numerocuenta = $1", [accountId])
    return transaction.rows;
  }
}