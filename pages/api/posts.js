

const { connectToDatabase } = require('../../lib/mongodb');
const multer = require('multer');
const ObjectId = require('mongodb').ObjectId;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "photos/");
      },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    },

  });
  console.log('destination  : ', storage);

  
  const upload = multer({
    dest:'photos/',
    
    limits: { fileSize: 1000000 },
  }).single('file');

export default async function handler(req, res) {
    // methode switch pour les conditions
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return upload(req, res, function (err) {
                if (err) {
                    // Une erreur s'est produite lors du téléchargement du fichier
                    return res.json({
                        message: new Error(err).message,
                        success: false,
                    });
                }
                return addPost(req, res);
            });
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
};




//Fonction permettant d'ajouter des posts
async function addPost(req, res) {
    try {
        // connexion à la base de donnée
        let { db } = await connectToDatabase();
        // ajout de post
        const post = JSON.parse(req.body);
        if(req.file) post.file = req.file.filename; // Ajoutez le nom du fichier au document
        await db.collection('posts').insertOne(post);
        // message
        return res.json({
            message: 'Le poste a été ajouter avec succès',
            success: true,
        });
    } catch (error) {
        // erreur
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};





async function getPosts(req,res){
    try {
        // on se connecte à la base de donnée
        let { db } = await connectToDatabase();
        // chercher les postes
        let posts = await db
            .collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();
        // retourner message
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // erreur
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};

//Fonction pour mettre à jour

async function updatePost(req, res) {
    try {
        // connexion à la base
        let { db } = await connectToDatabase();

        // mise à jour
        await db.collection('posts').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        // message
        return res.json({
            message: 'Le poste a été modifié avec succès',
            success: true,
        });
    } catch (error) {

        // erreur
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};


//Fonction pour supprimer des postes
async function deletePost(req, res) {
    try {
        // Connexion à la base
        let { db } = await connectToDatabase();

        // Suppression des postes
        await db.collection('posts').deleteOne({
            _id: new ObjectId(req.body),
        });

        // Message de suppression
        return res.json({
            message: 'Le poste a été supprimé avec succès',
            success: true,
        });
    } catch (error) {

        // retourner l'erreur
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
}




