export default class LocalDB {
  constructor({ hash, indexedDB, localStorage }) {
    // Functions
    this.hash = hash;

    // Objects
    this.indexedDB = indexedDB;
    this.localStorage = localStorage;
  }

  createTableDB(incomeData, indexName = '', key = '') {
    const tableName = Object.keys(incomeData)[0];
    let data = incomeData[tableName];
    if (!Array.isArray(data)) data = [data];

    const request = this.indexedDB.open(tableName, 2);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      const configObjectStore = { autoIncrement: true };
      if (key) configObjectStore.keyPath = key;

      const objectStore = database.createObjectStore(tableName, configObjectStore);
      if (indexName) objectStore.createIndex(indexName, indexName, { unique: true });
      objectStore.transaction.oncomplete = () => {
        const store = database.transaction(tableName, 'readwrite').objectStore(tableName);
        data.forEach(async (each) => store.add(each));
      };
    };

    request.onsuccess = (event) => {
      const localDB = event.target.result;
      localDB.close();
    };

    request.onerror = console.error;
  }

  async getTable(tableName) {
    return new Promise((resolve) => {
      try {
        const request = this.indexedDB.open(tableName, 2);
        request.onsuccess = (event) => {
          const database = event.target.result;
          const objectStore = database.transaction(tableName, 'readonly').objectStore(tableName);

          const allRecords = objectStore.getAll();
          allRecords.onsuccess = () => {
            if (allRecords.result.length === 1) resolve(allRecords.result[0]);
            database.close();
            resolve(allRecords.result);
          };
        };
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
  }

  getIndexed(tableName, indexName) {
    return new Promise((resolve) => {
      try {
        const request = this.indexedDB.open(tableName, 2);
        request.onsuccess = (event) => {
          const database = event.target.result;
          const objectStore = database.transaction(tableName, 'readonly').objectStore(tableName);
          const allRecords = objectStore.index(indexName).getAll();

          allRecords.onsuccess = () => {
            database.close();
            resolve(allRecords.result);
          };
        };
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
  }

  async deleteTableDB(tableName) {
    return this.indexedDB.deleteDatabase(tableName);
  }

  async getAllDBNames() {
    return this.indexedDB.databases();
  }

  async deleteAllDB() {
    const databases = await this.getAllDBNames();
    databases
      .filter((each) => each.name !== 'firebaseLocalStorageDB')
      .filter((each) => each.name !== 'firebase-installations-database')
      .filter((each) => each.name !== 'validate-browser-context-for-indexeddb-analytics-module')
      .forEach((database) => this.indexedDB.deleteDatabase(database.name));
  }

  async downloadDB() {
    const tables = this.getAllDBNames();

    tables.forEach(async (each) => {
      const data = await this.getTable(each.name);
      this.util.downloadJSON(data, each.name);
    });
  }

  setCache(name, value) {
    this.localStorage.setItem(name, JSON.stringify(value));
  }

  getCache(name) {
    return this.localStorage.getItem(name);
  }

  setConsistency(consistency) {
    const newHash = this.hash(consistency);
    this.setCache('consistency', newHash);
  }

  getConsistency() {
    return JSON.parse(this.getCache('consistency'));
  }
}
