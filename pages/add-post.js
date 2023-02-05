import { useState } from 'react';




import Nav from '../components/Nav';



export default function AddPost() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');

    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [image, setImage] = useState(null);
    const [imageInput, setImageInput] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = function(e){
            console.log(e.target.result);
            setImage (e.target.result);


        }
        fileReader.readAsDataURL(file);

    }

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('Veuillez remplir tous les champs');

        // post structure
        let post = {
            title,
            content,
            image,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            setImage('image');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
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
                        <label className='mb-4 text-[30px] font-bold'>Titre</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="titre"
                        />
                    </div>
                    <div className="p-4 mb-4 flex flex-col">
                        <label className='mb-4 text-[30px] font-bold'>Contenu</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Contenu de votre poste"
                        />
                    </div>
                    <div className="custom-file mb-3">
                        <input type="file" className="custom-file-input" name="file" id="file1" 
                        // onchange=
                        // {(e) => setFile(e.target.value)}
                        onChange = {handleImage}
                        //value = {image}
                        // value={'readSingleFile(this.files)'}
                        
                        />
                        <label className="custom-file-label" htmlFor="file1" id="file-label">Selectionner le fichier</label>
                    </div>

                    {/* <FileUpload name="demo" url="./upload"></FileUpload> */}

                    <div >
                        <button className=" bg-green-800 rounded-xl p-4 hover:bg-green-400" type="submit" >Ajout du poste</button>
                    </div>
                </form>
            </div>

            {/* <div class="container">
        <div class="row">
            <div class="col-md-6 m-auto">
                <h1 class="my-4">Lets upload some stuff</h1>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <div class="custom-file mb-3">
                        <input type="file" class="custom-file-input" name="file" id="file1" onchange="readSingleFile(this.files)"/>
                        <label class="custom-file-label" for="file1" id="file-label">Choose file</label>
                    </div>
                    <input type="submit" value="Submit" class="btn btn-primary btn-block"/>
                </form>
            </div>
        </div>
    </div> */}
            
        </div>
    );
}