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


  async newTransfer(accountId: string, accountTransfered: string, bank: string, amount: number){
    try {
      
      await query("BEGIN",[])

      const result = await query("SELECT saldo FROM cuentas WHERE numerocuenta = $1", [accountId]);
      const currentBalance = result.rows[0].saldo;
      
      if(currentBalance < amount){
        throw new Error('Saldo insuficiente para realizar la transferencia');
      }
      else{

        let newBalance: number = Number(currentBalance) - Number(amount) 

        const result2 = await query("SELECT saldo FROM cuentas WHERE numerocuenta = $1", [accountTransfered]);
        const currentBalance2 = result2.rows[0].saldo
      
        let newBalance2: number = Number(currentBalance2) + Number(amount)  

        await query("UPDATE cuentas SET saldo = $1 WHERE numerocuenta = $2", [newBalance.toString(), accountId]);
        await query("UPDATE cuentas SET saldo = $1 WHERE numerocuenta = $2", [newBalance2.toString(), accountTransfered]);

        await query(
          "INSERT INTO transferencias(numerocuenta, numerocuentadestino, bancodestino, monto, estado) VALUES ($1, $2, $3, $4, $5)",
          [accountId, accountTransfered , bank, amount.toString(), 'Completada']
        );

        await query("COMMIT", []); 
      }
           
    } catch (error) {

      await query("ROLLBACK",[])
      console.log(error)
      throw error;
    }
  }
}