/* eslint-disable no-param-reassign */
export default class IData {
  constructor({ database, localDB }) {
    // Object
    this.database = database;
    this.localDB = localDB;
  }

  async get() {
    return this.database.getBundle();
  }

  async set(objTable) {
    const tableName = Object.keys(objTable)[0];
    await this.localDb.deleteTableDB(tableName);
    return this.localDb.createTableDB(objTable);
  }
}
