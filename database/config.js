import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
let dbInstance;
let client;

async function listDatabases(db) {
  try {
    const databasesList = await db.admin().listDatabases();
    console.log("✅ Available Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("❌ Error listing databases:", error);
  }
}

async function connectDB() {
  if (dbInstance) return dbInstance; // Reuse existing connection

  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("✅ Successfully connected to MongoDB");

    dbInstance = client.db("skyroutesolution");
    await listDatabases(dbInstance);

    return dbInstance;
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    throw error;
  }
}

async function getDatabase() {
  return dbInstance || (await connectDB());
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
    dbInstance = null;
    client = null;
  }
}

export { connectDB, getDatabase, closeDB };
