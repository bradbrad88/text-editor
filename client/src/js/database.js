import { openDB } from "idb";

const DB = "jate";

const initdb = async () =>
  openDB(DB, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB)) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore(DB, { keyPath: "id", autoIncrement: true });
      console.log(DB + " database created");
    },
  });

export const putDb = async content => {
  const todosDb = await openDB(DB, 1);
  const tx = todosDb.transaction(DB, "readwrite");
  const store = tx.objectStore(DB);
  await store.put({ id: 1, note: content });
};

export const getDb = async () => {
  const todosDb = await openDB(DB, 1);
  const tx = todosDb.transaction(DB, "readonly");
  const store = tx.objectStore(DB);
  const request = store.getAll();
  const result = await request;
  if (result.length) return result.find(item => item).note;
  return null;
};

initdb();
