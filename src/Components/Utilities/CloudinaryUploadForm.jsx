import { useEffect, useState } from "react"
import Axios from "axios"

export default function CloudinaryUploadForm() {

    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = () => {
        console.log(imageSelected)

        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset","proyecto_ford_up")

        Axios.post("https://api.cloudinary.com/v1_1/dahr27egc/image/upload", formData).then((response) => {
            console.log(response.data.secure_url)
            setPreviewImageURL(response.data.secure_url)
        })
    }

    // Another API request here to upload the model URL to the database along with the rest of the data

    // Preview Image generated automatically https://cloudinary.com/documentation/transformations_on_3d_models
    
    return <>
        <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}} />
        <button onClick={uploadImage}>Upload Image</button>
    </>
}