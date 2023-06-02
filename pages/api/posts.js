import { connectToDatabase } from "../../lib/mongodb";
import multer from "multer";
import { ObjectId } from "mongodb";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos/");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const upload = multer({ storage }).single("image");

async function addPost(req, res) {
  try {
    const { db } = await connectToDatabase();

    upload(req, res, async function (err) {
      if (err) {
        return res.json({
          message: new Error(err).message,
          success: false,
        });
      }

      let post = req.body;
      if (typeof req.body === "string") {
        post = JSON.parse(req.body);
      }
      if (req.file) {
        post.file = req.file.filename;
        const fileLink = "/photos/" + req.file.filename;
        post.fileLink = fileLink;
      }

      await db.collection("posts").insertOne(post);

      return res.json({
        message: "Le poste a été ajouté avec succès",
        success: true,
      });
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getPosts(req, res) {
  try {
    const { db } = await connectToDatabase();

    let posts = await db
      .collection("posts")
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updatePost(req, res) {
  try {
    const { db } = await connectToDatabase();

    await db.collection("posts").updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    return res.json({
      message: "Le poste a été modifié avec succès",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deletePost(req, res) {
  try {
    const { db } = await connectToDatabase();
    const postId = req.query.id;

    await db.collection("posts").deleteOne({
      _id: new ObjectId(postId),
    });

    return res.json({
      message: "Le poste a été supprimé avec succès",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPosts(req, res);

    case "POST":
      return addPost(req, res);

    case "PUT":
      return updatePost(req, res);

    case "DELETE":
      return deletePost(req, res);
  }
}
