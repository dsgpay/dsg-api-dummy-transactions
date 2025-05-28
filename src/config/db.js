// @ts-check
import { MongoClient } from "mongodb";
import { mongo } from "../config/env.js";

// Check if mongo configuration exists and URL is defined
if (!mongo?.url || !mongo?.db) {
  throw new Error(
    "MongoDB connection URL or DB name is missing in the configuration."
  );
}

/** @type {MongoClient} */
const client = new MongoClient(mongo.url);

// // Wait for client to connect before proceeding
// await client.connect();

/** @type {import("mongodb").Db} */
const db = client.db(mongo.db);

export default db;
