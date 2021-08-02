import UsersController from "../app/Controllers/Http/UsersController"

import Route from '@ioc:Adonis/Core/Route'

const userController = new UsersController();

Route.post("/",userController.create);
Route.get("/",userController.index);

