import { Request, Response } from 'express';
import { TransferModel } from '../models/transfers';

export class TransferController {
  transferModel: TransferModel;

  constructor({transferModel}: {transferModel: TransferModel}){
    this.transferModel = transferModel
  }

  getAllTransfers = async(req: Request, res: Response) => {
    try{
      const transactions = await this.transferModel.getAllTransfers()
      res.json({ data: transactions })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getTransfersByAccountId = async(req: Request, res: Response) => {
    try{
      const { accountId } = req.params;
      if(!accountId){
        res.status(400).json({error: 'accountId can not be null'})
        return;
      }
      const transaction = await this.transferModel.getTransfersByAccountId(accountId);
      res.json({ data: transaction })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

}
