import { Router } from "express";
import { UserController } from "../controllers/user";
import { UserModel } from "../models/user";
import { ClientController } from "../controllers/client";
import { ClientModel } from "../models/client";

export const createClientRouter = ({ clientModel }: {clientModel: ClientModel}) => {
 
    const clientRouter = Router();
    
    const clientController = new ClientController({clientModel})
    
    clientRouter.post('/login', clientController.login)
    clientRouter.get('/all', clientController.getAllUsers)
    clientRouter.get('/:cedula', clientController.getUserById)
    clientRouter.post('/create', clientController.newUser)
    clientRouter.delete('/:cedula', clientController.deleteUser)

    return clientRouter;
}
