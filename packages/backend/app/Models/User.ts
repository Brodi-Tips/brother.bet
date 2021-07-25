//import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  //@column.dateTime({ autoCreate: true })
  //public createdAt: DateTime
  @column()
  public name_user: string;

  @column()
  public username: string;



  //@column.dateTime({ autoCreate: true, autoUpdate: true })
  //public updatedAt: DateTime
}
