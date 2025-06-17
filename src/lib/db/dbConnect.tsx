import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) console.log("Missing MONGODB_URI");
if (!MONGODB_DB) console.log("Missing MONGODB_DB");

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const collectionName = {
  servicesCollection: "doctors",
}

export async function dbConnect(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
