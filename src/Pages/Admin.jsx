import { Canvas } from '@react-three/fiber'
import Experience from '../Components/Experience.jsx'
import { ScrollControls } from '@react-three/drei'
import Model from '../Components/3D Models/Model.jsx'
import TabSelectorPanel from '../Components/AdminPanels/TabSelectorPanel.jsx'
import ModelUploadForm from '../Components/Forms/ModelUploadForm.jsx'

export default function Admin()
{
    /**
     * List of possible museums (later from API)
     */

    const museumOptions = [

        <Model path={'./presets/displays/ScenePreset01.glb'} />,
        <Model path={'./presets/displays/ScenePreset02.glb'} />,
        <Model path={'./presets/displays/ScenePreset03.glb'} />,
        <Model path={'./presets/displays/ScenePreset04.glb'} />

    ]

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
                    <TabSelectorPanel />
            </div>
            
            
        </div>

        <div className="object-settings">
            <div className="settings-panel">
                < ModelUploadForm />
            </div>
        </div>

        <Canvas>
            <ScrollControls pages={5} damping={0.3}>
                <Experience />
            </ScrollControls>
        </Canvas>
                
    </div>

    <div className="footer">
        About
    </div>
  </>
}