import express from 'express';
import { MongoClient } from 'mongodb';
import { createRoutes } from './routes';

const app = express();
const port = 6440;

app.use(express.json());

MongoClient.connect("mongodb://db.aisling.clairegregg.com:27018", {})
  .then(client => {
    const db = client.db("appdata");
    console.log("✅ Connected to MongoDB");

    app.use('/', createRoutes(db));

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  });
