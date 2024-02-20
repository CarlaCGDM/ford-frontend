import { Canvas } from '@react-three/fiber'
import Experience from '../Components/Experience.jsx'
import { useEffect, useState} from "react"
import { ScrollControls } from '@react-three/drei'
import Model from '../Components/3D Models/Model.jsx'
import TabSelectorPanel from '../Components/AdminPanels/SelectResource.jsx'
import ModelUploadForm from '../Components/Forms/CreateNewModelResource.jsx'

export default function Admin()
{
    
    // To be able to refresh the environment preview

    const [environmentId,setEnvironmentId] = useState("")

    return <>

    <div className="header">
        <div className="title">Admin settings</div>
        <div className="navbar">
            Navbar
            <button><a href="/">Homepage</a></button>
        </div>
    </div>

    <div className="admin-settings">

        <div className="scene-settings">
            <div className="settings-panel">
                    <TabSelectorPanel environmentId={environmentId} setEnvironmentId={(Id) => {setEnvironmentId(Id)}}/>
            </div>
        </div>

        <Canvas>
            <ScrollControls pages={5} damping={0.3}>
                <Experience environmentId={environmentId}/>
            </ScrollControls>
        </Canvas>
                
    </div>

    <div className="footer">
        About
    </div>
  </>
}