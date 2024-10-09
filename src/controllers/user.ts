import { UserModel } from "../models/user";
import { Request, Response } from 'express';

export class UserController {
  userModel: UserModel;

  constructor({userModel}: {userModel: UserModel}){
    this.userModel = userModel
  }

  newUser = async(req: Request, res: Response) => {
    try{
      const { nombre, apellido, direccion, telefono, cedula, email, idrol, password } = req.body;
      if(!nombre || !apellido || !direccion || !telefono || !cedula || !email || !idrol){
        res.status(400).json({error: 'all fields are required'})
        return;
      }
      const user = await this.userModel.newUser(
        nombre, 
        apellido, 
        direccion, 
        telefono, 
        cedula, 
        email, 
        idrol, 
        password
      );
      res.json({ success: true})
    }
    catch(e: any){
      res.status(500).json({ error: e.message, message: 
        'error creating user'
       })
    }
  }

  login = async(req: Request, res: Response) => {
      try{
          const { cedula, password } = req.body
          if(!cedula || !password){
              res.status(400).json({success: false, message: "document or password can not be null"})
              return;
          }
          const { success } = await this.userModel.login(cedula, password);
          
          if(!success){
              res.status(400).json({success: false, message: "document or password incorrect"})
              return;
          }  
          res.json({ success })
          return;
      }
      catch(e: any){
          res.status(500).json({ error: e.message })
      }
  }

  getAllUsers = async(req: Request, res: Response) => {
    try{
      const users = await this.userModel.getAllUsers();
      res.json({ data: users })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  getUserById = async(req: Request, res: Response) => {
    try{
      const { cedula } = req.params;
      if(!cedula){
        res.status(400).json({error: 'cedula can not be null'})
        return;
      }
      const user = await this.userModel.getUserById(cedula);
      res.json({ data: user })
    }
    catch(e: any){
      res.status(500).json({ error: e.message })
    }
  }

  deleteUser = async(req: Request, res: Response) => {
    try{
      const { cedula } = req.params;
      if(!cedula){
        res.status(400).json({error: 'cedula can not be null', success: false})
        return;
      }
      const user = await this.userModel.deleteUser(cedula);
      res.json({success: true})
    }
    catch(e: any){
      res.status(500).json({ error: e.message, success: false })
    }
  }
}
