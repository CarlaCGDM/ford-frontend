import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Clone, Html, useGLTF } from '@react-three/drei'

export default function Model({ path, label="3D Model", position=[0,0,0]})
{

    /**
     * Load model
     */

    const model = useGLTF(path)
    const base = useGLTF('./presets/displays/BasePreset.glb')

    /**
     * Animate model
     */

    const cubeRef = useRef()

    useFrame((state,delta) =>
    {
        cubeRef.current.rotation.y = cubeRef.current.rotation.y + delta * 0.5
    })

    return <>
        <group position={ position }>
            
            {/* Model & Label */}

            <Clone 
                ref={ cubeRef } 
                position={ [0,0.3,0] }
                object={ model.scene }
            >
                <Html 
                    position={[0,1.5,0]}
                    wrapperClass="label"
                    center
                    distanceFactor={ 6 }
                    occlude={[]}
                >
                    { label }
                </Html>

            </Clone>

            {/* Base */}

            <Clone 
                position={ [0,0,0] }
                object={ base.scene }
            ></Clone>
            
            {/* Pivot */}

            {/* <mesh position={ [0,0,0] } scale={ 0.1 }> 
                <sphereGeometry args={[1, 16, 8]}/>
                <meshStandardMaterial color="red"/>
            </mesh> */}


        </group>
    </>
}