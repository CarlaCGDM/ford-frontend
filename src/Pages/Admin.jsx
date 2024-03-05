import { Canvas } from '@react-three/fiber'
import Experience from '../Components/3D Canvases/Experience.jsx'
import { useEffect, useState} from "react"
import { ScrollControls } from '@react-three/drei'
import SelectResource from '../Components/AdminPanels/SelectResource.jsx'
import AssignResource from '../Components/AdminPanels/AssignResource.jsx'
import DragAndDrop from '../Components/Utilities/DragAndDrop.jsx'

export default function Admin()
{
    // We are making redundant API calls to the same element. 
    // We should get the selected element HERE, then pass it as props.
    
    // To be able to refresh the environment preview

    const [environmentId,setEnvironmentId] = useState("")

    // To be able to assign a model to a slot

    const [modelSlotId,setModelSlotId] = useState("")
    const [modelId,setModelId] = useState("")

    const assignModelToSlot = async () =>
    {
        // Fetch the environment
        // Update the list
        // API call to replace ModelSlots
    }

    return <>

    <div className="header">
        <div className="title">Admin settings</div>
        <div className="navbar">
            Navbar
            <button><a href="/">Homepage</a></button>
        </div>
    </div>

    <div className="admin-settings">

        {/* <DragAndDrop /> */}
        {/* https://freedium.cfd/https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37 */}
        
        <SelectResource 
            environmentId={environmentId} 
            setEnvironmentId={(Id) => {setEnvironmentId(Id)}}
            modelId={modelId}
            setModelId={(Id) => {setModelSlotId(Id)}}
        />
        

        <div className="admin-right-side">

            <Canvas>
                <ScrollControls pages={5} damping={0.3}>
                    <Experience environmentId={environmentId}/>
                </ScrollControls>
            </Canvas>

            <AssignResource 
                environmentId={environmentId}
                modelSlotId={modelSlotId}
                setModelSlotId={(Id) => {setModelSlotId(Id)}}
            />

        </div>
                
    </div>

    <div className="footer">
        About
    </div>
  </>
}