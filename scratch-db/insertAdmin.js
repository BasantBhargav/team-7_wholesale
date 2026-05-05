const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('bulk_order_management');
    const users = database.collection('users');

    const hashedPassword = bcrypt.hashSync('admin', 10);

    const doc = {
      businessName: "Super Admin",
      ownerName: "Admin User",
      email: "admin",
      phone: "0000000000",
      gstTaxId: "ADMIN-GST",
      address: "HQ",
      password: hashedPassword,
      role: "ADMIN",
      retailerStatus: "APPROVED",
      _class: "com.bom.entity.User"
    };

    // Update if exists or insert
    const result = await users.updateOne(
        { email: "admin" },
        { $set: doc },
        { upsert: true }
    );

    console.log(`Successfully updated/inserted admin user.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
