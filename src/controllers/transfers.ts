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
  newTransfer = async(req: Request, res: Response) => {
    try {
      const {numerocuenta, numerocuentadestino, bancodestino, monto} = req.body;
      if(!numerocuenta || !numerocuentadestino || !bancodestino || !monto){
        res.status(400).json({error: 'all fields are required'})
        return;
      }
      await this.transferModel.newTransfer(
        numerocuenta,
        numerocuentadestino,
        bancodestino,
        monto   
      )
      console.log()
      res.json({ success: true})

     } catch (e: any) {
      res.status(500).json({ error: e.message, message: 
        'error making the transfer'
       })
     }
  }
}
