// src/utils/db.js
import { openDB } from 'idb';

export async function getDb() {
  return openDB('casier-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('demandes')) {
        db.createObjectStore('demandes', { keyPath: 'id' });
      }
    }
  });
}

export async function saveDemande(demande) {
  const db = await getDb();
  await db.put('demandes', demande);
}

export async function getDemande(id) {
  const db = await getDb();
  return await db.get('demandes', id);
}
