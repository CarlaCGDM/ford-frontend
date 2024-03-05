import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from "react"
import { Clone, useGLTF, OrbitControls } from '@react-three/drei'
import Axios from "axios"
import { HexColorPicker } from "react-colorful";

/**
 * Update 3D model to Cloudinary alongside a generated thumbnail image amd send both URLs to parent component for storage in DB.
 * @returns 
 */

export default function Upload3DModelToHostingService(props) {

    // Data for the color picker
    const [customBackgroundColor, setCustomBackgroundColor] = useState("#292929")

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

    const countMarkers = () =>
    {
        // acting on the variable "displayModel" which contains the GLTF model

        let floorMarkerCount = 0
        let wallMarkerCount = 0

        // go through the children of the display model
        // count how many wall and floor markers there are
        // add setWallMarkerCount and setFloorMarkerCount as props form parent form
        // send info to parent form after counting

        console.log("counting the markers!")
        console.log(displayModel)

        displayModel.scene.children.forEach(child => {
            if (child.name.includes('FloorMarker'))
            {
                floorMarkerCount++
            }
    
            else if (child.name.includes('WallMarker'))
            {
                wallMarkerCount++
            }
        });

        console.log("found " + floorMarkerCount + " floor markers" )
        props.setFloorMarkerCount(floorMarkerCount)
        props.setWallMarkerCount(wallMarkerCount)

    }
    
    // Pass modelURL and imageURL data to parent component !! 
    
    return <>
        <input type="file" onChange={(e) => {setModelSelected(e.target.files[0])}} />
        <button onClick={uploadModel}>Upload 3D model</button>
        <div className="model-preview-wrapper">
        <div className="model-preview-canvas">
            <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
                
        
                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={1.5} />


                <OrbitControls enablePan={true}/>

                <color attach="background" args={[customBackgroundColor]} />
                
               
                <Clone ref={modelRef} object={ displayModel.scene } position={modelPosition} scale={modelScale}/>
                
                
            </Canvas>
        </div>
        <HexColorPicker color={customBackgroundColor} onChange={setCustomBackgroundColor} />
        </div>
        <button onClick={() => {
            uploadImage()
            countMarkers()
            }}>Upload thumbnail image</button>
        <img className="model-preview-image" src={imageURL}></img>
    </>
}