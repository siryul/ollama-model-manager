export class IndexedDBHelper {
  constructor(
    private dbName: string,
    private dbVersion: number,
  ) {}

  openDB(upgradeCallback?: (db: IDBDatabase) => void): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (upgradeCallback) upgradeCallback(db);
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // 运行事务
  runTransaction<T>(
    db: IDBDatabase,
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => Promise<T>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // FIXME: Not found Error -> One of the specified object stores was not found.
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      callback(store).then(resolve).catch(reject);

      transaction.onerror = () => reject(transaction.error);
    });
  }
}
