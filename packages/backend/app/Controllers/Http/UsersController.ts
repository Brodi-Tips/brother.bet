import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import User from '../../Models/User';
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";


export default class UsersController {

  public async create({request}: HttpContextContract ){

     const {username,name_user} = request.only(["name_user","username"]);
     const user = await User.create({
       username,
       name_user
     });
     return user;
     //console.log(data);
  }



  public async index(){
    const games = await Database
    .query()  // 👈 gives an instance of select query builder
    .from('users')
    .select('*')
    .limit(100)

    //.rawQuery(
    // `select *
    //  from fifa.view_games
    //  limit 100`
    //)
    return games;

    Sentry.init({
      dsn: "https://9b6573901ecb40c1a9247642b19df4b4@o910096.ingest.sentry.io/5844929",
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
}
