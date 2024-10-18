import { Router } from "express";
import { TransferController } from "../controllers/transfers";
import { TransferModel } from "../models/transfers";

export const createTransferRouter = ({ transferModel }: {transferModel: TransferModel}) => {
 
    const transferRouter = Router();
    
    const transferController = new TransferController({transferModel})
    
    transferRouter.get('/all', transferController.getAllTransfers)
    transferRouter.post('/create', transferController.newTransfer)
    transferRouter.get('/:accountId', transferController.getTransfersByAccountId)
    
    return transferRouter;
}
