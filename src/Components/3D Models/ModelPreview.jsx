import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from "react"
import { useGLTF, OrbitControls } from '@react-three/drei'

/**
 * Display a given 3D model alongside its properties.
 * @returns 
 */

export default function ModelPreview(props) {

    // Data regarding the 3D model preview:
    
    const [modelPosition,setModelPosition] = useState([0,0,0])
    const [modelScale,setModelScale] = useState([1,1,1])
    const displayModel = useGLTF(props.model.modelURL ? props.model.modelURL : "https://res.cloudinary.com/dahr27egc/image/upload/v1706573387/hamburger_dlwxib.glb")
    const modelRef = useRef("")
    const canvasRef = useRef("")
    
    return <>
        <div className="model-preview-canvas">
            <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
                
        
                <directionalLight position={[1,2,3]} intensity={4.5}/>
                <ambientLight intensity={1.5} />

                <OrbitControls/>

                <color attach="background" args={["red"]} />
                
               
                <primitive ref={modelRef} object={ displayModel.scene } position={modelPosition} scale={modelScale}/>
                
                
            </Canvas>
            <p>Name: {props.model.name}</p>
            <p>Description: {props.model.description}</p>
            <p>Author: {props.model.author}</p>
            <p>License: {props.model.license}</p>
            <button onClick={() => props.showEditForm(true)}>Edit details</button>
            <button onClick={() => props.deleteElement(props.model._id)}>Delete model</button>
        </div>
    </>
}