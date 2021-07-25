import UsersController from "../app/Controllers/Http/UsersController"

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

const userController = new UsersController();

Route.post("/",userController.create);
Route.get("/",userController.index);

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

