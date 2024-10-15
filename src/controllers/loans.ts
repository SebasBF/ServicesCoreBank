import { LoansModel } from '../models/loans';
import { Request, Response } from 'express';

export class LoansController {
  loansModel: LoansModel;
  allHandler: Object;
  byIdHandler: Object;

  constructor({loansModel}: {loansModel: LoansModel}){
    this.loansModel = loansModel
    this.allHandler = {
      PP: this.loansModel.getAllLoans,
      P: this.loansModel.getAllLoans
    }
    this.byIdHandler = {
      PP: this.loansModel.getLoanById,
      P: this.loansModel.getLoanById
    }
  }

  getAllLoans = async(req: Request, res: Response) => {
    try{
      const loanType = req.query.loanType as string;
      const { id } = req.params;
      if(!loanType){
        res.status(400).json({error: 'loanType can not be null'})
        return;
      }
      const transactions = this.allHandler[loanType as keyof typeof this.allHandler] as typeof this.loansModel.getLoanById;
      const realTransactions = await transactions(id);
      res.json({ data: realTransactions })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getLoanById = async(req: Request, res: Response) => {
    try{
      const loanType = req.query.loanType as string;
      if(!loanType){
        res.status(400).json({error: 'loanType can not be null'})
        return;
      }
      const transactions = this.byIdHandler[loanType as keyof typeof this.byIdHandler] as typeof this.loansModel.getAllLoans;
      const realTransactions = await transactions();
      res.json({ data: realTransactions })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

}
