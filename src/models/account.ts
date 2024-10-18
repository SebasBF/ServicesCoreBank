import query from "../db";

export class AccountModel {

  async newAccount(accountNumber: string, cedula: string, accountType: string){
    const newAccount = await query("INSERT INTO cuentas (numerocuenta, cedula, tipocuenta, saldo) values ($1, $2, $3, $4) ", [accountNumber, cedula, accountType, '0'])
    return newAccount.rows[0];
  }

  async getAllAccounts(){
    const accounts = await query("SELECT * from cuentas", [])
    return accounts.rows;
  }

  async getAccountById(id: string){
    const user = await query("SELECT * from cuentas where cedula = $1", [id])
    return user.rows;
  }
  
  async getAccountByAN(accountId: string){
    const user = await query("SELECT * from cuentas where numerocuenta = $1", [accountId])
    return user.rows;
  }

  async deleteAccount(id: string){
    const user = await query("DELETE from cuentas where numerocuenta = $1", [id])
    return user.rows;
  }
}