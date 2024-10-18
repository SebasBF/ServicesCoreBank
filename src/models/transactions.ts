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

  handleRetiro(currentBalance: number, amount: number): number{
    if(currentBalance < amount){
      throw new Error('Saldo insuficiente para realizar el retiro.');
    }
   // console.log(`About to perform Retiro with current balance: ${currentBalance} and amount ${amount} getting ${currentBalance - amount}`)
    return Number(currentBalance) - Number(amount)
  }

  handleDeposito(currentBalance: number, amount: number): number{
   // console.log(`About to perform deposito with current balance: type ${typeof currentBalance} and value: ${currentBalance} and amount type ${typeof amount} and value: ${amount} getting ${currentBalance + amount}`)
    return Number(currentBalance) + Number(amount)
  }

  async newTransaction(accountId: string, amount: number, transactionType: string, description: string){
    try {    
      await query("BEGIN",[])
      
      const result = await query("SELECT saldo FROM cuentas WHERE numerocuenta = $1", [accountId]);
      
      if (result.rows.length === 0) {
        throw new Error("Cuenta no encontrada");
    }
      const currentBalance = result.rows[0].saldo;
      
      const handlers = {
        "Deposito": this.handleDeposito,
        "Retiro": this.handleRetiro
      }

      const newBalance = handlers[transactionType as keyof typeof handlers](currentBalance, amount)
      
      await query("UPDATE cuentas SET saldo = $1 WHERE numerocuenta = $2", [newBalance.toString(), accountId]);

      await query(
        "INSERT INTO transacciones(numerocuenta, monto, tipotransaccion, descripcion) VALUES ($1, $2, $3, $4)",
        [accountId, amount.toString(), transactionType, description]
      );

      await query("COMMIT", []); 
            
    } 
    catch (error) {
      await query("ROLLBACK",[])
      console.log(error)
      throw error
    }    
    
  }
}