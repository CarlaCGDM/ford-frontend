import { Canvas } from '@react-three/fiber'
import Experience from '../Components/Experience.jsx'
import ModelSelector from '../Components/ModelSelector.jsx'
import Model from '../Components/3D Models/Model.jsx'
import CloudinaryUploadForm from '../Components/Utilities/CloudinaryUploadForm.jsx'
import ElementSelectorPanel from '../Components/ElementSelectorPanel.jsx'

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
                    <ElementSelectorPanel />
            </div>
            
            
        </div>

        <div className="object-settings">
            <div className="settings-panel">
                Upload 3D model to Cloudinary
                <CloudinaryUploadForm />
                {/* <Canvas>
                <Experience />
            </Canvas> */}
            </div>
        </div>
                
    </div>

    <div className="footer">
        About
    </div>
  </>
}