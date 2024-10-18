import query from "../db";

export class LoansModel {

  async getAllLoans(){
    const transactions = await query("SELECT * from prestamos", [])
    return transactions.rows;
  }

  async getLoanById(cedula: string){
    const transaction = await query("SELECT * from prestamos where cedula = $1", [cedula])
    return transaction.rows;
  }

 async newLoan(cedula: string, amount: number, interestRate: number, loanPeriod: number, amountLeft: number, status: string, accountId: string){
  await query("BEGIN",[])

      const result = await query("SELECT saldo FROM cuentas WHERE numerocuenta = $1", [accountId]);
      const currentBalance = result.rows[0].saldo

      const newBalance = Number(currentBalance) + Number(amount)

      await query("UPDATE cuentas SET saldo = $1 WHERE numerocuenta = $2", [newBalance.toString(), accountId]);

      await query("INSERT into prestamos(cedula, monto, tasainteres, plazomeses, saldorestante, estado, numerocuenta) values ($1, $2, $3, $4, $5, $6, $7)",
        [cedula, amount.toString(), interestRate.toString(), loanPeriod.toString(), amountLeft.toString(), status, accountId])
      
  await query("COMMIT",[])

 }

 async newLoanPayment(loanId: number, accountId: string, typePayment: string, amount: number){
  try {

    await query("BEGIN",[])
      
      const result = await query("SELECT saldo FROM cuentas WHERE numerocuenta = $1", [accountId]);
      const currentBalance = result.rows[0].saldo

      if(currentBalance < amount){
        throw new Error('Saldo insuficiente para realizar el pago de préstamo.');
      }
      else{

         const newBalance = Number(currentBalance) -  Number(amount)
         await query("UPDATE cuentas SET saldo = $1 WHERE numerocuenta = $2", [newBalance.toString(), accountId]);

         const result2 = await query("SELECT saldorestante FROM prestamos WHERE idprestamo = $1", [loanId.toString()]);
         const loanBalance = result2.rows[0].saldorestante

         if(loanBalance == 0){
          return "Prestamo pagado completamente"
        }else if(amount > loanBalance){
           return "Esta intentando pagar más que el saldo restante"
        }else{
         const loanNewBalance = Number(loanBalance) - Number(amount)
         await query("UPDATE prestamos SET saldorestante = $1 WHERE idprestamo = $2", [loanNewBalance.toString(), loanId.toString()]);

         await query("INSERT into pago_prestamos(idprestamo, numerocuenta, tipopago, monto) values($1, $2, $3, $4)",
          [loanId.toString(),accountId,typePayment,amount.toString()])        
        }      

      }

    await query("COMMIT", []);  

  } catch (error) {
     await query("ROLLBACK",[])
      console.log(error)
      throw error
    }
 }
}