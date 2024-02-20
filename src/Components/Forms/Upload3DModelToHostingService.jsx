import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from "react"
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'
import Axios from "axios"

/**
 * Update 3D model to Cloudinary alongside a generated thumbnail image amd send both URLs to parent component for storage in DB.
 * @returns 
 */

export default function Upload3DModelToHostingService(props) {

    // Data we will get at the end of the process and send to parent:
    const [modelURL, setModelURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    useEffect(() => {
        props.updateModelURL(modelURL)
    },[modelURL]);
    useEffect(() => {
        props.updateImageURL(imageURL)
    },[imageURL]);

    // Data regarding a 3D model preview we will generate to take a thumbnail picture:
    const [modelPosition,setModelPosition] = useState([0,0,0])
    const [modelScale,setModelScale] = useState([1,1,1])
    const displayModel = useGLTF(modelURL ? modelURL : "https://res.cloudinary.com/dahr27egc/image/upload/v1706573387/hamburger_dlwxib.glb")
    const modelRef = useRef("")
    const canvasRef = useRef("")

    // Upload 3D model to Cloudinary (as image - it can still be used as a 3D model)

    const [modelSelected, setModelSelected] = useState("")

    const uploadModel = () => {
        
        // When we hit upload:
        console.log("File to upload: ")
        console.log(modelSelected)

        // Create form data to send to Cloudinary:
        const formData = new FormData()
        formData.append("file", modelSelected)
        formData.append("upload_preset","proyecto_ford_up")

        // Send form data to Cloudinary:
        Axios.post("https://api.cloudinary.com/v1_1/dahr27egc/image/upload", formData).then((response) => {

            // After the model has been uploaded to the Cloudinary servers:

            setModelURL(response.data.secure_url)
            console.log("Model URL: " + response.data.secure_url)

            // Automatically adjust model position and scale for the picture
            // (how to compute bounding box??)

            console.log(modelRef.current)
            setModelPosition([0,-0.5,0])

        })
    }

    // Take snapshot of 3D model and upload image to Cloudinary

    const uploadImage = () => {

        // Get screenshot as dataURL
        const image = canvasRef.current.toDataURL('image/png')

        // Create form data to send to Cloudinary
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset","proyecto_ford_up")

        // Send form data to Cloudinary:
        Axios.post("https://api.cloudinary.com/v1_1/dahr27egc/image/upload", formData).then((response) => {

            // After the image has been uploaded to the Cloudinary servers:

            setImageURL(response.data.secure_url)
            console.log("Image URL: " + response.data.secure_url)
            
        })

    }
    
    // Pass modelURL and imageURL data to parent component !! 
    
    return <>
        <input type="file" onChange={(e) => {setModelSelected(e.target.files[0])}} />
        <button onClick={uploadModel}>Upload 3D model</button>
        <div className="model-preview-canvas">
            <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
                
        
                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={1.5} />

                <OrbitControls/>

                <color attach="background" args={["red"]} />
                
               
                <Clone ref={modelRef} object={ displayModel.scene } position={modelPosition} scale={modelScale}/>
                
                
            </Canvas>
        </div>
        <button onClick={uploadImage}>Upload thumbnail image</button>
        <img className="model-preview-image" src={imageURL}></img>
    </>
}