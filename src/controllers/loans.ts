import { LoansModel } from '../models/loans';
import { Request, Response } from 'express';

export class LoansController {
  loansModel: LoansModel;
  allHandler: Object;
  byIdHandler: Object;
  newLoanHandler: Object;

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
    this.newLoanHandler = {
      PP: this.loansModel.newLoanPayment,
      P: this.loansModel.newLoan
    }  
  }

  getLoanById = async(req: Request, res: Response) => {
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

  getAllLoans= async(req: Request, res: Response) => {
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

  newLoan = async(req: Request, res: Response) => {
    try{
      const loanType = req.query.loanType as string;
      const {cedula, monto, numerocuenta, tasainteres, plazomeses, saldorestante, estado} = req.body
      if(!loanType){
        res.status(400).json({error: 'loanType can not be null'})
        return;
      }else if(!cedula || !monto || !numerocuenta || !tasainteres || !plazomeses || !saldorestante || !estado){
        res.status(400).json({error: 'all fields are required'})
        return;
      }
      const transactions = this.newLoanHandler[loanType as keyof typeof this.newLoanHandler] as typeof this.loansModel.newLoan;
      const realTransactions = await transactions(cedula,monto,tasainteres,plazomeses,saldorestante,estado,numerocuenta);
      res.json({ data: realTransactions })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  // Método para registrar un pago de préstamo
  newLoanPayment = async (req: Request, res: Response) => {
    try {
      const loanType = req.query.loanType as string;
      const { idprestamo, numerocuenta, tipopago, monto } = req.body;

      if (!loanType) {
        res.status(400).json({ error: 'loanType can not be null' });
        return;
      }
      if (!idprestamo || !numerocuenta || !tipopago || !monto) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
      const transactions = this.newLoanHandler[loanType as keyof typeof this.byIdHandler] as typeof this.loansModel.newLoanPayment;
      const realTransactions = await transactions(idprestamo,numerocuenta,tipopago,monto);
      res.json({ data: realTransactions })

    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  };
}
