import { useState } from "react";
import Nav from "../components/Nav";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageInput, setImageInput] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    //setImage(file);
    setImage(URL.createObjectURL(file));
  };

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!title || !content) return setError("Veuillez remplir tous les champs");

    // post structure
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", false);
    formData.append("createdAt", new Date().toISOString());

    // save the post
    let response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      setTitle("");
      setContent("");
      setImage(null);
      return setMessage(data.message);
    } else {
      return setError(data.message);
    }
  };

  return (
    <div>
      <Nav />
      <div className="bg-gray-600 p-4 rounded-xl border-1 border">
        <form onSubmit={handlePost} className="">
          {error ? (
            <div className="">
              <h3 className="">{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className="">
              <h3 className="">{message}</h3>
            </div>
          ) : null}
          <div className="p-4 mb-4 flex flex-col">
            <label className="mb-4 text-[30px] font-bold">Titre</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titre"
            />
          </div>
          <div className="p-4 mb-4 flex flex-col">
            <label className="mb-4 text-[30px] font-bold">Contenu</label>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu de votre poste"
            />
          </div>
          <div className=" mb-3">
            <input type="file" name="image" onChange={handleImage} />
          </div>
          {image ? (
            <img src={image} className="w-full max-h-60 object-contain mb-4" />
          ) : null}

          <div>
            <button
              className=" bg-green-800 rounded-xl p-4 hover:bg-green-400"
              type="submit"
            >
              Ajout du poste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}