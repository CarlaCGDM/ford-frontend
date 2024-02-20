import { Clone, useGLTF } from '@react-three/drei'
import Model from './Model'

export default function Environment({ path })
{

    const model = useGLTF(path ? path : "https://res.cloudinary.com/dahr27egc/image/upload/v1706573387/hamburger_dlwxib.glb")

    /**
     * Models
     */

    const floorModels = []
    const wallModels = []
    const museum = {}

    // Go through all objects in the scene and create a model for each marker we find
    // In the DB the Scene entity could have a 3d model and then a list of 3D models for what object to spawn in each marker, which we can modify from the editor
    // Make a proper validator for this when you upload it to the server, or sort it in the server

    let index = 0
    model.scene.children.forEach(child => {
        if (child.name.includes('FloorMarker'))
        {
            floorModels.push(
                <Model 
                    key={index}
                    path={'./presets/displays/CubePreset01.glb'}
                    position={child.position} />
            )

            index++
        }

        else if (child.name.includes('WallMarker'))
        {

        }

        else 
        {
            museum.model = child
        }
    });

    /**
     * Scene
     */

    /**
     * Spawn html panels in the red markers with the react function hook
     */

    /**
     * Get the path from the scene
     */

    /**
     * Set path as camera path in parent component with hooks
     */
    return <>

        { floorModels }
        { wallModels }

        <Clone object={ museum.model } />
    </>
}