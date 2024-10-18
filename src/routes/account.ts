import { Router } from "express";
import { AccountController } from "../controllers/account";
import { AccountModel } from "../models/account";

export const createAccountRouter = ({ accountModel }: {accountModel: AccountModel}) => {
 
    const accountRouter = Router();
    
    const accountController = new AccountController({accountModel})
    
    accountRouter.get('/all', accountController.getAllAccounts)
    accountRouter.get('/:cedula', accountController.getAccountById)
    accountRouter.get('/cuenta/:numerocuenta', accountController.getAccountByAN)
    accountRouter.post('/create', accountController.newAccount)
    accountRouter.delete('/:accountNumber', accountController.deleteAccount)

    return accountRouter;
}
