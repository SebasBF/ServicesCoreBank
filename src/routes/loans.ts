import { Router } from "express";
import { LoansController } from "../controllers/loans";
import { LoansModel } from "../models/loans";

export const createLoansRouter = ({ loansModel }: { loansModel: LoansModel }) => {
 
    const loansRouter = Router();
    
    const loansController = new LoansController({loansModel})
    
    loansRouter.get('/all', loansController.getAllLoans)
    loansRouter.get('/:id', loansController.getLoanById)
   
    return loansRouter;
}
