import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User';

export default class UsersController {

  public async create({request}: HttpContextContract ){

     const {username,name} = request.only(["name","username"]);
     const user = await User.create({
       username,
       name
     });
     return user;
     //console.log(data);
  }

  public async index(){
    const all = await User.all();
    return all;
  }
}
