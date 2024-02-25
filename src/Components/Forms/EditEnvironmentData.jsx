import { useState} from "react"
import Axios from "axios"

/**
 * Update 3D model resource data in DB through backend server.
 * @returns 
 */

export default function EditModelData(props) {

    // Data we collect from the main input form:

    const [name,setName] = useState(props.model.name)
    const [description,setDescription] = useState(props.model.description)
    const [author,setAuthor] = useState(props.model.author)
    const [license,setLicense] = useState(props.model.license)
    const [modelURL, setModelURL] = useState(props.model.modelURL)
    const [imageURL, setImageURL] = useState(props.model.imgURL)

    // Upload data to backend:

    const uploadForm = () => {

        // Create form data to send to backend:

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description",description)
        formData.append("author", author)
        formData.append("license", license)
        formData.append("modelURL", modelURL)
        formData.append("imgURL", imageURL)

        console.log(formData)

        // Send form data to backend:

        Axios({
            method: "put",
            url: "http://localhost:4000/api/environments/" + props.model._id,
            data: formData,
            headers: { "Content-Type": "application/json" },
            }).then((response) => {

            // After the data has been uploaded to the backend:

            console.log(response)
            props.showThisModal(false)

        })

    }
    
    return <div className="popup-form">
        
        <p>Edit data of existing 3D environment</p>

        <label>name:<input type="text" placeholder={name} onChange={(e) => {setName(e.target.value)}} /></label>< br />
        <label>description:<input type="text" placeholder={description} onChange={(e) => {setDescription(e.target.value)}} /></label>< br />
        <label>author:<input type="text" placeholder={author} onChange={(e) => {setAuthor(e.target.value)}} /></label>< br />
        <label>license:<input type="text" placeholder={license} onChange={(e) => {setLicense(e.target.value)}} /></label>< br />

        {/* TODO: Placeholder "no valid model/image URL provided" model/image. Right now this crashes the application. */}

        <label>modelURL:<input type="text" placeholder={modelURL} onChange={(e) => {setModelURL(e.target.value)}} /></label>< br />
        <label>imageURL:<input type="text" placeholder={imageURL} onChange={(e) => {setImageURL(e.target.value)}} /></label>< br />
        

        <button onClick={uploadForm}>Confirm changes</button>
        <button className="closeButton" onClick={() => {props.showThisModal(false)}} >Cancel/Close</button>
    </div>
}