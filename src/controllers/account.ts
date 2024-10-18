import { AccountModel } from '../models/account';
import { Request, Response } from 'express';

export class AccountController {
  accountModel: AccountModel;

  constructor({ accountModel }: { accountModel: AccountModel }){
    this.accountModel = accountModel
  }

  newAccount = async(req: Request, res: Response) => {
    try{
      const { numerocuenta, cedula, tipocuenta } = req.body;
      if(!numerocuenta || !cedula || !tipocuenta){
        res.status(400).json({error: 'all fields are required'})
        return;
      }
      const account = await this.accountModel.newAccount(numerocuenta, cedula, tipocuenta);
      res.json({ success: true })
    }
    catch(e: any){
      res.status(500).json({ error: e.message, message: 
        'error creating the account'
       })
    }
  }

  getAllAccounts = async(req: Request, res: Response) => {
    try{
      const users = await this.accountModel.getAllAccounts();
      res.json({ data: users })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getAccountById = async(req: Request, res: Response) => {
    try{
      const { cedula } = req.params;
      if(!cedula){
        res.status(400).json({error: 'cedula can not be null'})
        return;
      }
      const user = await this.accountModel.getAccountById(cedula);
      res.json({ data: user })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getAccountByAN = async(req: Request, res: Response) => {
    try{
      const { numerocuenta } = req.params;
      if(!numerocuenta){
        res.status(400).json({error: 'numerocuenta can not be null'})
        return;
      }
      const user = await this.accountModel.getAccountByAN(numerocuenta);
      res.json({ data: user })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  deleteAccount = async(req: Request, res: Response) => {
    try{
      const { accountNumber } = req.params;
      if(!accountNumber){
        res.status(400).json({error: 'accountNumber can not be null', success: false})
        return;
      }
      const user = await this.accountModel.deleteAccount(accountNumber);
      res.json({success: true})
    }
    catch(e: any){
      res.status(500).json({ error: e.message, success: false })
    }
  }
}
