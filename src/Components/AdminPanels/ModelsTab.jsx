import { useEffect, useState} from "react"
import ModelUploadForm from "../Forms/ModelUploadForm"
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import ModelPreview from "../3D Models/ModelPreview"

export default function ModelsTab() {

    // Elements to display

    const [elements, setElements ] = useState([])
    const [selectedElement, setSelectedElement] = useState("")
    const [createNewPanel,setCreateNewPanel] = useState(false)

    // Selected element

    const [selectedId, setSelectedId] = useState("")

    // Getting response data from the API

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/exhibits')
        const result = await response.json()

        //console.log(result)
        setElements(result)
        setSelectedElement(result[0])
    }

    const getElement = async (elementId) =>
    {
        const response = await fetch('http://localhost:4000/api/exhibits/' + elementId)
        const result = await response.json()

        //console.log(result)
        setSelectedElement(result)
    }

    // Displaying list of elements

    useEffect(() =>
    {
        getElements()
    }, [])

    return <>
    <div className="admin-tab">
        <div>

            {(elements.length == 0) && <p>No 3D Models to display.</p>}

            <div className="elements-grid">
                {
                    elements.map((element) => {
                        return <div key={element._id} className="element">
                                <img className="model-preview-image" src={element.imgURL}></img>
                                <button onClick={() => getElement(element._id)}>{element.name}</button>
                        </div>
                    })
                }
            </div>

            <button onClick={() => setCreateNewPanel(true)}>Upload new 3D model</button>
        
        </div>

        <div>
            {/* 3D Canvas showing selected model */}

            <ModelPreview model={selectedElement}/>

            {/* Written info for the model */}

        </div>
    </div>
       {createNewPanel && <ModelUploadForm closeSelf={() => setCreateNewPanel(false)}/>}
    </>
}