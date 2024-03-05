import { useState} from "react"
import Axios from "axios"
import Upload3DModelToHostingService from './Upload3DModelToHostingService.jsx'

/**
 * Update 3D model to data to backend server for storage in DB.
 * @returns 
 */

export default function CreateNewEnvironmentResource(props) {

    // Data we collect from the main input form:

    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [author,setAuthor] = useState("")
    const [license,setLicense] = useState("")

    // Data we collect from the child component:

    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [floorMarkerCount, setFloorMarkerCount] = useState(0)
    const [wallMarkerCount, setWallMarkerCount] = useState(0)

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
        formData.append("exhibits",floorMarkerCount)
        formData.append("panels",wallMarkerCount)

        console.log(formData)

        // Send form data to backend:

        Axios({
            method: "post",
            url: "http://localhost:4000/api/environments",
            data: formData,
            headers: { "Content-Type": "application/json" },
            }).then((response) => {

            // After the data has been uploaded to the backend:

            console.log(response)
            props.showThisModal(false)
        })

    }
    
    return <div className="popup-form">
        <p>Upload Environment to DB</p>

        <label>name:<input type="text" onChange={(e) => {setName(e.target.value)}} /></label>< br />
        <label>description:<input type="text" onChange={(e) => {setDescription(e.target.value)}} /></label>< br />
        <label>author:<input type="text" onChange={(e) => {setAuthor(e.target.value)}} /></label>< br />
        <label>license:<input type="text" onChange={(e) => {setLicense(e.target.value)}} /></label>< br />
        
        <Upload3DModelToHostingService 
            updateModelURL={(modelURL) => setModelURL(modelURL)}
            updateImageURL={(imageURL) => setImageURL(imageURL)}
            setFloorMarkerCount={(n) => setFloorMarkerCount(n)}
            setWallMarkerCount={(n) => setWallMarkerCount(n)}
        />

        <button onClick={uploadForm}>Confirm</button>
        <button className="closeButton" onClick={() => {props.showThisModal(false)}} >Cancel/Close</button>
    </div>
}