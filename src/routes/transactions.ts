import { Router } from "express";
import { TransactionController } from "../controllers/transactions";
import { TransactionModel } from "../models/transactions";

export const createTransactionRouter = ({ transactionModel }: {transactionModel: TransactionModel}) => {
 
    const transactionRouter = Router();
    
    const transactionController = new TransactionController({transactionModel})
    
    transactionRouter.get('/all', transactionController.getAllTransactions)
    transactionRouter.get('/:accountId', transactionController.getTransactionById)
    transactionRouter.post('/create',transactionController.newTransaction)
   
    return transactionRouter;
}
