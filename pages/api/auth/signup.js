import User from '../../../models/user';
import handler from '../../../lib/handler';
import { MongoClient } from 'mongodb';


const { connectToDatabase } = require('../../../lib/mongodb');
const MONGODB_URI = process.env.MONGODB_URI;



handler
  .post(createUser)

async function createUser(req, res) {

  const data = req.body;

  const { email, password, role } = data;

  let { db } = await connectToDatabase();

  await db.collection('users').insertOne(data);

  res.status(201).json({ message: 'Created user!' });

}

export default handler;