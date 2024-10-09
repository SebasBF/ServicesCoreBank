import { Router } from "express";
import { UserController } from "../controllers/user";
import { UserModel } from "../models/user";

export const createUserRouter = ({ userModel }: {userModel: UserModel}) => {
 
    const userRouter = Router();
    
    const userController = new UserController({userModel})
    
    userRouter.post('/login', userController.login)
    userRouter.get('/all', userController.getAllUsers)
    userRouter.get('/:cedula', userController.getUserById)
    userRouter.post('/create', userController.newUser)
    userRouter.delete('/:cedula', userController.deleteUser)

    return userRouter;
}
