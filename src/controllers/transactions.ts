import { TransactionModel } from '../models/transactions';
import { Request, Response } from 'express';

export class TransactionController {
  transactionModel: TransactionModel;

  constructor({transactionModel}: {transactionModel: TransactionModel}){
    this.transactionModel = transactionModel
  }

  getAllTransactions = async(req: Request, res: Response) => {
    try{
      const transactions = await this.transactionModel.getAllTransactions();
      res.json({ data: transactions })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getTransactionById = async(req: Request, res: Response) => {
    try{
      const { accountId } = req.params;
      if(!accountId){
        res.status(400).json({error: 'accountId can not be null'})
        return;
      }
      const transaction = await this.transactionModel.getTransactionById(accountId);
      res.json({ data: transaction })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

}
