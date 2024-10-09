import query from "../db";
import { hashPassword } from '../utils/utils';
import bycrypt from 'bcrypt';

export class UserModel {

  async newUser(nombre: string, apellido: string, direccion: string, telefono: string, cedula: string, email: string, idrol: string, password: string){
    const hashPwd = await hashPassword(password)
    const newUser = await query("INSERT INTO usuarios (nombre, apellido, direccion, telefono, cedula, email, contraseña, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [nombre, apellido, direccion, telefono, cedula, email, hashPwd, idrol])
    return newUser.rows[0];
  }

  async login(email: string, password: string){
      const user = await query("SELECT * from usuarios where cedula = $1", [email])
      if(user.rowCount && user.rowCount > 0){
        const userHashPwd = user.rows[0].contraseña
        const res = await bycrypt.compare(password, userHashPwd)

        if (res){
          return {
            success: true, 
            user: user.rows[0]
          }
        }
      }
      return {
        success: false,
        user
      }
  }

  async getAllUsers(){
    const users = await query("SELECT idusuario, nombre, apellido, direccion, telefono, cedula, email, idrol, fechaingreso from usuarios", [])
    return users.rows;
  }

  async getUserById(id: string){
    const user = await query("SELECT idusuario, nombre, apellido, direccion, telefono, cedula, email, idrol, fechaingreso from usuarios where cedula = $1", [id])
    return user.rows;
  }

  async deleteUser(id: string){
    const user = await query("DELETE from usuarios where cedula = $1", [id])
    return user.rows;
  }
}