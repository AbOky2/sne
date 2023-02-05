import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;
//const GridFsStorage = require("multer-gridfs-storage");


// verification de l'URI MongoDB
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// Vérification de la base de donnée
if (!MONGODB_DB) {
    throw new Error('Definir l environement MONGODB_DB');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // on verfie si on a 'capturé' un client
    if (cachedClient && cachedDb) {
        // on charge à partir du cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // on definit les options de connexion
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Finalement on se connecte
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // on defini le cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

// let gfs;
// conn.once("open", () => {
//   // init stream
//   gfs = new MongoClient.GridFSBucket(conn.db, {
//     bucketName: "uploads"
//   });
// });

// Storage
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString("hex") + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: "uploads"
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
  
//   const upload = multer({
//     storage
//   });

  