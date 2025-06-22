// seed.js
const { MongoClient, ObjectId } = require('mongodb');

async function main() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();

  const db = client.db("solia");

  const roleAdmin = { _id: new ObjectId(), name: "admin", permissions: ["ALL"] };
  const roleUser = { _id: new ObjectId(), name: "user", permissions: ["read", "comment", "view-mission"] };

  await db.collection("roles").insertMany([roleAdmin, roleUser]);

  const adminId = new ObjectId();
  const userId = new ObjectId();

  await db.collection("users").insertMany([
    {
      _id: adminId,
      email: "admin@solia.com",
      password: "hashedpassword",
      name: "Admin",
      roleId: roleAdmin._id,
      isActive: true
    },
    {
      _id: userId,
      email: "user@solia.com",
      password: "hashedpassword",
      name: "User",
      roleId: roleUser._id,
      isActive: true
    }
  ]);

  const missionId = new ObjectId();
  await db.collection("missions").insertOne({
    _id: missionId,
    title: "Clean Water Project",
    description: "Bring clean water to remote villages.",
    createdBy: adminId,
    status: "active",
    premiumOnly: false,
    createdAt: new Date()
  });

  await db.collection("comments").insertOne({
    _id: new ObjectId(),
    content: "This mission is amazing!",
    missionId,
    authorId: userId,
    createdAt: new Date()
  });

  await db.collection("subscriptions").insertOne({
    _id: new ObjectId(),
    userId,
    plan: "premium",
    status: "active",
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  await db.collection("apiKeys").insertOne({
    _id: new ObjectId(),
    key: "123456789abcdef",
    userId: adminId,
    scopes: ["mission:read", "mission:write"],
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date()
  });

  console.log("✅ Données insérées avec succès !");
  await client.close();
}

main().catch(console.error);
